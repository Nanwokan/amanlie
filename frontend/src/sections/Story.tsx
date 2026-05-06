import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicAsset } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const img = imageContainerRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.12, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const textChildren = textRef.current?.querySelectorAll('.stagger-item');
      if (textChildren && textChildren.length > 0) {
        gsap.fromTo(
          textChildren,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-bordeaux px-6 py-24 md:px-10 md:py-28 lg:px-20 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div
          ref={imageContainerRef}
          className="overflow-hidden rounded-[4px]"
        >
          <img
            src={publicAsset('images/story.jpg')}
            alt="Chef AMANLIÉ"
            className="aspect-square w-full object-cover"
          />
        </div>

        <div ref={textRef} className="flex flex-col">
          <div className="stagger-item mb-8 w-fit">
            <span className="mb-3 block h-px w-32 bg-[#d9b588]" />
            <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
              Notre histoire
            </span>
          </div>

          <h2 className="stagger-item max-w-[540px] font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-warm-cream">
            AMANLIÉ, une cuisine qui raconte un voyage
          </h2>

          <p className="stagger-item mt-7 max-w-[470px] font-body text-[14px] leading-[1.7] text-warm-cream/82 md:text-[15px]">
            Fondée par Ouattara N&apos;dabani Lynda Valérie, AMANLIÉ naît d&apos;une
            passion: partager des saveurs sincères, entre héritage africain, découvertes
            gastronomiques et hospitalité contemporaine.
          </p>

          <div className="stagger-item mt-10 flex items-start gap-5">
            <div className="mt-4 h-px w-20 shrink-0 bg-[#d9b588]" />
            <p className="font-accent text-[1.55rem] italic leading-[1.35] text-warm-cream/72 md:text-[1.8rem]">
              “La nourriture est notre langage universel.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
