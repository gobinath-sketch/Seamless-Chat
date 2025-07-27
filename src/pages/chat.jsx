
import React, { useState, useEffect, useRef } from "react";
import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";
import { InvokeLLM } from "../integrations/Core";
import { User } from "../entities/User";

import MessageBubble from "../components/chat/messagebubble";
import TypingIndicator from "../components/chat/typingindicator";
import ChatInput from "../components/chat/chatinput";
import WelcomeScreen from "../components/chat/welcomescreen";
import { AnimatePresence } from "framer-motion";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewConversation = async (initialMessage = null) => {
    try {
      // Create new conversation
      const conversation = await Conversation.create({
        title: initialMessage 
          ? (initialMessage.length > 50 ? initialMessage.substring(0, 50) + "..." : initialMessage)
          : "New Conversation",
        last_message: initialMessage || "",
        message_count: initialMessage ? 1 : 0
      });

      setCurrentConversation(conversation);
      setMessages([]);

      // If there's an initial message, send it
      if (initialMessage) {
        await sendMessage(initialMessage, conversation.id);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const sendMessage = async (content, conversationId = null) => {
    const convId = conversationId || currentConversation?.id;
    
    if (!convId) {
      await startNewConversation(content);
      return;
    }

    try {
      setIsLoading(true);

      // Create user message
      const userMessage = await Message.create({
        conversation_id: convId,
        content,
        role: "user",
        timestamp: new Date().toISOString()
      });

      setMessages(prev => [...prev, userMessage]);

      // Get conversation history for context
      const conversationMessages = await Message.filter(
        { conversation_id: convId }, 
        'created_date', 
        20
      );

      // Prepare context for AI
      const messageHistory = conversationMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add the new user message to context
      messageHistory.push({ role: "user", content });

      // Generate AI response
      const aiResponse = await InvokeLLM(messageHistory);
      console.log('AI Response Object:', aiResponse); // Debug log

      // Create AI message
      const aiMessage = await Message.create({
        conversation_id: convId,
        content: aiResponse.content, // Use .content property
        role: "assistant",
        timestamp: new Date().toISOString()
      });

      setMessages(prev => [...prev, aiMessage]);

      // Update conversation with last message
      await Conversation.update(convId, {
        last_message: aiResponse.length > 100 ? aiResponse.substring(0, 100) + "..." : aiResponse,
        message_count: conversationMessages.length + 2
      });

    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage = {
        id: Date.now(),
        conversation_id: convId,
        content: "I'm sorry, I encountered an error while processing your message. Please try again.",
        role: "assistant",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = async (message) => {
    await startNewConversation(message);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {messages.length === 0 && !currentConversation ? (
          <WelcomeScreen onStartChat={handleStartChat} />
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLast={messages[messages.length - 1]?.id === message.id}
                />
              ))}
            </AnimatePresence>
            
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="relative z-10">
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          disabled={false}
        />
      </div>
    </div>
  );
}
