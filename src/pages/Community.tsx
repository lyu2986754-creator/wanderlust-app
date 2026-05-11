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
        location: '当前位置'
      });
    }
    setIsModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    setSelectedImages([]);
  };
  return (
    <div className="flex flex-col gap-8 pb-32 pt-4 px-5 relative min-h-screen bg-slate-50/30">
      <header className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 py-2 -mx-5 px-5 border-b border-slate-50">
        <h1 className="font-display font-black text-2xl tracking-tighter text-slate-800 italic">COMMUNITY</h1>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"><Search size={22} /></button>
      </header>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
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
              <button className="text-slate-300 hover:text-slate-600 transition-colors"><Plus size={20} /></button>
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
                <div className="flex items-center gap-1">
                   {[1,2,3,4,5].map(i => (
                     <Star key={i} size={10} className={i <= (post.rating || 4.5) ? "fill-amber-400 text-amber-400" : "text-slate-100"} />
                   ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button 
        onClick={onOpenShare}
        className="fixed bottom-24 right-6 bg-slate-900 text-white w-16 h-16 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

export default Community;
