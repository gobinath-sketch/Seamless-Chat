import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="flex gap-6 mb-8"
    >
      {/* AI Avatar */}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="relative z-10">
          <Sparkles className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex-1 max-w-4xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-purple-400">ChatMind Pro</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">AI</span>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rounded-tl-lg px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm font-medium">Analyzing your request</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}