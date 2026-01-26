import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Rocket, ArrowRight } from 'lucide-react';
import techgramLogo from '@/assets/techgram-logo.png';
import gigloLogo from '@/assets/giglo-logo.png';
import indoverseLogo from '@/assets/indoverse-logo.png';
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';
import photo4 from '@/assets/photo4.jpg';

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
    year: 'Nov 2025',
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

          {/* Professional Progress Indicator */}
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
            {/* Motion Trail */}
            <motion.div
              className="absolute top-1/2 right-full transform -translate-y-1/2 h-0.5 bg-gradient-to-l from-primary to-transparent rounded-full"
              animate={isAnimating ? { width: [0, 60, 80, 60, 0], opacity: [0, 1, 0.8, 0.5, 0] } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            
            {/* Main Indicator - Clean Professional Design */}
            <motion.div
              className="relative"
              animate={isAnimating ? { x: [0, 3, -2, 1, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Outer Ring with Glow */}
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-2xl relative"
                animate={!isAnimating ? { boxShadow: ['0 0 20px rgba(10,102,194,0.4)', '0 0 40px rgba(10,102,194,0.6)', '0 0 20px rgba(10,102,194,0.4)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Inner Glass Effect */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                
                {/* Arrow Icon */}
                <motion.div
                  animate={isAnimating ? { x: [0, 4, 0] } : {}}
                  transition={{ duration: 0.4, repeat: isAnimating ? 2 : 0 }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Ripple Effect when Stationary */}
              {!isAnimating && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.5, 2], opacity: [0.4, 0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
            </motion.div>
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
