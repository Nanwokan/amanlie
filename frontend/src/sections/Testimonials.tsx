import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';
import { SITE_NAME } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Aïcha M.',
    role: 'Mariage, 120 invités',
    text: `${SITE_NAME} a magnifiquement orchestré le buffet de notre mariage. Les saveurs africaines ont enchanté tous nos invités, et la présentation était digne d'un magazine.`,
    rating: 5,
  },
  {
    name: 'Thomas B.',
    role: 'Événement corporate',
    text: `Nous faisons appel à ${SITE_NAME} pour nos déjeuners d'entreprise. La livraison est toujours ponctuelle, la cuisine fraîche et originale, avec un vrai sens du détail.`,
    rating: 5,
  },
  {
    name: 'Fatou K.',
    role: 'Anniversaire familial',
    text: "J'ai commandé le service traiteur pour l'anniversaire de ma mère. Le poisson grillé aux plantains était délicieux, et le service attentionné a fait toute la différence.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (!cards?.length) {
        return;
      }

      gsap.fromTo(
        cards,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="temoignages"
      ref={sectionRef}
      className="bg-warm-cream px-6 py-24 md:px-10 md:py-28 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 text-center md:mb-16">
          <div className="mx-auto mb-9 w-fit">
            <span className="mx-auto mb-3 block h-px w-32 bg-[#d9b588]" />
            <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
              Témoignages
            </span>
          </div>

          <h2 className="font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-bordeaux">
            Ils nous font confiance
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="testimonial-card flex flex-col border border-[#ddd0be] bg-[#f8f5f1] p-8 md:p-9"
            >
              <Quote size={24} className="mb-4 text-bordeaux/28" />

              <div className="mb-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className="fill-[#d9b588] text-[#d9b588]"
                  />
                ))}
              </div>

              <p className="flex-grow font-body text-[14px] leading-[1.72] text-charcoal/76 md:text-[15px]">
                "{testimonial.text}"
              </p>

              <div className="mt-8 border-t border-[#e4d6c4] pt-6">
                <p className="font-display text-[20px] font-normal leading-[1.08] text-bordeaux md:text-[23px]">
                  {testimonial.name}
                </p>
                <p className="mt-2 font-body text-[11px] uppercase tracking-[0.28em] text-charcoal/58">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
