import React, { useState, useEffect } from 'react';
import { Search, MapPin, Compass, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { Destination } from '../types';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(DESTINATIONS);
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '海岛', '都市', '文化', '自然', '美食'];

  useEffect(() => {
    const filtered = DESTINATIONS.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === '全部' || dest.tags.some(tag => tag.includes(activeCategory));
      return matchesSearch && matchesCategory;
    });
    setFilteredDestinations(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex flex-col gap-8 pb-32 pt-4 px-5 min-h-screen bg-white">
      <header className="flex flex-col gap-6 sticky top-0 bg-white/80 backdrop-blur-md z-40 py-2 -mx-5 px-5 border-b border-slate-50">
        <div className="flex justify-between items-center">
          <h1 className="font-display font-black text-2xl tracking-tighter text-slate-800 italic">EXPLORE</h1>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <Compass size={22} className="animate-pulse" />
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜索目的地、国家..." 
            className="w-full bg-slate-50 border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm transition-all text-slate-800 placeholder-slate-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => (
              <Link 
                key={dest.id}
                to={`/destination/${dest.id}`}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-50 hover:shadow-xl transition-all aspect-[16/10]"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {dest.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[8px] font-bold text-white uppercase">{tag}</span>
                  ))}
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1">{dest.country}</p>
                    <h3 className="text-white font-display text-2xl font-bold">{dest.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={8} className="fill-amber-400 text-amber-400" />)}
                      </div>
                      <span className="text-[8px] font-bold text-white/50 uppercase tracking-tighter">{dest.explorers} 位探险者已去过</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <Compass size={48} className="text-slate-100" />
              <p className="text-slate-400 font-medium">未找到匹配的目的地</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-900 rounded-[3rem] p-10 mt-4 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all" />
        <h2 className="text-white font-display text-3xl font-black italic tracking-tighter mb-4 leading-tight">获取个性化<br />旅行建议</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">告诉我们您的偏好，AI 将为您定制专属的全球探索线路。</p>
        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-display font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
          开启 AI 规划
        </button>
      </section>
    </div>
  );
};

export default Explore;
