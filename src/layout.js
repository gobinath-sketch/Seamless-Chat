import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { MessageCircle, Plus, Menu, X, Settings, History, Star } from "lucide-react";
import { Button } from "./components/ui/button";
import { useState } from "react";

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <style>{`
        :root {
          --primary-dark: #0a0a0b;
          --secondary-dark: #1a1b23;
          --accent-purple: #8b5cf6;
          --accent-blue: #3b82f6;
          --text-primary: #ffffff;
          --text-secondary: #9ca3af;
          --border-dark: #374151;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #0a0a0b;
        }

        .premium-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neural-network {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .neural-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(139, 92, 246, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }

        .premium-shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 
                      0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Neural Network Background */}
      <div className="neural-network">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="neural-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      {/* Mobile Header */}
      <div className="lg:hidden glass-morphism border-b border-gray-700 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-black">
            <img src="/Otaku.jpeg" alt="ChatMind Pro Logo" className="object-contain w-full h-full" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">ChatMind Pro</h1>
            <p className="text-xs text-purple-400">Enterprise AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex h-screen lg:h-screen relative z-10">
        {/* Professional Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-80 transform transition-all duration-500 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          glass-morphism border-r border-gray-700
        `}>
          <div className="flex flex-col h-full">
            {/* Premium Logo Section */}
            <div className="hidden lg:flex items-center gap-4 p-8 border-b border-gray-700">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center bg-black">
                <img src="/Otaku.jpeg" alt="ChatMind Pro Logo" className="object-contain w-full h-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">ChatMind Pro</h1>
                <p className="text-sm text-purple-400 font-medium">Enterprise AI Assistant</p>
              </div>
            </div>

            {/* New Conversation */}
            <div className="p-6">
              <Link to={createPageUrl("Chat")} className="w-full">
                <Button className="w-full h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl premium-shadow hover:scale-[1.02] transition-all duration-300">
                  <Plus className="w-5 h-5 mr-3" />
                  New Conversation
                </Button>
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto px-6 space-y-2">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
                <div className="space-y-1">
                  <Link 
                    to={createPageUrl("Chat")} 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group text-gray-300 hover:text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Chat Interface</span>
                  </Link>
                  
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group text-gray-500 cursor-not-allowed">
                    <History className="w-5 h-5" />
                    <span className="font-medium">Chat History</span>
                    <span className="ml-auto text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Pro</span>
                  </div>
                  
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group text-gray-500 cursor-not-allowed">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="glass-morphism rounded-xl p-4 border border-gray-700">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Usage Today</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Messages</span>
                    <span className="text-sm font-semibold text-purple-400">42 / 100</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full w-[42%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Footer */}
            <div className="p-6 border-t border-gray-700">
              <div className="glass-morphism rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Pro Account</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  You're using ChatMind Pro with unlimited conversations and advanced AI capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-gray-900 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}