import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { GraduationCap, BookOpen, Rocket } from 'lucide-react';
import techgramLogo from '@/assets/techgram-logo.png';
import gigloLogo from '@/assets/giglo-logo.png';
import indoverseLogo from '@/assets/indoverse-logo.png';
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';
import photo4 from '@/assets/photo4.jpg';

// Steam particle component
const SteamParticle = ({ delay, isAnimating }: { delay: number; isAnimating: boolean }) => {
  const randomX = useMemo(() => Math.random() * 20 - 10, []);
  const randomSize = useMemo(() => Math.random() * 6 + 4, []);
  
  return (
    <motion.div
      className="absolute rounded-full bg-primary/40"
      style={{
        width: randomSize,
        height: randomSize,
        left: '50%',
        top: '-8px',
      }}
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={isAnimating ? {
        opacity: [0, 0.8, 0.6, 0],
        y: [-5, -20, -35, -50],
        x: [0, randomX, randomX * 1.5, randomX * 2],
        scale: [0.5, 1, 1.2, 0.8],
      } : { opacity: 0 }}
      transition={{
        duration: 1.2,
        delay: delay,
        repeat: isAnimating ? Infinity : 0,
        repeatDelay: 0.3,
        ease: 'easeOut',
      }}
    />
  );
};

// Wheel component
const Wheel = ({ size, position, isMoving }: { size: number; position: 'left' | 'right'; isMoving: boolean }) => (
  <motion.div
    className="absolute bottom-0 bg-foreground rounded-full border-2 border-primary flex items-center justify-center"
    style={{
      width: size,
      height: size,
      [position]: position === 'left' ? -2 : -2,
      transform: 'translateY(40%)',
    }}
    animate={isMoving ? { rotate: 360 } : { rotate: 0 }}
    transition={{
      duration: 0.5,
      repeat: isMoving ? Infinity : 0,
      ease: 'linear',
    }}
  >
    {/* Wheel spokes */}
    <div className="absolute w-full h-0.5 bg-primary/60" />
    <div className="absolute w-0.5 h-full bg-primary/60" />
    <div className="absolute w-full h-0.5 bg-primary/60 rotate-45" />
    <div className="absolute w-0.5 h-full bg-primary/60 rotate-45" />
  </motion.div>
);

const timelineEvents = [
  {
    year: '2021-2025',
    title: 'UPSC CSE Preparation',
    description: 'Four years of rigorous preparation that built discipline, analytical thinking, and a deep understanding of governance, policy, and Indian society.',
    icon: BookOpen,
    image: photo1,
    type: 'milestone',
  },
  {
    year: 'Nov 2024',
    title: 'Founded Techgram',
    description: 'Launched the AI-Powered Metaverse of Learning to democratize education for 2B+ underserved learners globally.',
    logo: techgramLogo,
    image: photo2,
    type: 'startup',
    status: 'Building',
  },
  {
    year: 'Jan 2026',
    title: 'Co-Founded Gig-lo',
    description: 'Building a community-powered marketplace to empower India\'s 450M informal workforce with digital identity and opportunities.',
    logo: gigloLogo,
    image: photo3,
    type: 'startup',
    status: 'In Development',
  },
  {
    year: 'Jan 2026',
    title: 'Co-Founded Indoverse.ai',
    description: 'Establishing an AI solutions company serving D2C, B2B, and government sectors with cutting-edge technology.',
    logo: indoverseLogo,
    image: photo4,
    type: 'startup',
    status: 'In Development',
  },
  {
    year: 'Present',
    title: 'Building the Future',
    description: 'Leading three startups simultaneously while working towards a vision of technology that serves humanity\'s fundamental needs.',
    icon: Rocket,
    type: 'milestone',
  },
];

export const Timeline = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const moveToNext = useCallback(() => {
    setShowContent(false);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineEvents.length);
      setIsAnimating(false);
      
      // Show content after train stops
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    }, 800);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    // Show initial content
    const initialTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Auto-advance every 5 seconds
    const interval = setInterval(() => {
      moveToNext();
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isInView, moveToNext]);

  const currentEvent = timelineEvents[currentIndex];

  return (
    <section id="journey" ref={ref} className="py-20 sm:py-32 relative overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            A Path of{' '}
            <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every step of my journey has been a building block for the mission I pursue today.
          </p>
        </motion.div>

        {/* Horizontal Train Track */}
        <div className="relative">
          {/* Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-muted via-primary/30 to-muted transform -translate-y-1/2 rounded-full" />
          
          {/* Station Dots */}
          <div className="flex justify-between items-center relative z-10 mb-8">
            {timelineEvents.map((event, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (index !== currentIndex && !isAnimating) {
                    setShowContent(false);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setTimeout(() => setShowContent(true), 300);
                    }, 300);
                  }
                }}
                className={`relative flex flex-col items-center cursor-pointer group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Station Marker */}
                <motion.div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-500 ${
                    index === currentIndex
                      ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                      : index < currentIndex
                      ? 'bg-primary/50 border-primary/50'
                      : 'bg-muted border-border'
                  }`}
                  animate={index === currentIndex ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5, repeat: index === currentIndex ? Infinity : 0, repeatDelay: 2 }}
                />
                
                {/* Year Label */}
                <span className={`mt-3 text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                  index === currentIndex ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {event.year}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Locomotive Train Indicator */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 z-20"
            animate={{
              left: `${(currentIndex / (timelineEvents.length - 1)) * 100}%`,
              x: '-50%',
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Steam Particles */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
                <SteamParticle key={i} delay={delay} isAnimating={isAnimating} />
              ))}
            </div>
            
            {/* Motion Trail */}
            <motion.div
              className="absolute top-1/2 right-full transform -translate-y-1/2 h-1 bg-gradient-to-l from-primary/60 to-transparent rounded-full"
              animate={isAnimating ? { width: [0, 40, 60, 40, 0], opacity: [0, 0.8, 0.6, 0.4, 0] } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            
            {/* Locomotive Body */}
            <motion.div
              className="relative"
              animate={isAnimating ? { 
                x: [0, 2, -1, 1, 0],
                y: [0, -1, 0, -1, 0],
              } : {}}
              transition={{ duration: 0.15, repeat: isAnimating ? 5 : 0 }}
            >
              {/* Chimney/Smokestack */}
              <motion.div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-t from-primary to-primary/80 rounded-t-full"
                animate={isAnimating ? { scaleY: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3, repeat: isAnimating ? Infinity : 0 }}
              />
              
              {/* Main Body */}
              <div className="w-14 h-10 sm:w-16 sm:h-12 bg-gradient-to-b from-primary via-primary to-primary/90 rounded-lg flex items-center justify-center shadow-xl shadow-primary/40 relative overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                
                {/* Window */}
                <div className="w-6 h-5 sm:w-7 sm:h-6 bg-primary-foreground/90 rounded-sm flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                
                {/* Decorative stripes */}
                <div className="absolute bottom-1 left-1 right-1 h-1 bg-primary-foreground/30 rounded-full" />
              </div>
              
              {/* Cow catcher (front) */}
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gradient-to-r from-primary to-primary/70 rounded-r-sm" />
              
              {/* Wheels */}
              <Wheel size={14} position="left" isMoving={isAnimating} />
              <Wheel size={14} position="right" isMoving={isAnimating} />
              
              {/* Piston rod animation */}
              <motion.div
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-foreground/60 rounded-full"
                animate={isAnimating ? { scaleX: [1, 0.8, 1.1, 0.9, 1], x: [-4, 0, 4, 0, -4] } : {}}
                transition={{ duration: 0.4, repeat: isAnimating ? Infinity : 0, ease: 'linear' }}
              />
            </motion.div>
            
            {/* Glow effect when stationary */}
            {!isAnimating && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary/20 blur-xl -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Content Card */}
        <div className="mt-16 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 40 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                {currentEvent.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 1.1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative h-64 md:h-80 overflow-hidden"
                  >
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    
                    {/* Logo Overlay for Startups */}
                    {currentEvent.logo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.5 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-xl p-2 shadow-lg"
                      >
                        <img
                          src={currentEvent.logo}
                          alt={`${currentEvent.title} logo`}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}
                
                {/* Content Side */}
                <div className={`p-8 flex flex-col justify-center ${!currentEvent.image ? 'md:col-span-2 text-center' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Status Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {currentEvent.year}
                      </span>
                      {currentEvent.status && (
                        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium">
                          {currentEvent.status}
                        </span>
                      )}
                    </div>
                    
                    {/* Title with Icon/Logo */}
                    <div className="flex items-center gap-4 mb-4">
                      {currentEvent.icon && (
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <currentEvent.icon className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      {currentEvent.logo && !currentEvent.image && (
                        <div className="w-12 h-12 rounded-xl bg-white p-1 shadow">
                          <img
                            src={currentEvent.logo}
                            alt={`${currentEvent.title} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                        {currentEvent.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {currentEvent.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setShowContent(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setTimeout(() => setShowContent(true), 300);
                  }, 300);
                }
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
