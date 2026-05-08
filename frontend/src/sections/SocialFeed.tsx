import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import socialImage1 from '@/assets/images/social-1.jpg';
import socialImage2 from '@/assets/images/social-2.jpg';
import socialImage3 from '@/assets/images/social-3.jpg';
import socialImage4 from '@/assets/images/social-4.jpg';
import socialImage5 from '@/assets/images/social-5.jpg';
import ComingSoonPill from '@/components/ComingSoonPill';
import { prefersReducedMotion } from '@/lib/motion';
import { SITE_NAME } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const socialImages = [
  socialImage1,
  socialImage2,
  socialImage3,
  socialImage4,
  socialImage5,
];

export default function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.social-item');
      if (!items?.length) {
        return;
      }

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

    return () => context.revert();
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
          L&apos;univers {SITE_NAME}
        </p>
        <div className="mt-5 flex justify-center">
          <ComingSoonPill label="Instagram" />
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 gap-0 md:grid-cols-5">
        {socialImages.map((src, index) => (
          <figure key={src} className="social-item group relative aspect-square overflow-hidden">
            <img
              src={src}
              alt={`Univers ${SITE_NAME} ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              decoding="async"
              loading="lazy"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 py-3 font-body text-[11px] uppercase tracking-[0.22em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Instagram bientôt
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
