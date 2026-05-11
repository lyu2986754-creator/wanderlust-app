import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Thermometer, Languages, Navigation, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';

const DestinationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const dest = DESTINATIONS.find(d => d.id === id);

  if (!dest) return <div className="p-20 text-center">目的地未找到</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-32"
    >
      <div className="relative h-[500px] w-full">
        <img src={dest.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white via-transparent to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-10 left-6 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-slate-800 border border-white/20 shadow-lg hover:bg-white transition-colors z-50"
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
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.name + ' ' + dest.country)}`, '_blank')}
            className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-display font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl"
          >
            <Navigation size={22} fill="currentColor" />
            <span>谷歌地图导航 & 开启旅程</span>
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

export default DestinationDetail;
