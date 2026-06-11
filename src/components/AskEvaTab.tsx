import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Trash2, 
  HelpCircle,
  Clock,
  User,
  Bot
} from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';

interface AskEvaTabProps {}

export default function AskEvaTab({}: AskEvaTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### Welcome to Ask Eva (Gemini ESG Consultant) 🌿

I am **Eva**, your interactive consultant powered by Google Gemini. I am trained on environmental standards, Greenhouse Gas (GHG) Protocol rules, and global compliance standards (including BRSR, SEC, and CSRD).

**Here are some topics you can query me on:**
* "Calculate the Scope 1 emissions for our gas burner"
* "How do I align my organization for BRSR disclosures?"
* "Explain the difference between Scope 2 location-based vs market-based footprints"
* "Review options to mitigate facility water intensity values"
      
*Simply enter a custom query below, or choose one of our quick templates to begin.*`,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptTemplates = [
    "What are Scope 1 direct emissions and how to audit them?",
    "Generate a BRSR framework alignment check outline",
    "Identify options to reduce factory water consumption tags"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load message logs from Firestore or LocalStorage on boot
  useEffect(() => {
    const loadLogs = async () => {
      if (isFirebaseConfigured && db) {
        try {
          const q = query(collection(db, 'chat_history'), orderBy('createdAt', 'asc'));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const loadedLogs: ChatMessage[] = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              loadedLogs.push({
                id: doc.id,
                role: data.role || 'assistant',
                content: data.content || '',
                timestamp: data.timestamp || ''
              });
            });
            setMessages(prev => {
              const welcome = prev.filter(m => m.id === 'welcome');
              return [...welcome, ...loadedLogs];
            });
          }
        } catch (err) {
          console.warn("Firestore message fetch error, using local state instead: ", err);
        }
      } else {
        const cached = localStorage.getItem('smartease_ask_eva_logs_v2');
        if (cached) {
          try {
            setMessages(JSON.parse(cached));
          } catch (e) {}
        }
      }
    };
    loadLogs();
  }, []);

  // Save to LocalStorage fallback whenever messages update
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('smartease_ask_eva_logs_v2', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Sync user message to Firebase if configured
    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'chat_history'), {
          userId: 'jamie.taylor@sustaincorp.com',
          role: 'user',
          content: promptText,
          timestamp: userMessage.timestamp,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Firebase chat write failed:", err);
      }
    }

    try {
      // Gather active history for multi-turn capability (excluding the very first greeting text)
      const activeHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const response = await fetch('/api/ask-eva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          history: activeHistory
        })
      });

      if (!response.ok) {
        throw new Error('Ask Eva endpoint response was not ok');
      }

      const data = await response.json();
      const answerContent = data.text || "I was unable to process this request.";
      
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: answerContent,
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Sync Assistant Message to Firebase if configured
      if (isFirebaseConfigured && db) {
        try {
          await addDoc(collection(db, 'chat_history'), {
            userId: 'jamie.taylor@sustaincorp.com',
            role: 'assistant',
            content: answerContent,
            timestamp: assistantMessage.timestamp,
            createdAt: serverTimestamp()
          });
        } catch (err) {
          console.error("Firebase assistant write failed:", err);
        }
      }
    } catch (err: any) {
      console.error(err);
      const errorContent = `**[Connection Error]** I had trouble reaching the sustainability backend: ${err.message || 'System issues'}. 

Please check that your Express full-stack environment has booted properly on port \`3000\`, or try resubmitting.`;

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    if (confirm("Are you sure you want to clear your ESG consultation log?")) {
      const defaultState = [
        {
          id: 'welcome',
          role: 'assistant' as const,
          content: `### Log Cleared. Ask me anything else:`,
          timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(defaultState);
      localStorage.setItem('smartease_ask_eva_logs_v2', JSON.stringify(defaultState));

      if (isFirebaseConfigured && db) {
        try {
          const snapshot = await getDocs(collection(db, 'chat_history'));
          snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        } catch (err) {
          console.error("Firestore chat query/delete error:", err);
        }
      }
    }
  };

  // Helper to quickly convert Markdown lines in the model response into HTML
  const renderMarkdownText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold font-display text-slate-900 mt-3 mb-1.5">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-base font-bold font-display text-slate-900 mt-4 border-b border-slate-100 pb-1 mb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-700 pl-1 mt-1 leading-relaxed">
            {line.trim().substring(2)}
          </li>
        );
      }
      if (/^\d+\s*\.\s/.test(line.trim())) {
        const dotIdx = line.indexOf('.');
        return (
          <li key={idx} className="ml-4 list-decimal text-xs text-slate-700 pl-1 mt-1 leading-relaxed">
            {line.trim().substring(dotIdx + 2)}
          </li>
        );
      }
      let formattedLine: any = line;
      if (line.includes('**')) {
        const parts = line.split('**');
        formattedLine = parts.map((part, pIdx) => {
          if (pIdx % 2 === 1) {
            return <strong key={pIdx} className="font-extrabold text-slate-900">{part}</strong>;
          }
          return part;
        });
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2"></div>;
      }

      return <p key={idx} className="text-xs text-slate-700 leading-relaxed font-sans">{formattedLine}</p>;
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs h-[calc(100vh-140px)] flex flex-col overflow-hidden animate-fade-in" id="ask-eva-panel">
      {/* Panel Header */}
      <header className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-bold font-display text-slate-900 text-sm flex items-center gap-1.5">
              <span>Ask Eva AI ESG Agent</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Connected"></span>
            </h2>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Gemini 3.5 Flash Model Connected</p>
          </div>
        </div>

        <button 
          onClick={clearChat}
          className="text-slate-400 hover:text-red-600 bg-white border border-slate-200 p-2 rounded-lg hover:shadow-xs transition-all cursor-pointer"
          title="Clear Conversation Logs"
        >
          <Trash2 size={15} />
        </button>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 animate-fade-in">
        {messages.map((msg, index) => (
          <div 
            key={msg.id || index}
            className={`flex gap-3 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-3xs ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div className="space-y-1">
              <div className={`p-4 rounded-xl shadow-3xs text-xs space-y-1.5 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-150 text-slate-850 rounded-tl-none'}`}>
                {msg.role === 'user' ? (
                  <p className="font-sans leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="space-y-1 text-slate-800">
                    {renderMarkdownText(msg.content)}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-400 block px-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto items-start max-w-lg">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-3xs animate-bounce shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-white border border-slate-150 p-4 rounded-xl rounded-tl-none shadow-3xs text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                <span className="font-mono text-xs font-semibold animate-pulse">
                  Eva is analyzing calculations & compiling disclosures...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Suggestion Prompt Cards */}
      {messages.length === 1 && !isLoading && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase block mb-2">
            Suggested Quick Actions:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {promptTemplates.map((template, idx) => (
              <button 
                key={idx}
                onClick={() => handleSendPrompt(template)}
                className="text-left bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 p-2.5 rounded-lg text-xs leading-normal font-medium text-slate-600 transition-all shadow-3xs cursor-pointer"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input controls footer */}
      <footer className="p-4 border-t border-slate-150 bg-white">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputText);
          }}
          className="flex gap-2"
        >
          <input 
            type="text"
            placeholder="Type your climate policy, emission query, or alignment criteria here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold text-xs px-4 rounded-lg flex items-center justify-center gap-1 shadow-3xs transition-all disabled:text-slate-400 cursor-pointer"
          >
            <span>Send</span>
            <Send size={12} />
          </button>
        </form>
      </footer>
    </div>
  );
}
