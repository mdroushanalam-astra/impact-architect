import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { GraduationCap, Rocket, Award, BookOpen, Target } from 'lucide-react';

const timelineEvents = [
  {
    year: '2021-2025',
    title: 'UPSC CSE Preparation',
    description: 'Four years of rigorous preparation that built discipline, analytical thinking, and a deep understanding of governance, policy, and Indian society.',
    icon: BookOpen,
    highlight: true,
  },
  {
    year: '2024',
    title: 'Founded Techgram',
    description: 'Launched the AI-Powered Metaverse of Learning to democratize education for 2B+ underserved learners globally.',
    icon: Rocket,
  },
  {
    year: '2024',
    title: 'Co-Founded Gig-lo',
    description: 'Built a community-powered marketplace to empower India\'s 450M informal workforce with digital identity and opportunities.',
    icon: Target,
  },
  {
    year: '2024',
    title: 'Co-Founded Indoverse.ai',
    description: 'Established an AI solutions company serving D2C, B2B, and government sectors with cutting-edge technology.',
    icon: Award,
  },
  {
    year: 'Present',
    title: 'Building the Future',
    description: 'Leading three startups simultaneously while working towards a vision of technology that serves humanity\'s fundamental needs.',
    icon: GraduationCap,
  },
];

export const Timeline = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="journey" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            A Path of{' '}
            <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every step of my journey has been a building block for the mission I pursue today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event.highlight
                      ? 'bg-gradient-to-r from-primary to-secondary glow-primary'
                      : 'bg-muted border-2 border-primary'
                  }`}
                >
                  <event.icon className="w-5 h-5 text-foreground" />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-16 md:pl-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-6 hover-lift ${event.highlight ? 'border-primary/50' : ''}`}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-display font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
