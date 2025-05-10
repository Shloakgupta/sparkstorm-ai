import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

// Knowledge base of predefined responses
const knowledgeBase = {
  // Company Information
  "what is sparkstorm ai": "Sparkstorm AI is an innovative AI-powered platform that helps businesses streamline their operations and enhance productivity through cutting-edge technology solutions. We specialize in providing intelligent automation, data analytics, and AI-driven insights to help businesses make better decisions and improve efficiency.",
  
  "who is noopur gupta": "Noopur Gupta is the CEO and founder of Sparkstorm AI. She is a visionary leader with extensive experience in technology and business leadership. Under her guidance, Sparkstorm AI has grown into a leading provider of AI solutions, helping businesses transform their operations through innovative technology.",
  
  "how do i use sparkstorm ai": "To use Sparkstorm AI, you can:\n1. Visit our website and sign up for a free trial\n2. Schedule a demo with our team\n3. Contact our sales team for a personalized consultation\n4. Book a call with our CEO, Noopur Gupta, to discuss your specific needs\n\nOur platform is designed to be user-friendly and intuitive, with comprehensive documentation and support available to help you get started.",
  
  "company history": "Sparkstorm AI was founded with a vision to revolutionize how businesses interact with AI technology. Our journey began with a simple idea: to make AI accessible and beneficial for businesses of all sizes. Today, we're proud to serve clients worldwide with our innovative solutions.",
  
  "mission": "Our mission is to empower businesses with intelligent AI solutions that drive growth, efficiency, and innovation. We believe in making AI technology accessible and beneficial for all.",
  
  "vision": "We envision a future where every business can leverage the power of AI to achieve their full potential. Our goal is to be at the forefront of AI innovation, helping businesses transform their operations and succeed in the digital age.",
  
  "values": "Our core values include:\n- Innovation: Constantly pushing boundaries in AI technology\n- Integrity: Maintaining the highest standards of ethics and transparency\n- Customer Success: Putting our clients' needs first\n- Continuous Learning: Always improving and adapting to new challenges",
  
  "team": "Our team consists of experienced professionals from diverse backgrounds in AI, software development, and business. We're united by our passion for innovation and commitment to delivering exceptional solutions.",
  
  "location": "Sparkstorm AI is headquartered in the United States, with a global presence serving clients worldwide. Our team works remotely to provide 24/7 support to our international client base.",
  
  "size": "We are a growing company dedicated to delivering exceptional AI solutions. Our team is expanding rapidly to meet the increasing demand for our services.",
  
  "awards": "Sparkstorm AI has been recognized with multiple industry awards for innovation and excellence in AI technology. These accolades reflect our commitment to delivering cutting-edge solutions.",
  
  // Products and Services
  "products": "Our product suite includes:\n- AI-powered analytics\n- Workflow automation\n- Predictive modeling\n- Custom AI solutions\n- Real-time data processing\n- Business intelligence tools",
  
  "services": "We offer comprehensive services including:\n- Consulting and strategy\n- Implementation and integration\n- Training and support\n- Custom development\n- Ongoing maintenance and updates",
  
  "solutions": "Our solutions address key business challenges in:\n- Customer service automation\n- Operations optimization\n- Decision-making support\n- Data analysis and insights\n- Process automation",
  
  "platform": "The Sparkstorm AI platform provides a unified interface for managing all AI-powered tools and analytics. It's designed to be intuitive and user-friendly, with powerful features for businesses of all sizes.",
  
  "analytics": "Our analytics tools help businesses gain valuable insights from their data through advanced AI algorithms. We provide real-time analytics, predictive modeling, and actionable insights.",
  
  "automation": "We offer intelligent automation solutions that streamline business processes and reduce manual work. Our automation tools can handle complex tasks and workflows efficiently.",
  
  "integration": "Our solutions seamlessly integrate with existing business systems and workflows. We support integration with popular platforms and custom systems.",
  
  "customization": "We provide customizable AI solutions tailored to specific business needs and requirements. Our team works closely with clients to develop the perfect solution.",
  
  "scalability": "Our platform is designed to scale with your business, handling growing data volumes and user needs. We ensure your solution grows with you.",
  
  "updates": "We regularly release updates and new features to enhance our platform's capabilities. Our development team is constantly working to improve our solutions.",
  
  // Features and Capabilities
  "features": "Sparkstorm AI offers a comprehensive suite of features including:\n- AI-powered analytics\n- Automated workflow management\n- Real-time collaboration tools\n- Customizable dashboards\n- Advanced reporting\n- Mobile accessibility",
  
  "capabilities": "Our platform can handle:\n- Natural language processing\n- Predictive analytics\n- Pattern recognition\n- Automated decision-making\n- Real-time data processing\n- Machine learning models",
  
  "technology": "We leverage cutting-edge technologies including:\n- Machine learning\n- Deep learning\n- Neural networks\n- Natural language processing\n- Computer vision\n- Predictive analytics",
  
  "security": "Sparkstorm AI implements enterprise-grade security measures including:\n- End-to-end encryption\n- Regular security audits\n- Compliance with major security standards\n- Data protection\n- Access controls",
  
  "performance": "Our platform is optimized for high performance, handling large-scale data processing and real-time analytics. We ensure fast response times and reliable operation.",
  
  "reliability": "We maintain 99.9% uptime and implement robust backup and recovery systems. Our platform is designed for maximum reliability and data protection.",
  
  "accessibility": "Our platform is accessible through web browsers and mobile devices, with responsive design for all screen sizes. We ensure a consistent experience across all devices.",
  
  "api": "We provide comprehensive APIs for integrating our solutions with other systems. Our API documentation is available at docs.sparkstorm.ai.",
  
  "documentation": "Our API documentation is available at docs.sparkstorm.ai. It includes comprehensive guides and examples for integration.",
  
  "compliance": "Our solutions comply with major industry standards and regulations including GDPR, HIPAA, and SOC 2. We maintain the highest standards of data protection and privacy.",
  
  // Pricing and Plans
  "pricing": "Sparkstorm AI offers flexible pricing plans tailored to businesses of all sizes. Please contact our sales team for detailed pricing information or schedule a call with our CEO, Noopur Gupta, at https://calendly.com/noopurgupta01/1x1",
  
  "plans": "We offer various subscription plans including:\n- Basic: For small businesses\n- Professional: For growing companies\n- Enterprise: For large organizations\n\nEach plan includes different features and support levels.",
  
  "free trial": "We offer a 14-day free trial of our platform with full access to all features. This allows you to experience the power of our solutions before making a commitment.",
  
  "discounts": "We provide special pricing for:\n- Startups\n- Educational institutions\n- Non-profit organizations\n\nContact our sales team for more information.",
  
  "billing": "We offer flexible billing options including monthly and annual subscriptions. Annual plans come with additional discounts and benefits.",
  
  "refund": "Our refund policy allows for a full refund within 30 days of purchase if not satisfied. We're committed to ensuring your complete satisfaction.",
  
  "enterprise": "Enterprise customers receive:\n- Dedicated support\n- Custom features\n- Priority service\n- Advanced security\n- Custom integration options",
  
  "comparison": "Our pricing is competitive in the market, offering more features and better support than similar solutions. We focus on providing maximum value for your investment.",
  
  "value": "Our solutions provide significant ROI through:\n- Increased efficiency\n- Better decision-making\n- Cost reduction\n- Improved productivity\n- Enhanced customer service",
  
  "investment": "We offer various investment options for businesses looking to implement our solutions. Contact our sales team to discuss the best option for your needs.",
  
  // Support and Training
  "support": "Our support team is available 24/7. You can reach them through our help center or by emailing support@sparkstorm.ai. For urgent matters, you can schedule a call with our CEO, Noopur Gupta, at https://calendly.com/noopurgupta01/1x1",
  
  "training": "We provide comprehensive training programs for users at all levels, including:\n- Basic user training\n- Advanced features\n- Technical implementation\n- Best practices\n- Custom training sessions",
  
  "user guides": "Our extensive documentation includes:\n- User guides\n- API references\n- Best practices\n- Tutorials\n- FAQs",
  
  "tutorials": "We offer video tutorials and step-by-step guides for all platform features. Our learning resources are designed to help you get the most out of our platform.",
  
  "community": "Join our user community to:\n- Share experiences\n- Learn from other users\n- Get tips and tricks\n- Provide feedback\n- Stay updated on new features",
  
  "platform updates": "We regularly provide updates and new features based on user feedback. Our development team is constantly working to improve our platform.",
  
  "feedback": "We welcome user feedback and continuously improve our platform based on suggestions. Your input helps us create better solutions.",
  
  "help": "Our help center provides answers to common questions and troubleshooting guides. You can also contact our support team for personalized assistance.",
  
  "contact": "You can reach us at support@sparkstorm.ai or schedule a call with our CEO, Noopur Gupta, at https://calendly.com/noopurgupta01/1x1. We're here to help you succeed.",
  
  "response time": "Our support team typically responds within 2 hours during business hours. For urgent matters, you can schedule a call with our CEO, Noopur Gupta, at https://calendly.com/noopurgupta01/1x1",
  
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
  "default": "I don't have a specific answer for that question. Would you like to schedule a call with our CEO, Noopur Gupta? You can book a meeting at https://calendly.com/noopurgupta01/1x1 or visit our contact page for more ways to reach us."
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
          <img src="/lovable-uploads/29312d6b-5f6a-4a11-b1cc-4ab04284a888.png" alt="Sparkstorm AI" className="chat-widget-logo" />
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
                <img src="/lovable-uploads/29312d6b-5f6a-4a11-b1cc-4ab04284a888.png" alt="Sparkstorm AI" className="chat-header-logo" />
                <h3>Sparkstorm AI Assistant</h3>
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
                placeholder="Ask me anything about Sparkstorm AI..."
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