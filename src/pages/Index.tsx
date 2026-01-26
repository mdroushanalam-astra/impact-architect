import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Ventures } from '@/components/Ventures';
import { Vision } from '@/components/Vision';
import { Timeline } from '@/components/Timeline';
import { Blog } from '@/components/Blog';
import { Gallery } from '@/components/Gallery';
import { Newsletter } from '@/components/Newsletter';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AIChatbot } from '@/components/AIChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Ventures />
        <Vision />
        <Timeline />
        <Blog />
        <Gallery />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
