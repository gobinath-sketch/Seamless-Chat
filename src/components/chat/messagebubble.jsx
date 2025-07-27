import React from "react";
import { format } from "date-fns";
import { User, Bot, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const CodeBlock = ({ className, children }) => {
    const [copied, setCopied] = React.useState(false);
    const language = className?.replace(/language-/, '') || 'text';

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-4 rounded-xl overflow-hidden bg-gray-900 border border-gray-700">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                <span className="text-xs text-gray-300 font-mono uppercase tracking-wider">{language}</span>
                <button 
                    onClick={handleCopy} 
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-gray-700"
                >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm bg-gray-900">
                <code className={`language-${language} text-gray-100`}>{children}</code>
            </pre>
        </div>
    );
};

export default function MessageBubble({ message, isLast }) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === "user";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-6 mb-8 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Professional Avatar */}
      <div className={`
        w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 relative overflow-hidden
        ${isUser 
          ? "bg-gradient-to-br from-blue-500 to-purple-600" 
          : "bg-gradient-to-br from-purple-600 to-pink-500"
        }
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        {isUser ? (
          <User className="w-6 h-6 text-white relative z-10" />
        ) : (
          <div className="relative z-10">
            <img src="/Otaku.jpeg" alt="ChatMind Pro Logo" className="object-contain w-10 h-10 rounded-xl" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-4xl ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        {/* Message Header */}
        <div className={`flex items-center gap-2 mb-2 ${isUser ? "flex-row-reverse" : ""}`}>
          <span className={`text-sm font-semibold ${isUser ? "text-blue-400" : "text-purple-400"}`}>
            {isUser ? "You" : "ChatMind Pro"}
          </span>
          {!isUser && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">AI</span>
            </div>
          )}
        </div>

        <div className={`
          relative group max-w-full
          ${isUser 
            ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl rounded-tr-lg" 
            : "bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-3xl rounded-tl-lg"
          } px-6 py-4 shadow-2xl
        `}>
          {/* Copy Button for AI messages */}
          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-lg border border-gray-600"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-300" />
              )}
            </Button>
          )}

          <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : "prose-invert"}`}>
            {isUser ? (
              <p className="mb-0 leading-relaxed text-white font-medium">{message.content}</p>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed text-gray-100">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 space-y-2 list-disc list-inside text-gray-100">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 space-y-2 list-decimal list-inside text-gray-100">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-gray-200">{children}</li>,
                  code: ({ node, inline, className, children, ...props }) => {
                    if (inline) {
                        return <code className="bg-purple-900/50 px-2 py-1 rounded-md text-sm font-mono text-purple-200 border border-purple-700/50" {...props}>{children}</code>;
                    }
                    return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 mb-4 bg-purple-900/20 py-2 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-white mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold text-white mb-2">{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-2 ${isUser ? "text-right" : ""}`}>
          {message.timestamp && format(new Date(message.timestamp), "h:mm a")}
        </div>
      </div>
    </motion.div>
  );
}