import React from 'react';
import { Home, Compass, Users, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const active = location.pathname;

  const items = [
    { path: '/', icon: <Home size={24} />, label: '首页' },
    { path: '/explore', icon: <Compass size={24} />, label: '探索' },
    { path: '/community', icon: <Users size={24} />, label: '社区' },
    { path: '/profile', icon: <UserIcon size={24} />, label: '我的' }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            active === item.path ? 'text-accent' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${active === item.path ? 'bg-accent/10 border border-accent/10' : ''}`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold tracking-wider font-display uppercase">{item.label}</span>
          {active === item.path && (
            <motion.div layoutId="nav-indicator" className="w-1.5 h-1.5 rounded-full bg-accent" />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
