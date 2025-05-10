import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const TeamMember = ({ name, role, image, delay }: TeamMemberProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);
  
  return (
    <div 
      ref={ref}
      className={`card-hover transition-all duration-700 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      }`}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-500 mb-4">{role}</p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label={`${name}'s Twitter`}
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);
  
  const teamMembers = [
    {
      name: "Team Member 1",
      role: "Role 1",
      image: "/images/team/member1.png",
      delay: 100,
    },
    {
      name: "Team Member 2",
      role: "Role 2",
      image: "/images/team/member2.png",
      delay: 200,
    },
    {
      name: "Team Member 3",
      role: "Role 3",
      image: "/images/team/member3.png",
      delay: 300,
    },
    {
      name: "Team Member 4",
      role: "Role 4",
      image: "/images/team/member4.png",
      delay: 400,
    },
  ];

  return (
    <section id="team" className="py-16 bg-white">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">Our Team</p>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Meet the Minds Behind SparkStorm AI
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Our diverse team of experts is passionate about creating AI solutions that make a difference in people's lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              delay={member.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
