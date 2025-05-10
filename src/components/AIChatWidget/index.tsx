import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

// Knowledge base of predefined responses
const knowledgeBase = {
  // Company Information
  "what is sparkstorm ai": "Sparkstorm AI is an innovative AI-powered platform that helps businesses streamline their operations and enhance productivity through cutting-edge technology solutions. We specialize in providing intelligent automation, data analytics, and AI-driven insights to help businesses make better decisions and improve efficiency.",
  
  "who is noopur gupta": "Noopur Gupta is the CEO of Sparkstorm AI, bringing extensive experience in technology and business leadership. Under her guidance, Sparkstorm AI has grown into a leading provider of AI solutions, helping businesses transform their operations through innovative technology.",
  
  "how do i use sparkstorm ai": "To use Sparkstorm AI, you can:\n1. Visit our website and sign up for a free trial\n2. Schedule a demo with our team\n3. Contact our sales team for a personalized consultation\n4. Book a call with our CEO, Noopur Gupta, to discuss your specific needs\n\nOur platform is designed to be user-friendly and intuitive, with comprehensive documentation and support available to help you get started.",
  
  "company history": "Sparkstorm AI was founded with a vision to revolutionize how businesses interact with AI technology. Our journey began with a simple idea: to make AI accessible and beneficial for businesses of all sizes. Today, we're proud to serve clients worldwide with our innovative solutions.",
  
  "mission": "Our mission is to empower businesses with intelligent AI solutions that drive growth, efficiency, and innovation. We believe in making AI technology accessible and beneficial for all.",
  
  "vision": "We envision a future where every business can leverage the power of AI to achieve their full potential. Our goal is to be at the forefront of AI innovation, helping businesses transform their operations and succeed in the digital age.",
  
  "values": "Our core values include:\n- Innovation: Constantly pushing boundaries in AI technology\n- Integrity: Maintaining the highest standards of ethics and transparency\n- Customer Success: Putting our clients' needs first\n- Continuous Learning: Always improving and adapting to new challenges",
  
  "team": "Our team consists of experienced professionals from diverse backgrounds in AI, software development, and business. We're united by our passion for innovation and commitment to delivering exceptional solutions.",
  
  "leadership": "Sparkstorm AI is led by CEO Noopur Gupta and a team of industry veterans with deep expertise in AI, technology, and business strategy.",
  
  "advisors": "Our advisory board includes leaders from top technology companies and academic institutions, guiding our innovation and growth.",
  
  "location": "Sparkstorm AI is headquartered in the United States, with a global presence serving clients worldwide. Our team works remotely to provide 24/7 support to our international client base.",
  
  "size": "We are a growing company dedicated to delivering exceptional AI solutions. Our team is expanding rapidly to meet the increasing demand for our services.",
  
  "awards": "Sparkstorm AI has been recognized with multiple industry awards for innovation and excellence in AI technology. These accolades reflect our commitment to delivering cutting-edge solutions.",
  
  "culture": "We foster a culture of innovation, collaboration, and continuous learning. Our team is passionate about making a positive impact through technology.",
  
  "diversity": "We value diversity and inclusion, believing that a wide range of perspectives drives better solutions and outcomes.",
  
  "careers": "Interested in joining Sparkstorm AI? Visit our Careers page to see open positions and learn more about our team culture.",
  
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
  
  "mobile app": "Sparkstorm AI offers a mobile app for on-the-go access to analytics and automation tools.",
  
  "cloud": "Our platform is cloud-based, ensuring high availability, security, and scalability.",
  
  "on-premise": "We offer on-premise deployment options for clients with specific security or compliance needs.",
  
  "api": "We provide comprehensive APIs for integrating our solutions with other systems. Our API documentation is available at docs.sparkstorm.ai.",
  
  "documentation": "Our API documentation is available at docs.sparkstorm.ai. It includes comprehensive guides and examples for integration.",
  
  "compliance": "Our solutions comply with major industry standards and regulations including GDPR, HIPAA, and SOC 2. We maintain the highest standards of data protection and privacy.",
  
  "security": "Sparkstorm AI implements enterprise-grade security measures including:\n- End-to-end encryption\n- Regular security audits\n- Compliance with major security standards\n- Data protection\n- Access controls",
  
  "performance": "Our platform is optimized for high performance, handling large-scale data processing and real-time analytics. We ensure fast response times and reliable operation.",
  
  "reliability": "We maintain 99.9% uptime and implement robust backup and recovery systems. Our platform is designed for maximum reliability and data protection.",
  
  "accessibility": "Our platform is accessible through web browsers and mobile devices, with responsive design for all screen sizes. We ensure a consistent experience across all devices.",
  
  "user experience": "We prioritize user experience with an intuitive interface, helpful guides, and responsive support.",
  
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
  
  // More topics for 100+ responses
  "ai ethics": "We are committed to ethical AI development, ensuring fairness, transparency, and accountability in all our solutions.",
  "data privacy": "Data privacy is a top priority at Sparkstorm AI. We implement strict policies and technologies to protect your information.",
  "partnerships": "We partner with industry leaders to deliver the best AI solutions to our clients.",
  "events": "We participate in and host industry events, webinars, and conferences to share knowledge and connect with the community.",
  "news": "Stay updated with the latest news about Sparkstorm AI on our blog and social media channels.",
  "blog": "Our blog features articles on AI trends, best practices, and company updates.",
  "media": "Sparkstorm AI has been featured in leading technology publications and media outlets.",
  "investors": "We are backed by leading investors who believe in our vision and mission.",
  "roadmap": "Our product roadmap includes exciting new features and enhancements. Stay tuned for updates!",
  "beta program": "Join our beta program to get early access to new features and provide feedback.",
  "open source": "We contribute to open source projects and believe in the power of community-driven innovation.",
  "sustainability": "We are committed to sustainable business practices and reducing our environmental impact.",
  "csr": "Our corporate social responsibility initiatives focus on education, diversity, and community support.",
  "philanthropy": "We support philanthropic efforts and encourage our team to give back to the community.",
  "internships": "We offer internship opportunities for students and recent graduates interested in AI and technology.",
  "mentorship": "Our mentorship programs help nurture the next generation of AI leaders.",
  "hackathons": "We organize and participate in hackathons to foster innovation and creativity.",
  "certifications": "Sparkstorm AI offers certification programs for users and partners.",
  "awareness": "We promote AI awareness and education through workshops and seminars.",
  "partnership opportunities": "Interested in partnering with Sparkstorm AI? Contact us to explore collaboration opportunities.",
  "customer stories": "Read customer stories to learn how Sparkstorm AI has made a difference for businesses like yours.",
  "faq": "Visit our FAQ page for answers to common questions about Sparkstorm AI.",
  "press": "For press inquiries, please contact our media relations team.",
  "media kit": "Download our media kit for logos, brand guidelines, and company information.",
  "brand": "Our brand represents innovation, trust, and excellence in AI.",
  "logo": "You can download the official Sparkstorm AI logo from our media kit.",
  "contact sales": "Contact our sales team for personalized assistance and pricing information.",
  "demo": "Schedule a demo to see Sparkstorm AI in action.",
  "book a call": "Book a call with our CEO, Noopur Gupta, at https://calendly.com/noopurgupta01/1x1.",
  "newsletter": "Subscribe to our newsletter for the latest updates and insights.",
  "social media": "Follow us on LinkedIn, Twitter, and Facebook for news and updates.",
  "privacy policy": "Read our privacy policy to learn how we protect your data.",
  "terms of service": "Review our terms of service for details on using Sparkstorm AI.",
  "accessibility statement": "We are committed to making our platform accessible to everyone.",
  "legal": "For legal inquiries, please contact our legal team.",
  // Default response for unknown queries
  "default": "I don't have a specific answer for that question. Please visit our contact page or reach out to support@sparkstorm.ai if you have any questions. We're here to help!"
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
    // Convert query to lowercase and remove extra spaces
    const normalizedQuery = query.toLowerCase().trim();
    
    // Define question variations
    const questionVariations = {
      "what is sparkstorm": ["what is sparkstorm", "what is sparkstorm ai", "tell me about sparkstorm", "about sparkstorm", "sparkstorm info", "sparkstorm details"],
      "who is noopur gupta": ["who is noopur gupta", "tell me about noopur gupta", "about noopur gupta", "noopur gupta info", "ceo info", "founder info"],
      "how do i use sparkstorm ai": ["how do i use sparkstorm", "how to use sparkstorm", "how to get started", "getting started", "how to begin", "start using sparkstorm"],
      "company history": ["company history", "history", "when was sparkstorm founded", "founding", "company background"],
      "mission": ["mission", "company mission", "what is your mission", "mission statement"],
      "vision": ["vision", "company vision", "what is your vision", "vision statement"],
      "values": ["values", "company values", "core values", "what are your values"],
      "team": ["team", "company team", "who works at sparkstorm", "employees", "staff"],
      "location": ["location", "where is sparkstorm", "office location", "headquarters"],
      "size": ["size", "company size", "how big is sparkstorm", "number of employees"],
      "awards": ["awards", "recognition", "achievements", "accomplishments"],
      "products": ["products", "what products do you offer", "product suite", "offerings"],
      "services": ["services", "what services do you offer", "service offerings"],
      "solutions": ["solutions", "what solutions do you offer", "solution offerings"],
      "platform": ["platform", "what is your platform", "platform features"],
      "analytics": ["analytics", "data analytics", "analytics tools"],
      "automation": ["automation", "automated solutions", "automation tools"],
      "integration": ["integration", "how to integrate", "system integration"],
      "customization": ["customization", "custom solutions", "custom features"],
      "scalability": ["scalability", "how does it scale", "scaling options"],
      "updates": ["updates", "new features", "latest updates"],
      "features": ["features", "what features do you offer", "platform features"],
      "capabilities": ["capabilities", "what can it do", "platform capabilities"],
      "technology": ["technology", "what technology do you use", "tech stack"],
      "security": ["security", "how secure is it", "security measures"],
      "performance": ["performance", "how fast is it", "speed", "efficiency"],
      "reliability": ["reliability", "how reliable is it", "uptime"],
      "accessibility": ["accessibility", "how to access", "access options"],
      "api": ["api", "api documentation", "api access"],
      "documentation": ["documentation", "docs", "user guides"],
      "compliance": ["compliance", "security standards", "regulations"],
      "pricing": ["pricing", "cost", "how much does it cost", "price"],
      "plans": ["plans", "subscription plans", "pricing plans"],
      "free trial": ["free trial", "trial", "demo", "test"],
      "discounts": ["discounts", "special pricing", "deals"],
      "billing": ["billing", "payment", "subscription"],
      "refund": ["refund", "refund policy", "money back"],
      "enterprise": ["enterprise", "enterprise features", "large business"],
      "comparison": ["comparison", "compare", "vs", "versus"],
      "value": ["value", "roi", "return on investment"],
      "investment": ["investment", "cost", "pricing"],
      "support": ["support", "help", "customer support", "technical support"],
      "training": ["training", "how to use", "tutorials"],
      "user guides": ["user guides", "documentation", "manuals"],
      "tutorials": ["tutorials", "how to", "guides"],
      "community": ["community", "user community", "forums"],
      "platform updates": ["platform updates", "new features", "updates"],
      "feedback": ["feedback", "suggestions", "improvements"],
      "help": ["help", "support", "assistance"],
      "contact": ["contact", "how to contact", "reach us"],
      "response time": ["response time", "how fast do you respond", "support time"]
    };

    // Check for variations of questions
    for (const [key, variations] of Object.entries(questionVariations)) {
      if (variations.some(variation => normalizedQuery.includes(variation))) {
        return knowledgeBase[key];
      }
    }

    // If no match found, return the default response
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
          <img src="/images/sparkstorm-logo.png" alt="Sparkstorm AI" className="chat-widget-logo" />
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
                <img src="/images/sparkstorm-logo.png" alt="Sparkstorm AI" className="chat-header-logo" />
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