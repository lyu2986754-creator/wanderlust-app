import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { postService, authService, commentService } from './services/api';
import { supabase } from './lib/supabaseClient';
import { Post, User, Destination } from './types';
import { POSTS } from './constants';

// Pages
import Home from './pages/Home';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PostDetail from './pages/PostDetail';
import DestinationDetail from './pages/DestinationDetail';
import Explore from './pages/Explore';
import AIAssistant from './pages/AIAssistant';

// Components
import BottomNav from './components/BottomNav';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appPosts, setAppPosts] = useState<Post[]>(POSTS);
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // 尝试获取用户信息
        const profile = await authService.getCurrentProfile().catch(() => null);
        if (profile) setUser(profile);

        // 获取帖子
        const fetchedPosts = await postService.getPosts().catch(() => []);
        if (fetchedPosts && fetchedPosts.length > 0) {
          setAppPosts(fetchedPosts);
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initApp();

    // 监听 Auth 状态变化（处理 Google 登录等回调）
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const profile = await authService.getCurrentProfile();
        if (profile) setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // 3. Realtime Subscription
    const subscription = postService.subscribeToPosts((payload) => {
      if (payload.eventType === 'INSERT') {
        setAppPosts(prev => [payload.new as Post, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setAppPosts(prev => prev.map(p => p.id === payload.new.id ? { ...p, ...payload.new } : p));
      }
    });

    return () => {
      subscription.unsubscribe();
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!user) return;
    try {
      await commentService.createComment({
        content,
        author_id: user.id
      });
      // 实时订阅会自动处理列表更新，或者我们手动刷新
    } catch (error) {
      console.error('评论失败:', error);
    }
  };

  const handlePostCreated = async (newPost: Partial<Post>) => {
    if (!user) {
      alert('请先登录后再发布内容');
      return;
    }

    try {
      const createdPost = await postService.createPost({
        ...newPost,
        author_id: user.id,
        author: {
          name: user.name,
          avatar: user.avatar
        }
      });
      setAppPosts(prev => [createdPost, ...prev]);
    } catch (error) {
      console.error('发布失败:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-[430px] h-full sm:h-[92vh] bg-white relative shadow-[0_0_100px_rgba(0,0,0,0.1)] sm:rounded-[3rem] flex items-center justify-center border border-slate-200/50">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">正在准备旅程...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="h-screen w-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-[430px] h-full sm:h-[92vh] bg-white relative shadow-[0_0_100px_rgba(0,0,0,0.1)] sm:rounded-[3rem] overflow-hidden flex flex-col border border-slate-200/50">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              <Routes>
              <Route path="/" element={<Home posts={appPosts} />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/community" element={<Community posts={appPosts} onOpenShare={() => setIsShareModalOpen(true)} onPostCreated={handlePostCreated} />} />
                <Route path="/profile" element={<Profile user={user} posts={appPosts} onLogout={handleLogout} />} />
                <Route path="/auth" element={user ? <Navigate to="/profile" /> : <Auth onLogin={handleLogin} />} />
                <Route path="/post/:id" element={<PostDetail posts={appPosts} onAddComment={handleAddComment} />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AnimatePresence>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <BottomNav />
          </div>
        </div>
      </div>
    </Router>
  );
}
