import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';
import photo4 from '@/assets/photo4.jpg';

const galleryImages = [
  { src: photo1, alt: 'Travel moment 1' },
  { src: photo2, alt: 'Travel moment 2' },
  { src: photo3, alt: 'Travel moment 3' },
  { src: photo4, alt: 'Travel moment 4' },
];

export const Gallery = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" ref={ref} className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Beyond the Boardroom
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Exploring the world, building connections, and finding inspiration through travel and experiences
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <a
            href="https://instagram.com/travel_style._diaries"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
            @travel_style._diaries
          </a>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              {galleryImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Travel, Perspective & Growth
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Travel has been one of my greatest teachers. Every destination offers new 
              perspectives, challenges assumptions, and reveals opportunities for 
              innovation. As an entrepreneur, the ability to adapt, observe, and connect 
              with diverse communities has been invaluable.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Through my Instagram journey as @travel_style._diaries, I share not just 
              beautiful destinations, but the lessons learned, the people met, and the 
              inspiration gathered along the way. Each experience shapes how I 
              approach business, leadership, and impact.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground">
              "The best entrepreneurs are observers. They notice patterns, understand 
              cultures, and connect insights from unexpected places. Travel isn't an escape—
              it's education."
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              >
                <a
                  href="https://instagram.com/travel_style._diaries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="bg-foreground text-background hover:bg-foreground/90 border-0"
              >
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Connect on X
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
