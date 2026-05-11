import React from 'react';
import { Search, Bell, Star, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { Destination, Post } from '../types';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredDestinations = DESTINATIONS.filter(dest => {
    const query = searchQuery.toLowerCase();
    if (query === '中国') {
      return dest.country === '中国';
    }
    return dest.name.toLowerCase().includes(query) || 
           dest.country.toLowerCase().includes(query) ||
           dest.tags.some(tag => tag.toLowerCase().includes(query));
  });

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
            placeholder="搜索你想去的地方（如：南昌、中国）..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm transition-all text-slate-800 placeholder-slate-400 outline-none"
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-display text-xl font-bold text-slate-900">
            {searchQuery.toLowerCase() === '中国' ? '中国热门城市导览' : searchQuery ? `关于 "${searchQuery}" 的结果` : '热门目的地'}
          </h3>
          <Link to="/explore" className="text-accent text-[10px] font-bold uppercase tracking-widest hover:underline">查看全部</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-4 no-scrollbar">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest: Destination) => (
              <Link 
                key={dest.id}
                to={`/destination/${dest.id}`}
                className="relative min-w-[240px] h-[320px] rounded-[2.5rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1">{dest.country}</p>
                  <h4 className="text-white font-display text-2xl font-bold mb-2">{dest.name}</h4>
                  <div className="flex gap-2">
                    {dest.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{tag}</span>
                    ))}
                  </div>
                </div>
                {dest.is_trending && (
                  <div className="absolute top-8 left-8 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
                    <span className="text-[8px] font-bold text-white uppercase tracking-tighter">🔥 Trending</span>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="py-10 px-4 flex flex-col gap-2">
              <p className="text-slate-400 text-sm font-medium">暂无有关此城市的攻略内容</p>
              <p className="text-slate-300 text-[10px] uppercase tracking-widest">试试搜索 "中国" 或 "南昌"</p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="font-display text-xl font-bold text-slate-900">社区精选</h3>
          <Link to="/community" className="text-accent text-[10px] font-bold uppercase tracking-widest hover:underline">更多灵感</Link>
        </div>
        <div className="flex flex-col gap-6">
          {posts.slice(0, 3).map((post: Post) => (
            <Link 
              key={post.id}
              to={`/post/${post.id}`}
              className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-50 hover:shadow-xl transition-all group"
            >
              <div className="relative h-60 w-full rounded-[2rem] overflow-hidden mb-5">
                <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">#{post.type}</span>
                </div>
              </div>
              <div className="px-2">
                <h4 className="font-display text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-accent transition-colors">{post.title}</h4>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                    <span className="text-[10px] font-bold text-slate-400">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="flex items-center gap-1 text-[10px] font-bold"><Heart size={14} /> {post.likes_count}</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold"><MessageCircle size={14} /> {post.comments_count}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
