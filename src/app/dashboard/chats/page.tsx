'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Send,
  User,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const chats = [
  { id: 1, name: 'Youssef Benali', message: 'Wach kayna f taille L?', time: '2m ago', unread: 2, status: 'AI Active' },
  { id: 2, name: 'Sara Kamali', message: 'Ok chokran bzaf!', time: '12m ago', unread: 0, status: 'AI Active' },
  { id: 3, name: 'Ahmed Mansouri', message: 'Bghit nrejou3 wahd lcommande', time: '1h ago', unread: 0, status: 'Needs Human' },
  { id: 4, name: 'Leila Ziani', message: 'Finahwa lmagasin dyalkom?', time: '3h ago', unread: 0, status: 'Resolved' },
];

const messages = [
  { id: 1, type: 'user', text: 'Salam, wach kayna l jacket f taille L?', time: '10:42 AM' },
  { id: 2, type: 'agent', text: 'Wa alaykum salam! Oui kayna f L, bghitiha f noir wla beige? ✨', time: '10:42 AM' },
  { id: 3, type: 'user', text: 'Noir 3afak. Chhal lwa9t dyal livraison l Rabat?', time: '10:43 AM' },
  { id: 4, type: 'agent', text: 'Livraison l Rabat katakhod 24h m3a Amana Express. Ncreer lik commande daba?', time: '10:43 AM' },
  { id: 5, type: 'user', text: 'Oui kherjha liya 3afak', time: '10:44 AM' },
  { id: 6, type: 'agent', text: 'Perfect! Sayft liya ghi smia lkamla w ladresse dyalk bach nvalider. 📦', time: '10:44 AM' },
];

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [view, setView] = useState<'list' | 'chat' | 'details'>('list');

  return (
    <div className="flex h-[calc(100vh-100px)] -m-4 overflow-hidden bg-white relative">
      {/* Chats List */}
      <div className={cn(
        "w-full lg:w-64 border-r border-border flex flex-col shrink-0 bg-[#FBFCFD] transition-all",
        view !== 'list' && "hidden lg:flex"
      )}>
        <div className="p-3 border-b border-border bg-white">
           <div className="relative mb-2">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-7 pr-3 py-1 bg-gray-50 border border-border rounded text-[11px] focus:outline-none"
              />
           </div>
           <div className="flex items-center gap-1">
              {['All', 'AI', 'Human'].map(tab => (
                <button key={tab} className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-400 hover:text-primary transition-all">
                  {tab}
                </button>
              ))}
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                setView('chat');
              }}
              className={`p-3 border-b border-border cursor-pointer transition-all hover:bg-gray-50 ${selectedChat.id === chat.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
            >
               <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-semibold text-foreground">{chat.name}</span>
                  <span className="text-[8px] text-gray-400 font-medium">{chat.time}</span>
               </div>
               <p className="text-[10px] text-gray-500 truncate mb-1.5">{chat.message}</p>
               <div className="flex items-center justify-between">
                  <span className={`text-[7px] font-semibold px-1 py-0.5 rounded uppercase tracking-tighter ${
                    chat.status === 'AI Active' ? 'bg-emerald-50 text-emerald-600' : 
                    chat.status === 'Needs Human' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {chat.status}
                  </span>
                  {chat.unread > 0 && (
                    <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-semibold">
                       {chat.unread}
                    </div>
                  )}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-[#F1F5F9] relative border-r border-border transition-all",
        view === 'list' && "hidden lg:flex",
        view === 'details' && "hidden lg:flex"
      )}>
         {/* Chat Header */}
         <div className="h-10 bg-white border-b border-border flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => setView('list')}
                 className="p-1 lg:hidden text-gray-400 hover:text-foreground"
               >
                  <ArrowLeft className="w-4 h-4" />
               </button>
               <div className="w-7 h-7 rounded bg-primary-light flex items-center justify-center text-primary font-semibold text-[10px]">
                  {selectedChat.name[0]}
               </div>
               <div onClick={() => setView('details')} className="cursor-pointer">
                  <h3 className="text-[11px] font-semibold text-foreground leading-tight">{selectedChat.name}</h3>
                  <div className="flex items-center gap-1">
                     <span className="w-1 h-1 rounded-full bg-emerald-500" />
                     <span className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter">AI Active</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-1.5">
               <button className="px-2 py-0.5 rounded border border-border text-[9px] font-semibold uppercase text-gray-500 hover:bg-gray-50 transition-all">Take Over</button>
            </div>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                 <div className={`max-w-[85%] p-2 rounded-lg text-[11px] shadow-sm relative ${
                   msg.type === 'user' ? 'bg-white text-gray-800' : 'bg-primary text-white'
                 }`}>
                    <p className="leading-tight font-normal">{msg.text}</p>
                    <p className={`text-[7px] mt-1 font-medium ${msg.type === 'user' ? 'text-gray-400' : 'text-white/60 text-right'}`}>{msg.time}</p>
                 </div>
              </div>
            ))}
         </div>

         {/* Input */}
         <div className="p-3 bg-white border-t border-border z-10">
            <div className="flex items-center gap-2">
               <div className="flex-1 bg-gray-50 border border-border rounded px-3 py-1.5 text-[10px] text-gray-400 italic">
                  AI is currently responding...
               </div>
               <button className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                  <Send className="w-3.5 h-3.5" />
               </button>
            </div>
         </div>
      </div>

      {/* Side Details */}
      <div className={cn(
        "w-full lg:w-60 bg-white p-4 space-y-5 overflow-y-auto shrink-0 transition-all",
        view !== 'details' && "hidden lg:block"
      )}>
         <div className="flex items-center gap-2 mb-4 lg:hidden">
            <button onClick={() => setView('chat')} className="p-1 text-gray-400">
               <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold uppercase">Customer Profile</span>
         </div>

         <div>
            <h4 className="text-[9px] font-semibold text-gray-300 uppercase tracking-widest mb-3">Customer</h4>
            <div className="flex items-center gap-2 mb-3">
               <div className="w-8 h-8 rounded bg-gray-50 border border-border flex items-center justify-center text-gray-400">
                  <User className="w-4 h-4" />
               </div>
               <div>
                  <p className="text-[11px] font-semibold text-foreground">{selectedChat.name}</p>
                  <p className="text-[9px] text-gray-400 font-medium uppercase">Casablanca</p>
               </div>
            </div>
            <div className="flex gap-1">
               <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 uppercase">VIP</span>
               <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 uppercase">3 Orders</span>
            </div>
         </div>

         <div className="pt-4 border-t border-border">
            <h4 className="text-[9px] font-semibold text-gray-300 uppercase tracking-widest mb-3">Store Data</h4>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Platform</span>
                  <span className="text-[10px] font-semibold text-foreground">Shopify</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Confidence</span>
                  <span className="text-[10px] font-semibold text-emerald-600">98%</span>
               </div>
            </div>
         </div>

         <div className="pt-4 border-t border-border">
            <h4 className="text-[9px] font-semibold text-gray-300 uppercase tracking-widest mb-3">Order History</h4>
            <div className="space-y-2">
               <div className="p-2 bg-gray-50 rounded border border-border">
                  <p className="text-[10px] font-semibold text-foreground">#ORD-91</p>
                  <div className="flex justify-between mt-0.5">
                     <span className="text-[8px] text-gray-400 font-medium">Delivered</span>
                     <span className="text-[9px] font-semibold text-foreground">890 MAD</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
