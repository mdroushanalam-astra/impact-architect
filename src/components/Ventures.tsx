import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import techgramLogo from '@/assets/techgram-logo.png';
import gigloLogo from '@/assets/giglo-logo.png';
import indoverseLogo from '@/assets/indoverse-logo.png';

const ventures = [
  {
    name: 'Techgram',
    role: 'Founder & CEO',
    tagline: 'The AI-Powered Metaverse of Learning',
    description: 'Addressing 2B+ underserved learners globally through 6 connected realms: Learn, Focus, Feel, Grow, Connect, Live.',
    impact: 'Transforming passive memorization into purpose-driven, AI-personalized education that adapts to every learner\'s unique journey.',
    logo: techgramLogo,
    link: 'https://techgramlabs.site',
  },
  {
    name: 'Gig-lo',
    role: 'Brand Ambassador & Co-Founder',
    tagline: 'Empowering India\'s 450M Informal Workforce',
    description: 'A community-powered marketplace connecting workers with households, bringing transparency and digital tools to the informal economy.',
    impact: 'Giving dignity, visibility, and digital identity to India\'s invisible workforce — the backbone of our economy.',
    logo: gigloLogo,
    link: 'https://www.giglo.in',
  },
  {
    name: 'Indoverse.ai',
    role: 'Co-Founder & CSO',
    tagline: 'AI Solutions for D2C, B2B, and Government Sectors',
    description: 'Enterprise AI transformation partner delivering intelligent solutions across industries and governance.',
    impact: 'Bringing AI intelligence to traditional industries and governance — making cutting-edge technology accessible to all sectors.',
    logo: indoverseLogo,
    link: '#',
  },
];

export const Ventures = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="ventures" ref={ref} className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 animated-gradient-bg opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            My Ventures
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Building Solutions That{' '}
            <span className="text-primary">Matter</span>
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
              <div className="bg-card p-6 sm:p-8 h-full rounded-2xl border border-border hover-lift shadow-lg relative overflow-hidden">
                {/* Gradient Border Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Logo */}
                <div className="relative w-16 h-16 mb-6 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={venture.logo}
                    alt={`${venture.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-display font-bold mb-2 text-foreground">{venture.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{venture.role}</p>
                  <p className="text-foreground font-semibold mb-4 italic">"{venture.tagline}"</p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{venture.description}</p>
                  
                  {/* Impact Statement */}
                  <div className="p-4 rounded-xl bg-primary/5 border-l-4 border-primary mb-6">
                    <p className="text-sm text-foreground">{venture.impact}</p>
                  </div>

                  {/* Link */}
                  {venture.link !== '#' && (
                    <Button
                      asChild
                      variant="ghost"
                      className="group/btn p-0 h-auto text-primary hover:text-primary hover:bg-transparent"
                    >
                      <a href={venture.link} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
