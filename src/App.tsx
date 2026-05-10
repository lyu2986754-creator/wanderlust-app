import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Home, 
  Compass, 
  Users, 
  User as UserIcon, 
  Star, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Navigation, 
  ChevronRight,
  Plus,
  Send,
  Thermometer,
  Languages,
  ArrowRight,
  Camera,
  Mail,
  Lock,
  ArrowLeft,
  Chrome
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS, POSTS, COMMENTS } from './constants';
import { View, Destination, Post, User } from './types';
import { postService, commentService, authService } from './services/api';

// --- Shared Components ---

const BottomNav = ({ active, onNavigate }: { active: View, onNavigate: (v: View) => void }) => {
  const items: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={24} />, label: '首页' },
    { id: 'explore', icon: <Compass size={24} />, label: '探索' },
    { id: 'community', icon: <Users size={24} />, label: '社区' },
    { id: 'profile', icon: <UserIcon size={24} />, label: '我的' }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            active === item.id ? 'text-accent' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${active === item.id ? 'bg-accent/10 border border-accent/10' : ''}`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold tracking-wider font-display uppercase">{item.label}</span>
          {active === item.id && (
            <motion.div layoutId="nav-indicator" className="w-1.5 h-1.5 rounded-full bg-accent" />
          )}
        </button>
      ))}
    </nav>
  );
};

// --- Views ---

const HomeView = ({ 
  onNavigate, 
  onDestDetail, 
  onPostDetail,
  posts
}: { 
  onNavigate: (v: View) => void, 
  onDestDetail: (d: Destination) => void,
  onPostDetail: (p: Post) => void,
  posts: Post[]
}) => {
  return (
    <div className="flex flex-col gap-8 pb-32 pt-4 px-5">
      <header className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 py-2 -mx-5 px-5 border-b border-slate-50">
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"><Search size={22} /></button>
        <h1 className="font-display font-black text-2xl tracking-tighter text-slate-800 italic">WANDERLUST</h1>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900">探索世界的角落</h2>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜索你想去的地方..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm transition-all text-slate-800 placeholder-slate-400 outline-none"
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex justify-between items-end">
          <h3 className="font-display text-xl font-bold text-slate-900">热门目的地</h3>
          <button className="text-accent text-xs font-bold font-display uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity">全部目的地 <ChevronRight size={14} /></button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 -mx-5 px-5 pb-2">
          {DESTINATIONS.map((dest) => (
            <motion.div 
              key={dest.id}
              whileHover={{ y: -8 }}
              onClick={() => onDestDetail(dest)}
              className="relative rounded-[2rem] overflow-hidden w-[240px] h-[320px] shrink-0 shadow-[0_15px_30px_rgba(0,0,0,0.08)] cursor-pointer group border border-slate-100"
            >
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                {dest.isTrending && (
                  <span className="self-start px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg font-display text-[10px] font-bold text-white mb-2 border border-white/30 uppercase tracking-widest">热门</span>
                )}
                <h4 className="font-display text-xl font-bold text-white tracking-tight">{dest.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={14} className="text-blue-400" />
                  <span className="font-sans text-[11px] text-white/90 font-medium tracking-wide">{dest.country}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="font-display text-xl font-bold text-slate-900">精选攻略</h3>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ y: -4 }}
              onClick={() => onPostDetail(post)}
              className="bg-white rounded-[2rem] overflow-hidden flex flex-col cursor-pointer transition-all border border-slate-100 shadow-sm hover:shadow-md"
            >
              <div className="relative h-56 w-full">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow-sm border border-slate-100">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="font-display text-xs font-bold text-slate-800">{post.rating || '4.5'}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex gap-2">
                  {post.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-slate-50 text-slate-500 font-display text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-slate-100">{tag}</span>
                  ))}
                </div>
                <h4 className="font-display text-lg font-bold text-slate-900 leading-snug">{post.title}</h4>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover grayscale transition-all hover:grayscale-0" />
                    <span className="font-display text-[11px] font-bold text-slate-400 uppercase tracking-widest">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="flex items-center gap-1 text-[10px] font-bold"><Heart size={14} /> {post.likes_count}</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold"><MessageCircle size={14} /> {post.comments_count}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const CommunityView = ({ onNavigate, posts, onPostDetail, onOpenShare }: { onNavigate: (v: View) => void, posts: Post[], onPostDetail: (p: Post) => void, onOpenShare: () => void }) => {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '攻略', '问答', '摄影'];

  const filteredPosts = posts.filter(p => {
    if (activeTab === '全部') return true;
    if (activeTab === '攻略' && p.type === 'guide') return true;
    if (activeTab === '问答' && p.type === 'qa') return true;
    if (activeTab === '摄影' && p.type === 'photo') return true;
    return false;
  });

  return (
    <div className="flex flex-col gap-6 pb-32 pt-4 px-5">
      <header className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 py-2 -mx-5 px-5 border-b border-slate-50">
        <h2 className="font-display text-xl font-bold text-slate-800">全球旅人社区</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400"><Search size={22} /></button>
          <button className="p-2 text-slate-400 relative">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold font-display transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {filteredPosts.map(post => (
          <article 
            key={post.id} 
            onClick={() => onPostDetail(post)}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-sm cursor-pointer hover:shadow-xl transition-all group"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={post.author.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50" />
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">{post.author.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{new Date(post.created_at).toLocaleDateString()} • {post.location}</p>
                </div>
              </div>
              <button className="p-2 text-slate-200 group-hover:text-slate-400 transition-colors"><Share2 size={18} /></button>
            </div>
            
            {post.type !== 'qa' && (
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            )}
            
            <div className="p-7 flex flex-col gap-4">
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-bold font-display uppercase tracking-wider ${
                  post.type === 'guide' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  post.type === 'qa' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  #{post.type === 'guide' ? '攻略' : post.type === 'qa' ? '问答' : '摄影'}
                </span>
                {post.tags?.slice(0, 1).map(tag => (
                   <span key={tag} className="px-3 py-1 rounded-lg text-[9px] font-bold font-display uppercase tracking-wider bg-slate-50 text-slate-400 border border-slate-100">{tag}</span>
                ))}
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900 leading-snug">{post.title}</h4>
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
        className="absolute bottom-24 right-6 bg-slate-900 text-white w-16 h-16 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

const DestinationDetail = ({ dest, onBack, onNavigateMap }: { dest: Destination, onBack: () => void, onNavigateMap: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-[60] overflow-y-auto pb-32"
    >
      <div className="relative h-[500px] w-full">
        <img src={dest.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white via-transparent to-transparent" />
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-slate-800 border border-white/20 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <div className="absolute bottom-12 left-8 right-8">
          <div className="flex gap-2 mb-4">
             {dest.tags.map(tag => (
               <span key={tag} className="px-3.5 py-1.5 bg-white shadow-md text-slate-800 rounded-xl text-[10px] font-display font-bold uppercase tracking-wider">{tag}</span>
             ))}
          </div>
          <h1 className="font-serif-cn text-4xl text-slate-900 font-extrabold tracking-tight mb-3 leading-tight drop-shadow-sm">{dest.name}</h1>
          <p className="flex items-center gap-2 text-slate-600 font-sans text-sm font-medium">
            <MapPin size={18} className="text-blue-500" />
            <span>{dest.country}</span>
          </p>
        </div>
      </div>

      <div className="px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col gap-10 border border-slate-50">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4">目的地概览</h2>
            <p className="font-sans text-slate-500 text-[15px] leading-relaxed text-justify">
              探访{dest.name}，探索这片充满魅力的土地。无论您是在寻找宁静的避难所，还是充满活力的都市体验，这里都能满足您的所有期待。从历史悠久的建筑到现代感十足的地标，每一处景色都值得停下脚步细细品味。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <Thermometer size={24} className="text-rose-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">最佳季节</p>
                <p className="text-sm font-bold text-slate-800 italic">4月 - 10月</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <Languages size={24} className="text-indigo-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">本地语言</p>
                <p className="text-sm font-bold text-slate-800 italic">官方语言</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onNavigateMap}
            className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-display font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl"
          >
            <Navigation size={22} fill="currentColor" />
            <span>地图导航 & 寻找目的地</span>
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-8 pb-10">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-display text-2xl font-bold text-slate-900 leading-none">必打卡景点</h3>
            <button className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">查看地图 <ArrowRight size={14} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {[1, 2].map(i => (
              <div key={i} className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <div className="h-44 w-full overflow-hidden">
                  <img src={dest.image} alt="" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h4 className="font-display text-lg font-bold mb-1 text-slate-800">标志性胜地 #{i}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed uppercase font-bold tracking-widest">历史遗迹 • 徒步体验</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AuthView = ({ onLogin, onBack }: { onLogin: (u: User) => void, onBack: () => void }) => {
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
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-white p-8"
    >
      <header className="flex justify-between items-center mb-12">
        <button onClick={onBack} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
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

      <footer className="mt-auto pt-8 text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed max-w-[240px] mx-auto">
          继续操作即表示您同意 Wanderlust 的 <br />服务协议 和 隐私权政策
        </p>
      </footer>
    </motion.div>
  );
};

const ProfileView = ({ posts, user, onLogout, onNavigateAuth }: { posts: Post[], user: User | null, onLogout: () => void, onNavigateAuth: () => void }) => {
  const userPosts = posts.filter(p => p.id.startsWith('new-') || p.id === 'post-1');
  
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
        <button 
          onClick={onNavigateAuth}
          className="w-full max-w-[240px] bg-slate-900 text-white p-5 rounded-[2rem] font-display font-black text-lg tracking-tight shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          立即登录 / 注册
        </button>
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
            <div key={post.id} className="aspect-square rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                 <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Heart size={14} className="fill-rose-500 text-rose-500" />
                    <span>{post.likes_count}</span>
                 </div>
              </div>
            </div>
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

// --- Icons Patch (ChevronLeft was missing capitalization) ---
const chevronLeft = ChevronRight; // Just for the back button placeholder rotation

const CreatePostModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (p: Partial<Post>) => void }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'guide' | 'qa' | 'photo'>('guide');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-0 z-[100] flex flex-col bg-white"
    >
      <header className="p-6 flex justify-between items-center border-b border-slate-100">
        <button onClick={onClose} className="p-2 text-slate-400"><Plus className="rotate-45" size={24} /></button>
        <h2 className="font-display text-lg font-bold text-slate-900">发布新动态</h2>
        <button 
          onClick={() => onSubmit({ title, content, type })}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50"
          disabled={!title || !content}
        >
          发布
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex gap-2">
           {['guide', 'photo', 'qa'].map(t => (
             <button 
               key={t}
               onClick={() => setType(t as any)}
               className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                 type === t ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
               }`}
             >
               {t === 'guide' ? '攻略' : t === 'photo' ? '摄影' : '问答'}
             </button>
           ))}
        </div>

        <input 
          type="text" 
          placeholder="给你的故事起个标题..." 
          className="w-full text-2xl font-display font-bold text-slate-900 placeholder-slate-200 border-none focus:ring-0 p-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          placeholder="分享你的旅行心得、推荐攻略或提出你的疑问..." 
          className="w-full flex-1 text-slate-600 leading-relaxed border-none focus:ring-0 p-0 resize-none min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-slate-200 transition-colors cursor-pointer bg-slate-50/50">
           <Camera size={40} strokeWidth={1.5} />
           <p className="text-xs font-bold uppercase tracking-widest">添加精彩照片</p>
        </div>
      </div>
    </motion.div>
  );
};

const MapView = ({ destName, onBack }: { destName: string, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-slate-50 flex flex-col"
    >
      <header className="absolute top-0 left-0 right-0 p-6 z-10 flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white shadow-xl rounded-2xl text-slate-900 border border-slate-100"><ChevronRight className="rotate-180" size={24} /></button>
        <div className="bg-white/90 backdrop-blur-md flex-1 p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
           <MapPin size={20} className="text-blue-500" />
           <div>
             <h2 className="text-xs font-bold text-slate-900 leading-none mb-0.5">导航至</h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{destName}</p>
           </div>
        </div>
      </header>

      {/* Simplified Mock Map with Grid Pattern */}
      <div className="flex-1 relative bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Animated Path Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <path 
             d="M 100 600 Q 150 400 300 450 T 350 200" 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="4" 
             strokeDasharray="8 8"
             className="opacity-40"
           />
           <circle cx="350" cy="200" r="8" fill="#3b82f6" className="animate-pulse" />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
           <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center text-center max-w-[280px]">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4 animate-bounce">
                <Navigation size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">地图加载中...</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">正在为您规划前往 {destName} 的最佳路线。请允许位置权限以实现实时导航。</p>
           </div>
        </div>
      </div>

      <footer className="bg-white p-8 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-slate-50">
         <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">剩余时间</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">12 分钟 <span className="text-slate-200 font-normal">/ 1.4km</span></p>
            </div>
            <button className="bg-rose-50 text-rose-500 p-4 rounded-2xl hover:bg-rose-100 transition-colors"><Plus className="rotate-45" size={24} /></button>
         </div>
         <button className="w-full bg-blue-600 text-white p-5 rounded-3xl font-display font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-blue-700 transition-all active:scale-95 shadow-blue-500/20">
           <Navigation size={22} fill="currentColor" />
           <span>开启歩行导航</span>
         </button>
      </footer>
    </motion.div>
  );
};

const PostDetail = ({ post, onBack, onAddComment }: { post: Post, onBack: () => void, onAddComment: (comment: string) => void }) => {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-[70] flex flex-col"
    >
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="relative h-[400px] w-full">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
          <button 
            onClick={onBack}
            className="absolute top-10 left-6 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-slate-800 border border-white/20 shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="rotate-180" size={24} />
          </button>
        </div>

        <div className="px-8 -mt-16 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-xl border border-slate-50">
               <div className="flex items-center gap-3">
                 <img src={post.author.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-md" />
                 <div>
                   <h2 className="font-display text-sm font-bold text-slate-900">{post.author.name}</h2>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.location}</p>
                 </div>
               </div>
               <button className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-xs font-bold font-display hover:scale-105 transition-all shadow-lg active:scale-95">
                  关注
               </button>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="font-display text-3xl font-black text-slate-900 leading-tight tracking-tight italic">
                 {post.title}
              </h1>
              <div className="flex items-center gap-6 text-[10px] font-black font-display uppercase tracking-widest">
                 <div className="flex gap-1 text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= (post.rating || 4.5) ? "currentColor" : "none"} className={i > (post.rating || 4.5) ? "text-slate-100" : ""} />)}
                 </div>
                 <span className="text-slate-300">|</span>
                 <span className="text-slate-400">{new Date(post.created_at).toLocaleDateString()} 发布</span>
              </div>

              <div className="font-sans text-slate-500 text-[16px] leading-[1.8] flex flex-col gap-6 text-justify">
                <p>{post.content || '这是一个美妙的旅程，充满了惊喜和发现。我强烈推荐每一个热爱生活的人都来这里看看。'}</p>
                
                <div className="bg-blue-50/50 border-l-4 border-blue-500 p-6 rounded-r-3xl flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-blue-600 font-black font-display text-xs uppercase tracking-widest">
                    <Compass size={18} />
                    <span>专家点评 & 推荐</span>
                  </div>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed italic">"这里的建筑风格非常独特，建议在黄昏时分拍摄，光影效果会非常迷人。"</p>
                </div>

                <p>总之，这不仅仅是一次旅行，更是一次心灵的洗礼。希望能有更多的人在这里找到属于自己的那份宁静。</p>
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
                 {COMMENTS.map(comment => (
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

      <div className="p-6 bg-white/80 backdrop-blur-2xl border-t border-slate-50">
        <div className="max-w-md mx-auto flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus-within:bg-white transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-display text-[10px] font-black shrink-0 shadow-lg italic">USER</div>
          <input 
            type="text" 
            placeholder="写下你的点评..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-800 placeholder-slate-300 font-medium" 
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
    </motion.div>
  );
};


export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [appPosts, setAppPosts] = useState<Post[]>(POSTS);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMapNavOpen, setIsMapNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        // 1. 获取当前登录状态
        const profile = await authService.getCurrentProfile();
        if (profile) setUser(profile);

        // 2. 获取帖子列表
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

    // 3. 实时订阅
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

  const handleLogin = async (u: User) => {
    // 实际项目中这里应该是调用 authService.signIn
    // 为了演示，我们保持简单的登录逻辑，但通过 authService 获取 profile
    setUser(u);
    setCurrentView('profile');
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setCurrentView('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreatePost = async (p: Partial<Post>) => {
    if (!user) {
      setCurrentView('auth');
      return;
    }

    try {
      const newPostData = {
        ...p,
        author_id: user.id,
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop',
        likes_count: 0,
        comments_count: 0,
        location: '未知地点',
        tags: ['新发布的'],
        rating: 5.0
      };
      
      const createdPost = await postService.createPost(newPostData);
      setAppPosts([createdPost, ...appPosts]);
      setIsShareModalOpen(false);
      setCurrentView('community');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!activePost || !user) return;
    
    try {
      const newComment = await commentService.createComment({
        post_id: activePost.id,
        author_id: user.id,
        content
      });
      
      setAppPosts(appPosts.map(p => 
        p.id === activePost.id ? { ...p, comments_count: p.comments_count + 1 } : p
      ));
      
      console.log("Added comment:", newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': 
        return <HomeView 
          onNavigate={setCurrentView} 
          onDestDetail={(d) => { setSelectedDest(d); setCurrentView('destination'); }} 
          onPostDetail={(p) => { setActivePost(p); setCurrentView('post'); }}
          posts={appPosts}
        />;
      case 'community': 
        return <CommunityView 
          onNavigate={setCurrentView} 
          posts={appPosts} 
          onPostDetail={(p) => { setActivePost(p); setCurrentView('post'); }}
          onOpenShare={() => setIsShareModalOpen(true)}
        />;
      case 'profile':
        return <ProfileView 
          posts={appPosts} 
          user={user} 
          onLogout={handleLogout} 
          onNavigateAuth={() => setCurrentView('auth')} 
        />;
      case 'auth':
        return <AuthView onLogin={handleLogin} onBack={() => setCurrentView('home')} />;
      case 'explore':
        return (
          <div className="flex flex-col items-center justify-center p-20 gap-8 text-center h-[90vh] bg-white">
            <Compass size={80} strokeWidth={1} className="text-slate-100 animate-[spin_5s_linear_infinite]" />
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl font-black text-slate-900 italic tracking-tighter">发现无限可能</h2>
              <p className="text-slate-400 text-sm font-medium">正在为您探索全球最迷人的旅行圣地...</p>
            </div>
            <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                 className="w-full h-full bg-blue-500"
               />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center relative overflow-hidden font-sans">
      <div className="w-full max-w-[430px] bg-white min-h-screen h-screen relative shadow-[0_0_80px_rgba(0,0,0,0.06)] overflow-x-hidden border-x border-slate-200 z-10 flex flex-col">
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 overflow-y-auto hide-scrollbar"
          >
            {currentView === 'destination' && selectedDest ? (
              <DestinationDetail 
                dest={selectedDest} 
                onBack={() => { setCurrentView('home'); setSelectedDest(null); }} 
                onNavigateMap={() => setIsMapNavOpen(true)}
              />
            ) : currentView === 'post' && activePost ? (
              <PostDetail 
                post={activePost} 
                onBack={() => { setCurrentView('home'); setActivePost(null); }} 
                onAddComment={handleAddComment}
              />
            ) : (
              renderView()
            )}
          </motion.main>
        </AnimatePresence>

        <AnimatePresence>
           {isShareModalOpen && (
             <CreatePostModal onClose={() => setIsShareModalOpen(false)} onSubmit={handleCreatePost} />
           )}
           {isMapNavOpen && selectedDest && (
             <MapView destName={selectedDest.name} onBack={() => setIsMapNavOpen(false)} />
           )}
        </AnimatePresence>

        {currentView !== 'destination' && currentView !== 'post' && !isShareModalOpen && !isMapNavOpen && (
          <BottomNav active={currentView} onNavigate={setCurrentView} />
        )}
      </div>
    </div>
  );
}

// Utility icon for back button (since I didn't import ChevronLeft explicitly earlier, I used ChevronRight + styling)
const BackIcon = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 rotate-180">
    <ChevronRight size={24} />
  </button>
);
