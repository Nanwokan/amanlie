import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import CateringService from '../sections/CateringService';
import Services from '../sections/Services';
import Dishes from '../sections/Dishes';
import Testimonials from '../sections/Testimonials';
import Story from '../sections/Story';
import Contact from '../sections/Contact';
import SocialFeed from '../sections/SocialFeed';
import Footer from '../sections/Footer';
import SocialSidebar from '../sections/SocialSidebar';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <SocialSidebar />
      <main>
        <Hero />
        <Manifesto />
        <Story />
        <Services />
        <CateringService />
        <Dishes />
        <Testimonials />
        <Contact />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
}
