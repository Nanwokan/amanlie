import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';
import { SITE_NAME } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const cateringBenefits = [
  'Devis gratuit sous 24h',
  'Menu personnalisé selon vos goûts',
  'Service et matériel disponibles',
  'Options végétariennes et sans gluten',
];

const cateringCards = [
  {
    title: ['Mariages &', 'Cérémonies'],
    description: "Buffets soignés, service à l'assiette, équipe dédiée.",
  },
  {
    title: ['Entreprise &', 'Séminaires'],
    description: 'Plateaux repas, cocktails dînatoires, pauses gourmandes.',
  },
  {
    title: ['Événements privés'],
    description: 'Anniversaires, baptêmes, dîners intimes, sur mesure.',
  },
  {
    title: ['Animation culinaire'],
    description: 'Stand street-food africain, atelier bissap, démonstrations.',
  },
];

export default function CateringService() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.catering-copy',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.catering-panel',
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="traiteur"
      className="relative overflow-hidden bg-[#7c1d1c] px-10 py-16 md:px-10 md:py-24 lg:px-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(195,90,48,0.34),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.015)_0%,transparent_35%,transparent_65%,rgba(255,255,255,0.02)_100%)]" />

      <div
        ref={sectionRef}
        className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] xl:gap-16"
      >
        <div className="flex flex-col pt-1">
          <div className="catering-copy w-fit">
            <span className="mb-3 block h-px w-40 bg-[#f1a15f]/75" />
            <span className="font-body text-[11px] uppercase tracking-[0.34em] text-[#f1a15f]">
              Service traiteur
            </span>
          </div>

          <h2 className="catering-copy mt-8 max-w-[660px] font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-[#fff4ea]">
            Vos événements, tels que
            <br />
            vous les rêvez.
          </h2>

          <p className="catering-copy mt-11 max-w-[36rem] font-body text-[14px] leading-[1.7] text-[#efd7cb] md:text-[15px]">
            De la table familiale au cocktail d&apos;entreprise, {SITE_NAME} orchestre
            une expérience culinaire qui vous ressemble. Nous composons votre menu,
            gérons la logistique, et apportons l&apos;âme du voyage.
          </p>

          <ul className="mt-12 grid gap-[1.05rem]">
            {cateringBenefits.map((benefit) => (
              <li
                key={benefit}
                className="catering-copy flex items-center gap-4 font-body text-[14px] text-[#f6e7de] md:text-[15px]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f1a15f]/85">
                  <Check className="h-[13px] w-[13px] text-[#f1a15f]" strokeWidth={2.25} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="catering-copy mt-12">
            <a
              href="#contact"
              className="inline-flex h-[58px] items-center gap-3 rounded-none bg-[#f5a65f] px-11 font-body text-sm font-semibold uppercase tracking-[0.27em] text-[#391410] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="h-[15px] w-[15px]" strokeWidth={2.1} />
              Demander un devis
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          {cateringCards.map((card) => (
            <article
              key={card.title.join(' ')}
              className="catering-panel min-h-[260px] border border-[#a14b3f]/55 bg-transparent px-8 py-8 md:min-h-[282px] lg:px-10 lg:py-9"
            >
              <h3 className="max-w-[12.5ch] font-display text-[20px] font-normal leading-[1.08] text-[#fff4ea] md:text-[23px]">
                {card.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p className="mt-7 max-w-[17rem] font-body text-[14px] leading-[1.7] text-[#efd6ca] md:text-[15px]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
