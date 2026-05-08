import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const lineText = lineRef.current?.textContent || '';

      if (lineRef.current) {
        lineRef.current.innerHTML = '';
        lineText.split('').forEach((character) => {
          const span = document.createElement('span');
          span.textContent = character === ' ' ? '\u00A0' : character;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(60px) rotateX(-30deg)';
          span.style.transformOrigin = 'center bottom';
          lineRef.current?.appendChild(span);
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 62%',
          toggleActions: 'play none none none',
        },
      });

      timeline
        .to(lineRef.current?.querySelectorAll('span') ?? [], {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.028,
          ease: 'expo.out',
        })
        .to(
          decoRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.35'
        );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center bg-warm-cream px-6 py-24 text-center md:py-28"
    >
      <div className="mb-9 w-fit">
        <span className="mx-auto block h-px w-32 bg-[#d9b588]" />
      </div>

      <h2
        ref={lineRef}
        className="max-w-[12ch] font-display text-[clamp(2.5rem,5vw,4.9rem)] font-normal leading-[0.96] tracking-[-0.03em] text-bordeaux"
      >
        La nourriture du monde.
      </h2>
      <div
        ref={decoRef}
        className="mt-10 h-px w-24 bg-[#d9b588] opacity-0"
        style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
      />

      <p
        ref={subtitleRef}
        className="mt-8 max-w-[42rem] font-body text-[16px] leading-[1.72] text-[#d9b588] opacity-0 md:text-[15px]"
        style={{ transform: 'translateY(18px)' }}
      >
        Saveurs authentiques, livrées avec passion.
      </p>
    </section>
  );
}
