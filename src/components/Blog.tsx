import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, X, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts, BlogPost } from '@/data/blogData';

const categoryColors: Record<string, string> = {
  'AI & Tech': 'from-primary to-secondary',
  'Entrepreneurship': 'from-secondary to-accent',
  'Personal Growth': 'from-accent to-primary',
  'Future Vision': 'from-primary via-secondary to-accent',
};

export const Blog = () => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI & Tech', 'Entrepreneurship', 'Personal Growth', 'Future Vision'];
  const filteredPosts = filter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <>
      <section id="blog" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -right-40 top-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
              My Thoughts
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Insights &{' '}
              <span className="gradient-text">Reflections</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Thoughts on AI, entrepreneurship, personal growth, and building India's future.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className={`rounded-full transition-all ${
                  filter === category 
                    ? 'bg-gradient-to-r from-primary to-secondary' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                className="group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="glass-card p-6 h-full hover-lift flex flex-col">
                  {/* Category Badge */}
                  <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[post.category]} text-white mb-4`}>
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Category */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[selectedPost.category]} text-white mb-6`}>
                {selectedPost.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                {selectedPost.title}
              </h2>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime} read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </span>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
