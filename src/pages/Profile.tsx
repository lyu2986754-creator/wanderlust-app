import React from 'react';
import { User as UserIcon, Camera, ChevronRight, Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User, Post } from '../types';

interface ProfileProps {
  user: User | null;
  posts: Post[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, posts, onLogout }) => {
  const userPosts = posts.filter(p => p.author_id === user?.id || p.id.startsWith('new-'));

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-8 text-center gap-6">
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200">
          <UserIcon size={48} strokeWidth={1} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-black text-slate-900 italic tracking-tighter">登录开启精彩</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
            登录您的账户以查看您的旅程回忆，同步您的足迹和关注者。
          </p>
        </div>
        <Link 
          to="/auth"
          className="w-full max-w-[240px] bg-slate-900 text-white p-5 rounded-[2rem] font-display font-black text-lg tracking-tight shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          立即登录 / 注册
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-32 pt-8 px-5">
      <div className="flex flex-col items-center gap-5 text-center mt-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden ring-8 ring-slate-50 shadow-2xl relative rotate-3 group-hover:rotate-0 transition-transform">
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-xl border-4 border-white active:scale-90 transition-transform hover:bg-blue-600"><Camera size={18} /></button>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl font-black text-slate-900 tracking-tighter">{user.name}</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100/50 shadow-sm">{user.level}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 hover:opacity-70 transition-opacity"
        >
          退出登录
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 px-6 py-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-black text-slate-900">{(user.stats?.footprints || 0) + userPosts.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">足迹</span>
        </div>
        <div className="flex flex-col items-center border-x border-slate-200">
          <span className="font-display text-2xl font-black text-slate-900">{user.stats?.followers || 0}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">关注者</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display text-2xl font-black text-slate-900">{user.stats?.likes || 0}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">获赞</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-display text-xl font-bold text-slate-900">我的旅程</h3>
          <button className="text-slate-300"><ChevronRight size={24} /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {userPosts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className="aspect-square rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                 <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Heart size={14} className="fill-rose-500 text-rose-500" />
                    <span>{post.likes_count}</span>
                 </div>
              </div>
            </Link>
          ))}
          <button className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-blue-200 hover:text-blue-400 transition-all bg-slate-50/50">
             <Plus size={32} />
             <span className="text-[10px] font-bold uppercase tracking-widest">上传新回忆</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
