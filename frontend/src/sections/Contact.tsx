import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 18 48 77 36',
    href: 'tel:+33618487736',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'nolyndavalerie@outlook.com',
    href: 'mailto:nolyndavalerie@outlook.com',
  },
  {
    icon: MapPin,
    label: 'Zone',
    value: 'Île-de-France & alentours',
  },
];

interface ContactFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}

function ContactField({
  id,
  label,
  type = 'text',
  required = false,
  textarea = false,
}: ContactFieldProps) {
  const labelText = `${label}${required ? ' *' : ''}`;
  const sharedClassName =
    'mt-5 w-full border-b border-[#d9c2b8] bg-transparent pb-3.5 font-body text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-transparent focus:border-bordeaux';

  return (
    <div className="contact-field">
      <label
        htmlFor={id}
        className="font-body text-[11px] uppercase tracking-[0.28em] text-charcoal/82"
      >
        {labelText}
      </label>

      {textarea ? (
        <textarea
          id={id}
          required={required}
          rows={4}
          className={`${sharedClassName} min-h-[128px] resize-none pt-0`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          className={sharedClassName}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const introItems = sectionRef.current?.querySelectorAll('.contact-copy');
      if (introItems && introItems.length > 0) {
        gsap.fromTo(
          introItems,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const formItems = sectionRef.current?.querySelectorAll('.contact-field, .contact-action');
      if (formItems && formItems.length > 0) {
        gsap.fromTo(
          formItems,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-soft-beige px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-14 xl:grid-cols-[minmax(340px,0.68fr)_minmax(620px,1.04fr)] xl:gap-20">
        <div className="flex flex-col pt-1">
          <div className="contact-copy w-fit">
            <span className="mb-3 block h-px w-40 bg-[#ef9f5f]/75" />
            <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#ef9f5f]">
              Contact
            </span>
          </div>

          <h2 className="contact-copy mt-8 max-w-[12ch] font-display text-[clamp(2rem,3.9vw,3rem)] font-normal leading-[0.95] tracking-[-0.028em] text-bordeaux">
            Une envie ? Un événement ?
          </h2>

          <p className="contact-copy mt-9 max-w-[33rem] font-body text-[15px] leading-[1.72] text-charcoal/78 md:text-[16px]">
            Écrivez-nous quelques lignes, nous revenons vers vous dans la journée.
          </p>

          <div className="mt-12 flex flex-col gap-8">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              const valueNode = detail.href ? (
                <a
                  href={detail.href}
                  className="font-accent text-[1.3rem] leading-[1.12] text-bordeaux transition-colors duration-300 hover:text-deep-burgundy md:text-[1.45rem]"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="font-accent text-[1.3rem] leading-[1.12] text-bordeaux md:text-[1.45rem]">
                  {detail.value}
                </p>
              );

              return (
                <div key={detail.label} className="contact-copy flex items-start gap-6">
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center border border-[#d3baae]">
                    <Icon className="h-6 w-6 text-bordeaux" strokeWidth={1.7} />
                  </div>

                  <div className="pt-0.5">
                    <p className="font-body text-[11px] uppercase tracking-[0.3em] text-charcoal/75">
                      {detail.label}
                    </p>
                    <div className="mt-2">{valueNode}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="self-start bg-[#f8f5f1] px-8 py-8 shadow-[0_0_0_1px_rgba(220,204,195,0.5)] md:px-11 md:py-9 lg:px-12 lg:py-9">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-x-8"
          >
            <ContactField id="contact-name" label="Nom" required />
            <ContactField id="contact-email" label="Email" type="email" required />
            <ContactField id="contact-phone" label="Téléphone" type="tel" />
            <ContactField id="contact-subject" label="Sujet" />

            <div className="md:col-span-2">
              <ContactField id="contact-message" label="Message" required textarea />
            </div>

            <div className="contact-action md:col-span-2">
              <button
                type="submit"
                className="inline-flex h-[54px] items-center gap-4 bg-bordeaux px-10 font-body text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-deep-burgundy"
              >
                Envoyer
                <Send className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </button>

              <p className="mt-5 max-w-[38rem] font-body text-[14px] leading-[1.65] text-charcoal/72">
                En envoyant ce message, vous acceptez d&apos;être recontacté(e) par
                AMANLIÉ.
              </p>

              {submitted ? (
                <p className="mt-3 font-body text-[14px] text-bordeaux">
                  Merci, votre message a bien été pris en compte.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
