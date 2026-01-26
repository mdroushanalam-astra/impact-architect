import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { GraduationCap, Briefcase, Bot } from 'lucide-react';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Democratizing Education',
    description: 'Making quality, personalized learning accessible to every learner, regardless of their background.',
    color: 'primary',
  },
  {
    icon: Briefcase,
    title: 'Dignifying Work',
    description: 'Empowering the informal workforce with visibility, tools, and opportunities they deserve.',
    color: 'secondary',
  },
  {
    icon: Bot,
    title: 'Humanizing AI',
    description: 'Building AI solutions that serve humanity\'s fundamental needs, not replace human connection.',
    color: 'accent',
  },
];

export const Vision = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? 'hsl(262, 83%, 58%)' : i % 3 === 1 ? 'hsl(199, 89%, 48%)' : 'hsl(330, 81%, 60%)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-8 sm:p-12 glass-card rounded-2xl max-w-4xl mx-auto"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-relaxed">
              "I believe technology should serve humanity's most{' '}
              <span className="gradient-text">fundamental needs</span> —{' '}
              <span className="text-primary">education</span>,{' '}
              <span className="text-secondary">employment</span>, and{' '}
              <span className="text-accent">efficiency</span>."
            </p>
          </motion.div>
        </motion.div>

        {/* Impact Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                  pillar.color === 'primary' ? 'bg-primary/20 glow-primary' :
                  pillar.color === 'secondary' ? 'bg-secondary/20 glow-secondary' :
                  'bg-accent/20 glow-accent'
                }`}
              >
                <pillar.icon className={`w-10 h-10 ${
                  pillar.color === 'primary' ? 'text-primary' :
                  pillar.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`} />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
