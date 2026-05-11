import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { postService, authService, commentService } from './services/api';
import { Post, User, Destination } from './types';
import { POSTS } from './constants';

// Pages
import Home from './pages/Home';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PostDetail from './pages/PostDetail';

// Components
import BottomNav from './components/BottomNav';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appPosts, setAppPosts] = useState<Post[]>(POSTS);
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        // 1. Check Auth Status
        const profile = await authService.getCurrentProfile();
        if (profile) setUser(profile);

        // 2. Fetch Posts
        const fetchedPosts = await postService.getPosts();
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
    // Logic for adding comment
    console.log('Adding comment:', content);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
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
                <Route path="/community" element={<Community posts={appPosts} onOpenShare={() => setIsShareModalOpen(true)} />} />
                <Route path="/profile" element={<Profile user={user} posts={appPosts} onLogout={handleLogout} />} />
                <Route path="/auth" element={user ? <Navigate to="/profile" /> : <Auth onLogin={handleLogin} />} />
                <Route path="/post/:id" element={<PostDetail posts={appPosts} onAddComment={handleAddComment} />} />
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
