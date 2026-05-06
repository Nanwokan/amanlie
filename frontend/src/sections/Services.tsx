import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceRowProps {
  label: string;
  title: string;
  description: string;
  image: string;
  reversed?: boolean;
  cta: React.ReactNode;
}

function ServiceRow({ label, title, description, image, reversed, cta }: ServiceRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const ctx = gsap.context(() => {
      const textChildren = textRef.current?.querySelectorAll('.stagger-item');
      if (textChildren && textChildren.length > 0) {
        gsap.fromTo(
          textChildren,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const img = imgContainerRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.12, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (imgContainerRef.current) {
        gsap.to(imgContainerRef.current, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20 ${
        reversed ? 'md:[direction:rtl]' : ''
      }`}
    >
      <div
        ref={imgContainerRef}
        className={`overflow-hidden rounded-[4px] ${reversed ? 'md:[direction:ltr]' : ''}`}
      >
        <img
          src={image}
          alt={title}
          className="h-[400px] w-full object-cover md:h-[500px]"
        />
      </div>

      <div
        ref={textRef}
        className={`flex flex-col ${reversed ? 'md:[direction:ltr] md:items-end md:text-right' : ''}`}
      >
        <div className="stagger-item mb-8 w-fit">
          <span className="mb-3 block h-px w-32 bg-[#d9b588]" />
          <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
            {label}
          </span>
        </div>

        <h3 className="stagger-item max-w-[540px] font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
          {title}
        </h3>

        <p className="stagger-item mt-7 max-w-[470px] font-body text-[14px] leading-[1.7] text-charcoal/76 md:text-[15px]">
          {description}
        </p>

        <div className="stagger-item mt-10">{cta}</div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="bg-soft-beige px-6 py-24 md:px-10 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-24 md:gap-32">
        <ServiceRow
          label="Livraison"
          title="Vos plats préférés, directement chez vous"
          description="Commandez en quelques clics sur Deliveroo ou Uber Eats. Une cuisine authentique, préparée avec soin et livrée rapidement à votre porte."
          image="/images/delivery.jpg"
          reversed
          cta={
            <div className="flex flex-wrap gap-4">
              <a
                href="https://deliveroo.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Deliveroo
              </a>
              <a
                href="https://ubereats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Uber Eats
              </a>
              <a
                href="https://wa.me/330618487736"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-green"
              >
                WhatsApp
              </a>
            </div>
          }
        />

        <ServiceRow
          label="Sur-mesure"
          title="Votre vision, notre expertise"
          description="Mariages, anniversaires, séminaires d'entreprise — nous adaptons nos prestations à vos envies. Menus personnalisés, décoration, service attentif : nous nous occupons de tout pour que vous profitiez pleinement de votre moment."
          image="/images/surmesure.jpg"
          cta={<a href="#contact" className="btn-primary">Nous contacter</a>}
        />
      </div>
    </section>
  );
}
