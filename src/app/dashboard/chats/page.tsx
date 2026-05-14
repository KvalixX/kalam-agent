'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send,
  User,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { getConversations, getMessages, sendMessage } from '@/lib/actions/dashboard';
import { createClient } from '@/lib/supabase/client';

export default function ChatsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [view, setView] = useState<'list' | 'chat' | 'details'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const loadConversations = async () => {
    const data = await getConversations();
    setConversations(data);
    if (data.length > 0 && !selectedChat) {
      setSelectedChat(data[0]);
    }
    setIsLoading(false);
  };

  const loadMessages = async (id: string) => {
    const data = await getMessages(id);
    setMessages(data);
  };

  useEffect(() => {
    loadConversations();

    // Realtime subscription for conversations list
    const convChannel = supabase
      .channel('conversations_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, () => {
        loadConversations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(convChannel);
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);

      // Realtime subscription for messages in selected conversation
      const msgChannel = supabase
        .channel(`messages_${selectedChat.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${selectedChat.id}`
        }, (payload) => {
          setMessages(prev => [...prev, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(msgChannel);
      };
    }
  }, [selectedChat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat || isSending) return;

    setIsSending(true);
    const text = inputText;
    setInputText('');
    
    const { error } = await sendMessage(selectedChat.id, text);
    if (error) {
      alert(error);
      setInputText(text);
    }
    setIsSending(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] -m-4 overflow-hidden bg-white relative">
      {/* Chats List */}
      <div className={cn(
        "w-full lg:w-80 border-r border-border flex flex-col shrink-0 bg-[#FBFCFD] transition-all",
        view !== 'list' && "hidden lg:flex"
      )}>
        <div className="p-4 border-b border-border bg-white">
           <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-border rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
           </div>
           <div className="flex items-center gap-1.5">
              {['All', 'AI Active', 'Human'].map(tab => (
                <button key={tab} className="text-[9px] font-bold uppercase px-3 py-1 rounded-lg bg-gray-100 text-gray-400 hover:text-primary transition-all">
                  {tab}
                </button>
              ))}
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-border/50">
          {conversations.length > 0 ? conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                setView('chat');
              }}
              className={cn(
                "p-4 cursor-pointer transition-all hover:bg-gray-50 relative",
                selectedChat?.id === chat.id && "bg-primary/[0.03] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary"
              )}
            >
               <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-foreground truncate max-w-[140px]">
                    {chat.customers?.name || 'WhatsApp User'}
                  </span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter shrink-0">
                    {new Date(chat.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
               </div>
               <p className="text-[10px] text-gray-500 truncate mb-2 leading-relaxed">
                 {chat.status === 'active' ? '✨ AI is handling this...' : 'Waiting for human response...'}
               </p>
               <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-[7px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                    chat.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {chat.status === 'active' ? 'AI Active' : 'Human Needed'}
                  </span>
               </div>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-400">
               <p className="text-[10px] font-bold uppercase tracking-widest">No active chats</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-[#F8FAFC] relative border-r border-border transition-all",
        view === 'list' && "hidden lg:flex",
        view === 'details' && "hidden lg:flex"
      )}>
         {selectedChat ? (
           <>
             {/* Chat Header */}
             <div className="h-14 bg-white border-b border-border flex items-center justify-between px-6 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                   <button onClick={() => setView('list')} className="p-1 lg:hidden text-gray-400">
                      <ArrowLeft className="w-5 h-5" />
                   </button>
                   <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {selectedChat.customers?.name?.[0] || 'W'}
                   </div>
                   <div onClick={() => setView('details')} className="cursor-pointer">
                      <h3 className="text-xs font-bold text-foreground leading-tight">{selectedChat.customers?.name || 'WhatsApp User'}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Live Now</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="px-3 py-1.5 bg-white border border-border rounded-xl text-[10px] font-bold uppercase text-gray-600 hover:border-primary/20 hover:text-primary transition-all flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Take Over
                   </button>
                </div>
             </div>

             {/* Messages Area */}
             <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.type === 'user' ? 'justify-start' : 'justify-end')}>
                     <div className={cn(
                       "max-w-[80%] p-3 rounded-2xl text-[12px] shadow-sm relative",
                       msg.type === 'user' 
                         ? 'bg-white border border-border rounded-tl-none' 
                         : 'bg-[#25D366] text-white rounded-tr-none'
                     )}>
                        <p className="leading-relaxed font-medium">{msg.text}</p>
                        <p className={cn(
                          "text-[8px] mt-2 font-bold uppercase tracking-tighter opacity-70",
                          msg.type === 'user' ? 'text-gray-400' : 'text-white/80 text-right'
                        )}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                     </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
             </div>

             {/* Input Area */}
             <div className="p-4 bg-white border-t border-border">
                <form onSubmit={handleSend} className="flex items-center gap-3 max-w-4xl mx-auto">
                   <input 
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     placeholder="Type a message..."
                     className="flex-1 px-4 py-2.5 bg-gray-50 border border-border rounded-2xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                   />
                   <button 
                     disabled={isSending || !inputText.trim()}
                     type="submit"
                     className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
                   >
                      {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                   </button>
                </form>
                <p className="text-[9px] text-center text-gray-400 mt-2 font-medium">AI Agent is actively monitoring this conversation.</p>
             </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mb-4 border border-border">
                 <CheckCircle2 className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-tight">Select a conversation</h3>
              <p className="text-[11px] text-gray-400 max-w-[200px] font-medium leading-relaxed">Choose a chat from the sidebar to view message history and take control.</p>
           </div>
         )}
      </div>

      {/* Side Details (Desktop Only) */}
      <div className={cn(
        "w-80 bg-white p-6 space-y-8 overflow-y-auto shrink-0 transition-all",
        view !== 'details' && "hidden xl:block"
      )}>
         {selectedChat && (
           <>
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-border flex items-center justify-center text-gray-400">
                   <User className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-foreground leading-tight">{selectedChat.customers?.name || 'WhatsApp User'}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{selectedChat.customers?.phone || 'No Phone'}</p>
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <h5 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-3">Customer Segments</h5>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold uppercase">New Lead</span>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-600 text-[9px] font-bold uppercase tracking-tighter">AI Engaged</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-border">
                   <h5 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-3">AI Context</h5>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-gray-500 font-medium">Confidence Score</span>
                         <span className="text-[10px] font-bold text-emerald-600">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-gray-500 font-medium">Last Interaction</span>
                         <span className="text-[10px] font-bold text-foreground">Just now</span>
                      </div>
                   </div>
                </div>
             </div>
           </>
         )}
      </div>
    </div>
  );
}
