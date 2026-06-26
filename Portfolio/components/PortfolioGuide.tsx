"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Download, 
  Copy
} from "lucide-react";
import toast from "react-hot-toast";

// TypeScript Interfaces as requested
export type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export type GuideAction = {
  label: string;
  response: string;
  sectionId?: string;
  specialAction?: "resume" | "copyEmail";
};

// Store guide actions in a clear, modular object
const GUIDE_ACTIONS: Record<string, GuideAction> = {
  who: {
    label: "Who is Suvanwita?",
    response: "Suvanwita Das is a B.Tech Information Technology student at IIIT Allahabad. She builds full-stack applications, explores AI/ML, contributes to open source, and enjoys systems-focused projects.",
    sectionId: "about"
  },
  skills: {
    label: "Show skills",
    response: "Her core skills include C/C++, Python, JavaScript, TypeScript, React, Next.js, Node.js, Express, FastAPI, MongoDB, PostgreSQL, Redis, Docker, and AI/ML tools like Pandas and Scikit-learn.",
    sectionId: "skills"
  },
  projects: {
    label: "Show projects",
    response: "Her featured projects include SkillSync (AI career recommendation), SwiftCache (C++ in-memory datastore), and SheCare (full-stack women's health platform with AI risk assessment and event streaming).",
    sectionId: "projects"
  },
  best_project: {
    label: "Best project?",
    response: "SkillSync highlights AI + full-stack integration, SwiftCache demonstrates low-level systems depth in C++, and SheCare showcases enterprise-level architecture using Redis, BullMQ, FastAPI, and Apache Kafka.",
    sectionId: "projects"
  },
  open_source: {
    label: "Open source work",
    response: "She has been a GSSoC 2026 Mentor & Contributor and a member of Geekhaven FOSS Wing, where she conducted workshops for 100+ freshers and worked on OpenCode-related platforms.",
    sectionId: "open-source"
  },
  achievements: {
    label: "Achievements",
    response: "Her highlights include Flipkart Girls Wanna Code 7.0 Top Scholars Cohort, CodeChef Global Rank 446, OpenCode Rank 12, Out Of Context Hackathon Rank 9, and JEE Mains AIR 5640.",
    sectionId: "achievements"
  },
  experience: {
    label: "Experience",
    response: "She worked as an SDE Intern at the University of Missouri on the TRACES computational genomics platform, improving dataset validation, missing-data imputation, Volcano Plot features, and documentation.",
    sectionId: "experience"
  },
  contact: {
    label: "Contact her",
    response: "You can contact her at dsuvanwita@gmail.com. Opening the contact section now.",
    sectionId: "contact",
    specialAction: "copyEmail"
  },
  hire: {
    label: "Why hire her?",
    response: "She brings a rare combination of strong academics, full-stack development, AI/ML exposure, open-source mentoring, and systems-level curiosity. She can build polished frontend experiences while understanding backend, ML, and developer tooling.",
    sectionId: "contact"
  },
  resume: {
    label: "Download resume",
    response: "Opening the resume. Replace the placeholder resume link with the actual PDF in the public folder.",
    specialAction: "resume"
  }
};

// Conversational chip keys list to render suggested chips
const CHIP_KEYS = [
  "who",
  "skills",
  "projects",
  "best_project",
  "open_source",
  "achievements",
  "experience",
  "contact",
  "hire",
  "resume"
];

export function PortfolioGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      role: "bot",
      text: "Hi! I am SuvanwitaBot, your smart guide. Ask me about Suvanwita's skills, projects, open-source work, experience, or hire value!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat area when messages update or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close chat with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reusable function to scroll smoothly to portfolio sections
  const scrollToSection = (id: string) => {
    const targetElement = 
      document.getElementById(id) || 
      document.getElementById(id.replace("-", "")) ||
      document.getElementById(id.replace("open-source", "opensource"));

    if (targetElement) {
      // Small delay to allow chatbot transition to settle before scrolling background
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  // Reusable function to handle quick action guide behaviors
  const handleGuideAction = (actionKey: string, customLabel?: string, customResponse?: string) => {
    const action = GUIDE_ACTIONS[actionKey];
    
    // 1. Add User's selection message
    const userText = customLabel || action?.label || "Selected Action";
    
    setMessages(prev => {
      const userMsg: Message = {
        id: `user-${prev.length}`,
        role: "user",
        text: userText
      };
      return [...prev, userMsg];
    });
    setIsTyping(true);

    // 2. Simulate delay for organic response feeling
    setTimeout(() => {
      setIsTyping(false);
      
      const botText = customResponse || action?.response || "I didn't quite catch that.";
      
      setMessages(prev => {
        const botMsg: Message = {
          id: `bot-${prev.length}`,
          role: "bot",
          text: botText
        };
        return [...prev, botMsg];
      });

      // Trigger section scroll if specified
      if (action?.sectionId) {
        scrollToSection(action.sectionId);
      }

      // Trigger custom UI actions
      if (action?.specialAction === "copyEmail") {
        if (navigator.clipboard) {
          navigator.clipboard.writeText("dsuvanwita@gmail.com");
          toast.success("Email copied: dsuvanwita@gmail.com", {
            icon: "📧",
            style: {
              background: "rgba(10, 14, 30, 0.96)",
              border: "1px solid rgba(139, 92, 246, 0.5)",
              color: "#f8fbff",
            }
          });
        }
      } else if (action?.specialAction === "resume") {
        // TODO: Place the actual resume.pdf in /public folder to replace the placeholder
        window.open("/resume.pdf", "_blank");
        toast.success("Opening resume placeholder...", {
          icon: "📄",
          style: {
            background: "rgba(10, 14, 30, 0.96)",
            border: "1px solid rgba(34, 211, 238, 0.5)",
            color: "#f8fbff",
          }
        });
      }

    }, 850);
  };

  // Keyboard and Input Form matching rules
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (!query) return;

    // Add user message to screen
    setMessages(prev => {
      const userMsg: Message = {
        id: `user-input-${prev.length}`,
        role: "user",
        text: inputValue
      };
      return [...prev, userMsg];
    });
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let matchedKey = "";
      
      // Keyword matching rules matching instructions
      if (query.includes("skill")) {
        matchedKey = "skills";
      } else if (query.includes("project")) {
        matchedKey = "projects";
      } else if (query.includes("contact")) {
        matchedKey = "contact";
      } else if (query.includes("hire")) {
        matchedKey = "hire";
      } else if (query.includes("experience") || query.includes("intern")) {
        matchedKey = "experience";
      } else if (query.includes("achievement") || query.includes("rank")) {
        matchedKey = "achievements";
      } else if (query.includes("open source") || query.includes("gssoc") || query.includes("geekhaven")) {
        matchedKey = "open_source";
      } else if (query.includes("resume")) {
        matchedKey = "resume";
      }

      if (matchedKey && GUIDE_ACTIONS[matchedKey]) {
        const action = GUIDE_ACTIONS[matchedKey];
        
        setMessages(prev => {
          const botMsg: Message = {
            id: `bot-res-${prev.length}`,
            role: "bot",
            text: action.response
          };
          return [...prev, botMsg];
        });
        
        if (action.sectionId) {
          scrollToSection(action.sectionId);
        }

        if (action.specialAction === "copyEmail") {
          navigator.clipboard?.writeText("dsuvanwita@gmail.com");
          toast.success("Email copied: dsuvanwita@gmail.com");
        } else if (action.specialAction === "resume") {
          window.open("/resume.pdf", "_blank");
          toast.success("Opening resume placeholder...");
        }
      } else {
        // Fallback response for unmatched custom keywords
        setMessages(prev => {
          const fallbackMsg: Message = {
            id: `bot-fallback-${prev.length}`,
            role: "bot",
            text: "I can guide you through Suvanwita's skills, projects, experience, achievements, open-source work, resume, or contact section."
          };
          return [...prev, fallbackMsg];
        });
      }
    }, 850);
  };

  return (
    <>
      {/* Floating Toggle Button with Glowing pulse micro-animations */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 text-violet-400 border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.4)] backdrop-blur-md outline-none hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
          whileHover={{ scale: 1.08, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle SuvanwitaBot Guide Assistant"
          title="Ask SuvanwitaBot"
        >
          {/* Outer glowing pulsing aura */}
          <span className="absolute -inset-0.5 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 opacity-20 blur-md group-hover:opacity-40" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bot-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Bot className="h-6 w-6 animate-bounce" style={{ animationDuration: "2.8s" }} />
                <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Glassmorphic Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-24 right-4 z-40 flex h-[460px] w-[350px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-violet-500/30 bg-slate-950/85 text-slate-100 shadow-[0_12px_40px_rgba(139,92,246,0.22)] backdrop-blur-xl md:right-6 md:w-[380px]"
          >
            {/* Header: bot avatar, status, and close action */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-gradient-to-r from-violet-950/40 to-slate-950/40 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1.5px] shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                    <Bot className="h-5 w-5 text-violet-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-slate-950 bg-green-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">SuvanwitaBot</h4>
                  <p className="text-[10.5px] font-medium text-cyan-400/80">Portfolio Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Close guide panel"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Area with Messages and Quick Chips */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-500/20 scrollbar-track-transparent">
              <div className="space-y-4">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-tr-none"
                          : "bg-slate-900/90 text-slate-200 border border-white/5 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl bg-slate-900/90 border border-white/5 px-4 py-3 rounded-tl-none">
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-400"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-400"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-400"
                      />
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Action Chips Grid with elegant hover glow */}
              <div className="pt-2">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CHIP_KEYS.map(key => {
                    const action = GUIDE_ACTIONS[key];
                    return (
                      <motion.button
                        key={key}
                        onClick={() => handleGuideAction(key)}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1.5 text-[11px] font-medium text-violet-300 transition-all hover:bg-violet-500/10 hover:border-violet-500/40 hover:text-white"
                      >
                        {action.label}
                        {action.specialAction === "resume" && (
                          <Download className="h-3 w-3 text-cyan-400" />
                        )}
                        {action.specialAction === "copyEmail" && (
                          <Copy className="h-3 w-3 text-fuchsia-400" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Keyword Input Field Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-white/10 bg-slate-950/95 p-3 rounded-b-2xl"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask about skills, projects, contact..."
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-3.5 pr-11 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:bg-slate-900/90 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-lg text-slate-400 hover:text-cyan-400 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors"
                  aria-label="Send user query"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
