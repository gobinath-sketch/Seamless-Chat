import React, { useState, useEffect } from "react";
import { Conversation } from "../../entities/Conversation";
import { Button } from "../../components/ui/button";
import { MessageCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function ConversationHistory({ onSelectConversation, currentConversationId }) {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await Conversation.list('-created_date', 50);
      setConversations(data);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    try {
      await Conversation.delete(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2 mb-4">
        Recent Conversations
      </h3>
      
      {conversations.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No conversations yet</p>
          <p className="text-gray-400 text-xs">Start chatting to see your history here</p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`
              group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
              ${currentConversationId === conversation.id
                ? "bg-blue-50 border-2 border-blue-200"
                : "hover:bg-gray-50 border-2 border-transparent"
              }
            `}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">
                {conversation.title}
              </h4>
              <p className="text-xs text-gray-500 truncate mt-1">
                {conversation.last_message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {format(new Date(conversation.created_date), "MMM d, h:mm a")}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => deleteConversation(conversation.id, e)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}