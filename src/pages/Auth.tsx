import React, { useState } from 'react';
import { ArrowLeft, User as UserIcon, Mail, Lock, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Treat any valid-ish input as success
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name: name || (mode === 'login' ? '路人甲' : '新探险者'),
      email: email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
      level: '青铜探险家',
      stats: {
        footprints: 0,
        followers: 0,
        likes: 0
      },
      created_at: new Date().toISOString()
    };
    onLogin(mockUser);
    navigate('/profile');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-white p-8"
    >
      <header className="flex justify-between items-center mb-12">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
      </header>

      <div className="flex flex-col gap-2 mb-10">
        <h2 className="font-display text-4xl font-black text-slate-900 tracking-tighter">
          {mode === 'login' ? '欢迎回来' : '开启旅程'}
        </h2>
        <p className="text-slate-400 font-medium tracking-tight">
          {mode === 'login' ? '登录以继续您的精彩旅程' : '加入全球旅人社区，分享您的故事'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {mode === 'register' && (
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">姓名</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="您的真实姓名或昵称"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">邮箱</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="email" 
              placeholder="wanderlust@example.com"
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">密码</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="password" 
              placeholder="至少6位字符"
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-display font-black text-lg tracking-tight shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] mt-4"
        >
          {mode === 'login' ? '立即登录' : '创建账户'}
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">或者</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <button 
          onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
          className="w-full bg-white border border-slate-100 p-4 rounded-[2rem] font-display font-bold text-sm tracking-tight shadow-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98]"
        >
          <Chrome size={20} className="text-rose-500" />
          <span>使用 Google 账号继续</span>
        </button>

        <p className="text-sm text-slate-400 font-medium">
          {mode === 'login' ? '还没有账号？' : '已经有账号了？'}
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-slate-900 font-black ml-1 hover:underline active:opacity-70 transition-all"
          >
            {mode === 'login' ? '立即注册' : '点击登录'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Auth;
