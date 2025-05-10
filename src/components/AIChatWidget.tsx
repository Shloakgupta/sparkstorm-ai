import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIChatWidget.css';

// Knowledge base of predefined responses
const knowledgeBase = {
  // Company Information
  "what is sparkstorm": "Sparkstorm is an innovative AI-powered platform that helps businesses streamline their operations and enhance productivity through cutting-edge technology solutions.",
  "who is the ceo": "The CEO of Sparkstorm is [CEO Name], who brings extensive experience in technology and business leadership.",
  "company history": "Sparkstorm was founded in [Year] with a vision to revolutionize how businesses interact with AI technology.",
  
  // Features
  "features": "Sparkstorm offers a comprehensive suite of features including AI-powered analytics, automated workflow management, real-time collaboration tools, and customizable dashboards.",
  "pricing": "Sparkstorm offers flexible pricing plans tailored to businesses of all sizes. Please contact our sales team for detailed pricing information.",
  
  // Contact Information
  "contact": "You can reach us at support@sparkstorm.ai or call us at [Phone Number]. Our office is located at [Address].",
  "support": "Our support team is available 24/7. You can reach them through our help center or by emailing support@sparkstorm.ai",
  
  // Technical Information
  "api documentation": "Our API documentation is available at docs.sparkstorm.ai. It includes comprehensive guides and examples for integration.",
  "security": "Sparkstorm implements enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with major security standards.",
  
  // Default response for unknown queries
  "default": "I'm not sure about that specific question. Could you please rephrase or ask something else about Sparkstorm? I'm here to help with information about our company, features, support, and more."
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Process bot response
    const botResponse = getBotResponse(inputValue.toLowerCase());
    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const getBotResponse = (query: string): string => {
    // Check for exact matches first
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (query.includes(key)) {
        return value;
      }
    }
    return knowledgeBase.default;
  };

  return (
    <div className="chat-widget-container">
      {!isOpen && (
        <motion.button
          className="chat-widget-button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="/sparkstorm-logo.png" alt="Sparkstorm" className="chat-widget-logo" />
          <span>Chat with us</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header">
              <img src="/sparkstorm-logo.png" alt="Sparkstorm" className="chat-header-logo" />
              <h3>Sparkstorm Assistant</h3>
              <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="messages-container">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-content">{message.text}</div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Sparkstorm..."
                className="chat-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatWidget;
