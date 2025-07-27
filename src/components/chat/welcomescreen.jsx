import React from "react";
import { MessageCircle, Sparkles, Brain, Heart, FileText, Lightbulb, Code, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onStartChat }) {
  const suggestions = [
    { 
      icon: Brain, 
      text: "Analyze the latest AI trends and their business implications", 
      color: "from-blue-500 to-cyan-400",
      category: "Analysis"
    },
    { 
      icon: Code, 
      text: "Help me architect a scalable microservices solution", 
      color: "from-purple-500 to-pink-400",
      category: "Development"
    },
    { 
      icon: Lightbulb, 
      text: "Create a strategic roadmap for digital transformation", 
      color: "from-emerald-500 to-teal-400",
      category: "Strategy"
    },
    { 
      icon: BookOpen, 
      text: "Summarize complex research papers into actionable insights", 
      color: "from-orange-500 to-red-400",
      category: "Research"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1
      }
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={logoVariants}>
            <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <MessageCircle className="w-14 h-14 text-white relative z-10" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                ChatMind Pro
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto font-light">
              Your intelligent partner for complex problem-solving and strategic thinking
            </p>
            
            <p className="text-sm text-gray-500 mb-12 max-w-2xl mx-auto">
              Powered by advanced AI • Enterprise-grade security • Unlimited conversations
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid sm:grid-cols-2 gap-6 mb-12"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartChat(suggestion.text)}
                className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-left transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${suggestion.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <suggestion.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                        {suggestion.category}
                      </span>
                    </div>
                    <p className="text-white font-semibold leading-snug group-hover:text-gray-100 transition-colors">
                      {suggestion.text}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Online</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <span>Response time: ~2s</span>
            <div className="w-px h-4 bg-gray-700"></div>
            <span>99.9% Uptime</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}