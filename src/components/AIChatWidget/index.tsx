import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

// Knowledge base of predefined responses
const knowledgeBase = {
  // Company Information
  "what is sparkstorm": "Sparkstorm is an innovative AI-powered platform that helps businesses streamline their operations and enhance productivity through cutting-edge technology solutions.",
  "who is the ceo": "The CEO of Sparkstorm is [CEO Name], who brings extensive experience in technology and business leadership.",
  "company history": "Sparkstorm was founded in [Year] with a vision to revolutionize how businesses interact with AI technology.",
  "mission": "Our mission is to empower businesses with intelligent AI solutions that drive growth, efficiency, and innovation.",
  "vision": "We envision a future where every business can leverage the power of AI to achieve their full potential.",
  "values": "Our core values include innovation, integrity, customer success, and continuous learning.",
  "team": "Our team consists of experienced professionals from diverse backgrounds in AI, software development, and business.",
  "location": "Sparkstorm is headquartered in [City, Country], with a global presence serving clients worldwide.",
  "size": "We are a growing company with [X] employees dedicated to delivering exceptional AI solutions.",
  "awards": "Sparkstorm has been recognized with multiple industry awards for innovation and excellence in AI technology.",
  
  // Products and Services
  "products": "Our product suite includes AI-powered analytics, workflow automation, predictive modeling, and custom AI solutions.",
  "services": "We offer consulting, implementation, training, and ongoing support services for all our AI solutions.",
  "solutions": "Our solutions address key business challenges in areas like customer service, operations, and decision-making.",
  "platform": "The Sparkstorm platform provides a unified interface for managing all AI-powered tools and analytics.",
  "analytics": "Our analytics tools help businesses gain valuable insights from their data through advanced AI algorithms.",
  "automation": "We offer intelligent automation solutions that streamline business processes and reduce manual work.",
  "integration": "Our solutions seamlessly integrate with existing business systems and workflows.",
  "customization": "We provide customizable AI solutions tailored to specific business needs and requirements.",
  "scalability": "Our platform is designed to scale with your business, handling growing data volumes and user needs.",
  "updates": "We regularly release updates and new features to enhance our platform's capabilities.",
  
  // Features and Capabilities
  "features": "Sparkstorm offers a comprehensive suite of features including AI-powered analytics, automated workflow management, real-time collaboration tools, and customizable dashboards.",
  "capabilities": "Our platform can handle natural language processing, predictive analytics, pattern recognition, and automated decision-making.",
  "technology": "We leverage cutting-edge technologies including machine learning, deep learning, and neural networks.",
  "security": "Sparkstorm implements enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with major security standards.",
  "performance": "Our platform is optimized for high performance, handling large-scale data processing and real-time analytics.",
  "reliability": "We maintain 99.9% uptime and implement robust backup and recovery systems.",
  "accessibility": "Our platform is accessible through web browsers and mobile devices, with responsive design for all screen sizes.",
  "api": "We provide comprehensive APIs for integrating our solutions with other systems.",
  "documentation": "Our API documentation is available at docs.sparkstorm.ai. It includes comprehensive guides and examples for integration.",
  "compliance": "Our solutions comply with major industry standards and regulations including GDPR, HIPAA, and SOC 2.",
  
  // Pricing and Plans
  "pricing": "Sparkstorm offers flexible pricing plans tailored to businesses of all sizes. Please contact our sales team for detailed pricing information.",
  "plans": "We offer various subscription plans including Basic, Professional, and Enterprise tiers.",
  "free trial": "We offer a 14-day free trial of our platform with full access to all features.",
  "discounts": "We provide special pricing for startups, educational institutions, and non-profit organizations.",
  "billing": "We offer flexible billing options including monthly and annual subscriptions.",
  "refund": "Our refund policy allows for a full refund within 30 days of purchase if not satisfied.",
  "enterprise": "Enterprise customers receive dedicated support, custom features, and priority service.",
  "comparison": "Our pricing is competitive in the market, offering more features and better support than similar solutions.",
  "value": "Our solutions provide significant ROI through increased efficiency and better decision-making.",
  "investment": "We offer various investment options for businesses looking to implement our solutions.",
  
  // Support and Training
  "support": "Our support team is available 24/7. You can reach them through our help center or by emailing support@sparkstorm.ai",
  "training": "We provide comprehensive training programs for users at all levels.",
  "user guides": "Our extensive documentation includes user guides, API references, and best practices.",
  "tutorials": "We offer video tutorials and step-by-step guides for all platform features.",
  "community": "Join our user community to share experiences and learn from other users.",
  "platform updates": "We regularly provide updates and new features based on user feedback.",
  "feedback": "We welcome user feedback and continuously improve our platform based on suggestions.",
  "help": "Our help center provides answers to common questions and troubleshooting guides.",
  "contact": "You can reach us at support@sparkstorm.ai or call us at [Phone Number]. Our office is located at [Address].",
  "response time": "Our support team typically responds within 2 hours during business hours.",
  
  // Industry and Use Cases
  "industries": "We serve various industries including healthcare, finance, retail, manufacturing, and technology.",
  "use cases": "Our solutions are used for customer service, fraud detection, predictive maintenance, and more.",
  "success stories": "We have numerous success stories from clients who have transformed their businesses with our solutions.",
  "case studies": "Our case studies demonstrate how clients have achieved significant results using our platform.",
  "testimonials": "Client testimonials highlight the impact of our solutions on their business operations.",
  "partners": "We collaborate with leading technology partners to provide comprehensive solutions.",
  "platform integration": "Our platform integrates with popular business tools and platforms.",
  "industry solutions": "We offer industry-specific solutions tailored to unique business needs.",
  "business scale": "Our solutions scale from small businesses to large enterprises.",
  "innovation": "We continuously innovate to provide cutting-edge AI solutions.",
  
  // Technical Details
  "requirements": "Our platform works on modern web browsers and requires minimal system resources.",
  "setup": "Setting up our platform is straightforward with our guided installation process.",
  "maintenance": "We handle all platform maintenance and updates automatically.",
  "backup": "We implement automated backup systems to protect your data.",
  "security measures": "Our security measures include encryption, access controls, and regular audits.",
  "platform performance": "We optimize our platform for maximum performance and reliability.",
  "infrastructure": "Our infrastructure scales automatically to handle growing demands.",
  "api integration": "We provide APIs and tools for easy integration with other systems.",
  "custom solutions": "Our platform can be customized to meet specific business requirements.",
  "feature updates": "We regularly release updates with new features and improvements.",
  
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
          <img src="/lovable-uploads/29312d6b-5f6a-4a11-b1cc-4ab04284a888.png" alt="Sparkstorm" className="chat-widget-logo" />
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
              <div className="header-left">
                <img src="/lovable-uploads/29312d6b-5f6a-4a11-b1cc-4ab04284a888.png" alt="Sparkstorm" className="chat-header-logo" />
                <h3>Sparkstorm Assistant</h3>
              </div>
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