import React, { useState } from 'react';
import { Search, Plus, Heart, MessageCircle, Star, X, Image as ImageIcon, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CommunityProps {
  posts: Post[];
  onOpenShare: () => void;
  onPostCreated?: (newPost: Partial<Post>) => void;
}

const Community: React.FC<CommunityProps> = ({ posts, onOpenShare, onPostCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => 
    post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...urls]);
    }
  };

  const handlePublish = () => {
    if (onPostCreated) {
      onPostCreated({
        title: newPostTitle,
        content: newPostContent,
        image: selectedImages[0] || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        type: 'guide',
        location: '江西南昌' // 默认位置，实际应由用户选择或自动定位
      });
    }
    setIsModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    setSelectedImages([]);
  };

  return (
    <div className="flex flex-col gap-8 pb-32 pt-4 px-5 relative min-h-screen bg-slate-50/30">
      <header className="flex flex-col gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 py-4 -mx-5 px-5 border-b border-slate-50">
        <div className="flex justify-between items-center">
          <h1 className="font-display font-black text-2xl tracking-tighter text-slate-800 italic">COMMUNITY</h1>
          <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-900 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><Plus size={22} /></button>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="搜索有关城市的评论或动态..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all text-slate-800 placeholder-slate-300"
          />
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col hover:shadow-xl transition-all"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={post.author.avatar} alt="" className="w-12 h-12 rounded-[1.25rem] object-cover ring-4 ring-slate-50" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900">{post.author.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{new Date(post.created_at).toLocaleDateString()} • {post.location}</p>
                  </div>
                </div>
              </div>

              <Link to={`/post/${post.id}`} className="block">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute top-6 right-6 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/30 rounded-2xl">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">#{post.type}</span>
                  </div>
                </div>
              </Link>

              <div className="p-8">
                <h2 className="font-display text-xl font-bold text-slate-900 mb-3 leading-tight">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.content}</p>
                
                <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-50">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 group/btn transition-colors hover:text-rose-500">
                      <Heart size={20} className="text-slate-200 group-hover/btn:text-rose-500 transition-all" />
                      <span className="text-xs font-bold text-slate-400 font-display">{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-2 group/btn transition-colors hover:text-blue-600">
                      <MessageCircle size={20} className="text-slate-200 group-hover/btn:text-blue-600 transition-all" />
                      <span className="text-xs font-bold text-slate-400 font-display">{post.comments_count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[3rem] border border-slate-50 shadow-sm mx-2">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
               <MessageCircle size={32} />
             </div>
             <div className="space-y-1">
               <p className="text-slate-500 font-bold text-lg tracking-tight">暂无有关此城市的评论</p>
               <p className="text-slate-300 text-xs font-medium uppercase tracking-widest">快来成为第一个分享的人吧！</p>
             </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white w-full max-w-[430px] rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 flex justify-between items-center border-b border-slate-50">
                <h2 className="font-display text-2xl font-black text-slate-900 tracking-tighter italic">分享你的旅程</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">标题</label>
                  <input 
                    type="text" 
                    placeholder="给你的故事起个吸引人的标题"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">内容</label>
                  <textarea 
                    rows={6}
                    placeholder="分享一下这次旅行的精彩瞬间..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 resize-none"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">上传照片</label>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedImages.map((url, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                        <img src={url} className="w-full h-full object-cover" alt="" />
                        <button 
                          onClick={() => setSelectedImages(selectedImages.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-blue-200 hover:text-blue-400 transition-all bg-slate-50/50 cursor-pointer">
                      <ImageIcon size={24} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">选择照片</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border-t border-slate-50">
                <button 
                  onClick={handlePublish}
                  disabled={!newPostTitle || !newPostContent}
                  className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-display font-black text-lg tracking-tight shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  <span>立即发布</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
