import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { aiService } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '您好！我是您的 AI 旅行规划师。我可以为您制定详细的行程、推荐地道美食或提供避坑指南。您想去哪里探索？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage([...messages, userMessage]);
      const aiMessage: Message = { role: 'assistant', content: response.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我暂时无法连接到大脑，请检查您的 API Key 配置。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white border-b border-slate-100 shrink-0 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <h1 className="font-display font-black text-lg tracking-tighter">AI 智能导游</h1>
        </div>
        <div className="w-10" />
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-sm' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <Sparkles size={16} className="animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-sm shadow-sm border border-slate-100">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-6 bg-white border-t border-slate-100 pb-10">
        <div className="max-w-md mx-auto flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm">
          <input 
            type="text" 
            placeholder="告诉 AI 您的想法（如：南昌三天怎么玩？）" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-800 placeholder-slate-400 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="text-blue-500 hover:text-blue-600 disabled:text-slate-300 transition-colors"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
