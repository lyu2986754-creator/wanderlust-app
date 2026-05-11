import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, Compass, Heart, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Post, Comment } from '../types';
import { COMMENTS } from '../constants';

interface PostDetailProps {
  posts: Post[];
  onAddComment: (content: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onAddComment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  const post = posts.find(p => p.id === id);

  if (!post) return <div className="p-20 text-center">文章未找到</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference">
        <button onClick={() => navigate(-1)} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <Share2 size={24} />
        </button>
      </div>

      <div className="flex-1 pb-32">
        <div className="relative h-[60vh] w-full">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </div>

        <div className="px-8 -mt-20 relative z-10">
          <div className="bg-white rounded-[3rem] p-8 shadow-[0_-20px_60px_rgba(0,0,0,0.05)] border border-slate-50">
            <div className="flex items-center gap-4 mb-8">
              <img src={post.author.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm" />
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">{post.author.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[10px] text-blue-500 font-bold uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                    <MapPin size={10} /> {post.location}
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()} 发布</span>
                </div>
              </div>
            </div>

            <h1 className="font-display text-3xl font-black text-slate-900 leading-tight mb-6 tracking-tight italic">{post.title}</h1>

            <div className="font-sans text-slate-500 text-[16px] leading-[1.8] flex flex-col gap-6 text-justify">
              <p>{post.content || '这是一个美妙的旅程，充满了惊喜和发现。我强烈推荐每一个热爱生活的人都来这里看看。'}</p>
              
              <div className="bg-blue-50/50 border-l-4 border-blue-500 p-6 rounded-r-3xl flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-blue-600 font-black font-display text-xs uppercase tracking-widest">
                  <Compass size={18} />
                  <span>专家点评 & 推荐</span>
                </div>
                <p className="text-slate-800 text-sm font-medium leading-relaxed italic">"这里的建筑风格非常独特，建议在黄昏时分拍摄，光影效果会非常迷人。"</p>
              </div>
            </div>

            <div className="pt-10 mt-6 border-t border-slate-100 pb-16">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-xl font-bold text-slate-900">社区互动 ({post.comments_count})</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold font-display text-xs transition-all ${
                      isLiked ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}
                  >
                    <Heart size={18} className={isLiked ? 'fill-rose-500' : ''} /> {post.likes_count + (isLiked ? 1 : 0)}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-8">
                 {COMMENTS.map((comment: Comment) => (
                   <div key={comment.id} className="flex gap-5 group">
                      <img src={comment.author.avatar} alt="" className="w-12 h-12 rounded-[1.25rem] object-cover shrink-0 ring-4 ring-slate-50 group-hover:rotate-6 transition-transform shadow-sm" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold font-display text-slate-800">{comment.author.name}</span>
                          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-[1.6] bg-slate-50 p-4 rounded-3xl rounded-tl-sm border border-slate-100 italic transition-colors hover:bg-white">{comment.content}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-2xl border-t border-slate-50 z-50">
        <div className="max-w-md mx-auto flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus-within:bg-white transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
          <input 
            type="text" 
            placeholder="写下你的点评..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-800 placeholder-slate-300 font-medium outline-none" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button 
            onClick={() => { if(newComment) { onAddComment(newComment); setNewComment(''); } }}
            className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition-colors font-bold disabled:opacity-20"
            disabled={!newComment}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
