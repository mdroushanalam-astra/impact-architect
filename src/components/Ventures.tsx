import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ExternalLink, BookOpen, Users, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ventures = [
  {
    name: 'Techgram',
    role: 'Founder & CEO',
    tagline: 'The AI-Powered Metaverse of Learning',
    description: 'Addressing 2B+ underserved learners globally through 6 connected realms: Learn, Focus, Feel, Grow, Connect, Live.',
    impact: 'Transforming passive memorization into purpose-driven, AI-personalized education that adapts to every learner\'s unique journey.',
    icon: BookOpen,
    link: 'https://techgramlabs.site',
    gradient: 'from-primary to-secondary',
    glowClass: 'glow-primary',
  },
  {
    name: 'Gig-lo',
    role: 'Brand Ambassador & Co-Founder',
    tagline: 'Empowering India\'s 450M Informal Workforce',
    description: 'A community-powered marketplace connecting workers with households, bringing transparency and digital tools to the informal economy.',
    impact: 'Giving dignity, visibility, and digital identity to India\'s invisible workforce — the backbone of our economy.',
    icon: Users,
    link: 'https://www.giglo.in',
    gradient: 'from-secondary to-accent',
    glowClass: 'glow-secondary',
  },
  {
    name: 'Indoverse.ai',
    role: 'Co-Founder & CSO',
    tagline: 'AI Solutions for D2C, B2B, and Government Sectors',
    description: 'Enterprise AI transformation partner delivering intelligent solutions across industries and governance.',
    impact: 'Bringing AI intelligence to traditional industries and governance — making cutting-edge technology accessible to all sectors.',
    icon: Bot,
    link: '#',
    gradient: 'from-accent to-primary',
    glowClass: 'glow-accent',
  },
];

export const Ventures = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="ventures" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient-bg opacity-30" />
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -right-40 top-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
            My Ventures
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Building Solutions That{' '}
            <span className="gradient-text">Matter</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three startups, one mission: leveraging technology to solve India's most pressing challenges
            in education, employment, and enterprise efficiency.
          </p>
        </motion.div>

        {/* Venture Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card */}
              <div className="glass-card p-6 sm:p-8 h-full hover-lift relative overflow-hidden">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${venture.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${venture.gradient} flex items-center justify-center mb-6 ${venture.glowClass}`}
                >
                  <venture.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold mb-2">{venture.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{venture.role}</p>
                <p className="text-foreground font-semibold mb-4 italic">"{venture.tagline}"</p>
                <p className="text-muted-foreground mb-4">{venture.description}</p>
                
                {/* Impact Statement */}
                <div className="p-4 rounded-lg bg-muted/30 border-l-2 border-primary mb-6">
                  <p className="text-sm text-foreground">{venture.impact}</p>
                </div>

                {/* Link */}
                {venture.link !== '#' && (
                  <Button
                    asChild
                    variant="ghost"
                    className="group/btn p-0 h-auto text-primary hover:text-primary"
                  >
                    <a href={venture.link} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
