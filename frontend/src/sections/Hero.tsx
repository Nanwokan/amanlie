import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ComingSoonPill from '@/components/ComingSoonPill';
import heroBackgroundSrc from '@/assets/images/hero-bg.jpg';
import logoSrc from '@/assets/images/logo.png';
import { getScrollBehavior, prefersReducedMotion } from '@/lib/motion';
import { SITE_NAME, WHATSAPP_URL } from '@/lib/utils';

export default function Hero() {
  const logoRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const timeline = gsap.timeline({ delay: 0.2 });

    timeline
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(
        brandRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .to(
        scrollRef.current,
        { opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );

    return () => {
      timeline.kill();
    };
  }, []);

  const handleScrollDown = () => {
    const services = document.querySelector('#services');
    if (services) {
      services.scrollIntoView({ behavior: getScrollBehavior() });
    }
  };

  return (
    <section
      id="hero"
      className="relative z-0 flex min-h-[100dvh] flex-col items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackgroundSrc})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center px-6 pt-20 text-center">
        <img
          ref={logoRef}
          src={logoSrc}
          alt={`Logo ${SITE_NAME}`}
          className="h-auto w-[180px] opacity-0 drop-shadow-lg md:w-[240px]"
          decoding="async"
          fetchPriority="high"
          style={{ transform: 'scale(0.9)' }}
        />

        <div
          ref={brandRef}
          className="opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          <h1 className="font-display text-[26px] font-normal tracking-[0.24em] text-warm-cream drop-shadow-lg md:text-[32px]">
            {SITE_NAME}
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="mt-3 font-accent text-base font-normal italic text-warm-cream/90 opacity-0 drop-shadow-md md:text-[22px]"
          style={{ transform: 'translateY(20px)' }}
        >
          La nourriture du monde.
        </p>

        <p
          ref={subtitleRef}
          className="mt-6 font-body text-[11px] uppercase tracking-[0.34em] text-warm-cream/80 opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          Traiteur | Livraison | Sur-mesure
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-wrap justify-center gap-3 opacity-0 md:gap-4"
          style={{ transform: 'translateY(20px)' }}
        >
          <button type="button" onClick={handleScrollDown} className="btn-primary">
            Découvrir
          </button>
          <ComingSoonPill
            label="Deliveroo"
            light
          />
          <ComingSoonPill
            label="Uber Eats"
            light
          />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-green"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <div className="relative h-10 w-[2px] overflow-hidden rounded-full bg-warm-cream/40">
          <div className="h-3 w-full animate-scroll-dot rounded-full bg-warm-cream" />
        </div>
      </div>
    </section>
  );
}
