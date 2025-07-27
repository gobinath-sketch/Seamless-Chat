import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Send, Loader2, Sparkles, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatInput({ onSendMessage, isLoading, disabled }) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-gray-700 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <div className={`
            relative transition-all duration-300 rounded-2xl overflow-hidden
            ${isFocused 
              ? "bg-white/10 backdrop-blur-xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/25" 
              : "bg-white/5 backdrop-blur-xl border-2 border-white/10"
            }
          `}>
            <div className="flex items-end gap-4 p-4">
              {/* Attachment Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled || isLoading}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                <Paperclip className="w-5 h-5" />
              </Button>

              {/* Input Field */}
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask ChatMind Pro anything... I'm here to help with complex problems."
                  disabled={disabled || isLoading}
                  className="min-h-[24px] max-h-32 resize-none bg-transparent border-none px-0 py-2 text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none text-base leading-relaxed"
                  style={{ fontSize: "16px" }}
                />
                
                {message.length > 0 && (
                  <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                    {message.length}/2000
                  </div>
                )}
              </div>

              {/* Send Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Status Bar */}
            <div className="flex items-center justify-between px-4 pb-3 text-xs">
              <div className="flex items-center gap-4 text-gray-500">
                <span>Press Enter to send, Shift + Enter for new line</span>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400">AI-powered responses</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Online</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}