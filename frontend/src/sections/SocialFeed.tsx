import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { publicAsset } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const socialImages = [
  publicAsset('images/social-1.jpg'),
  publicAsset('images/social-2.jpg'),
  publicAsset('images/social-3.jpg'),
  publicAsset('images/social-4.jpg'),
  publicAsset('images/social-5.jpg'),
];

export default function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current!.querySelectorAll('.social-item');
      gsap.fromTo(
        items,
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-cream py-20 md:py-24">
      <div className="mb-10 px-6 text-center md:mb-12">
        <div className="mx-auto mb-8 w-fit">
          <span className="mx-auto mb-3 block h-px w-28 bg-[#d9b588]" />
          <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
            Suivez-nous
          </span>
        </div>
        <p className="font-display text-[20px] font-normal leading-[1.08] text-bordeaux md:text-[23px]">
          @amanlie_paris
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-0 md:grid-cols-5"
      >
        {socialImages.map((src, index) => (
          <a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item group relative aspect-square overflow-hidden"
          >
            <img
              src={src}
              alt={`Univers AMANLIÉ ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-bordeaux/0 transition-all duration-300 group-hover:bg-bordeaux/16">
              <Instagram
                size={26}
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
