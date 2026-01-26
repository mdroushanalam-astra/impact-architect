import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { MapPin, Rocket, BookOpen, Target } from 'lucide-react';
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';
import photo4 from '@/assets/photo4.jpg';

const stats = [
  { number: '3', label: 'Startups', icon: Rocket },
  { number: '4', label: 'Years UPSC Journey', icon: BookOpen },
  { number: 'Delhi', label: 'India', icon: MapPin },
  { number: '∞', label: 'Vision', icon: Target },
];

const photos = [photo1, photo2, photo3, photo4];

export const About = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6"
            >
              My Story
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              From UPSC to{' '}
              <span className="gradient-text">AI Entrepreneurship</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                My journey is one of transformation. For four years (2021-2025), I immersed myself 
                in UPSC Civil Services preparation — a pursuit that taught me discipline, 
                analytical thinking, and a deep understanding of governance and society.
              </p>
              <p>
                That experience didn't lead me to the civil services, but it gave me something 
                even more valuable: <span className="text-foreground font-semibold">a mindset built 
                for solving India's most complex challenges.</span>
              </p>
              <p className="text-foreground italic border-l-2 border-primary pl-4">
                "I don't just build products — I build solutions for India's most pressing challenges."
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-4 text-center hover-lift"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className={`relative rounded-xl overflow-hidden ${
                    index === 0 ? 'aspect-square' : 
                    index === 1 ? 'aspect-[4/5]' :
                    index === 2 ? 'aspect-[4/5]' : 'aspect-square'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                  <img
                    src={photo}
                    alt={`Ariba's journey ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/30 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-secondary/30 rounded-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
