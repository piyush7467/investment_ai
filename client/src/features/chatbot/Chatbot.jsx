import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRobot, FaTimes, FaPaperPlane, FaComment } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import {
  getGuestChatCount,
  incrementGuestChat,
  getRemainingChats,
  hasReachedChatLimit,
} from "../../utils/guestSearch";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hello! I am your AI Investment Assistant. Ask me anything about stock valuations, financial terms, or specific companies you are analyzing.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Track remaining chats for guest
  const [remainingChats, setRemainingChats] = useState(getRemainingChats());

  const { user } = useSelector((state) => state.auth);
  const { analysis } = useSelector((state) => state.investment);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Guest check
    if (!user) {
      if (hasReachedChatLimit()) {
        toast.error("Free chat limit reached. Create an account for unlimited chats.");
        return;
      }
    }

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      // Map history for GenAI SDK
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      // Call API
      const { data } = await api.post("/chatbot/message", {
        message: userMessage,
        history: historyPayload,
        companyContext: analysis, // passes current stock analysis details if present
      });

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: data.data.reply },
        ]);

        if (!user) {
          incrementGuestChat();
          setRemainingChats(getRemainingChats());
        }
      } else {
        throw new Error(data.message || "Failed to generate response.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I encountered an issue. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        {isOpen ? (
          <FaTimes className="text-black text-xl" />
        ) : (
          <div className="relative">
            <FaComment className="text-black text-xl" />
            {!user && remainingChats > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {remainingChats}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[520px] max-h-[calc(100vh-120px)] bg-[#151A21] border border-white/10 rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#0D1117] p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <FaRobot className="text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Investment Assistant</h3>
                <p className="text-[10px] text-slate-400">
                  {user ? "Pro Account • Unlimited" : `Guest • ${remainingChats} chats left today`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Context Banner */}
          {analysis && (
            <div className="bg-emerald-500/5 border-b border-emerald-500/10 px-5 py-2 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Context: <strong>{analysis.company?.symbol}</strong> ({analysis.company?.name})
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-emerald-500/20 to-cyan-400/20 border border-emerald-500/10 text-white rounded-tr-none"
                      : "bg-[#0D1117] border border-white/5 text-slate-300 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0D1117] border border-white/5 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            
            {/* Call to action for guests when limit is reached */}
            {!user && hasReachedChatLimit() && (
              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-4 text-center text-xs text-slate-300">
                <p className="mb-2">⚠️ You have reached your 5 free chats limit for today.</p>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold rounded-xl"
                >
                  Sign Up for Unlimited Chat
                </Link>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-[#0D1117] border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || (!user && hasReachedChatLimit())}
              placeholder={
                !user && hasReachedChatLimit()
                  ? "Daily chat limit reached"
                  : "Ask a question..."
              }
              className="flex-1 px-4 py-3 bg-[#151A21] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || (!user && hasReachedChatLimit())}
              className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
