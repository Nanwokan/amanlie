import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_NAME } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: CONTACT_PHONE_DISPLAY,
    href: 'tel:+33618487736',
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
  },
  {
    icon: MapPin,
    label: 'Zone',
    value: 'Île-de-France & alentours',
  },
];

interface ContactFieldProps {
  autoComplete?: string;
  id: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  label: string;
  maxLength?: number;
  minLength?: number;
  name: keyof ContactFormValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  value: string;
}

function ContactField({
  autoComplete,
  id,
  inputMode,
  label,
  maxLength,
  minLength,
  name,
  onChange,
  required = false,
  textarea = false,
  type = 'text',
  value,
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
          autoComplete={autoComplete}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          value={value}
          required={required}
          rows={4}
          className={`${sharedClassName} min-h-[128px] resize-none pt-0`}
          onChange={onChange}
        />
      ) : (
        <input
          autoComplete={autoComplete}
          id={id}
          inputMode={inputMode}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          type={type}
          value={value}
          required={required}
          className={sharedClassName}
          onChange={onChange}
        />
      )}
    </div>
  );
}

interface ContactFormValues {
  email: string;
  message: string;
  name: string;
  phone: string;
  subject: string;
}

const initialValues: ContactFormValues = {
  email: '',
  message: '',
  name: '',
  phone: '',
  subject: '',
};

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

type SubmissionState = 'error' | 'idle' | 'sending' | 'success';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const introItems = sectionRef.current?.querySelectorAll('.contact-copy');
      if (introItems?.length) {
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

      const formItems = sectionRef.current?.querySelectorAll(
        '.contact-field, .contact-action'
      );
      if (formItems?.length) {
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

    return () => context.revert();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setFeedbackMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const honeyValue = String(formData.get('_honey') ?? '').trim();

    if (honeyValue) {
      setFormValues(initialValues);
      formElement.reset();
      setSubmissionState('success');
      setFeedbackMessage(
        'Votre message a bien été envoyé. Nous revenons vers vous très rapidement.'
      );
      return;
    }

    setSubmissionState('sending');
    setFeedbackMessage('');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          subject: formValues.subject,
          message: formValues.message,
          _subject: formValues.subject.trim()
            ? `[${SITE_NAME}] ${formValues.subject.trim()}`
            : `[${SITE_NAME}] Nouveau message via le site`,
          _replyto: formValues.email,
          _template: 'table',
          _captcha: 'false',
          _honey: honeyValue,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string; success?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.message || 'Échec de l’envoi du message.');
      }

      setFormValues(initialValues);
      setSubmissionState('success');
      setFeedbackMessage(
        'Votre message a bien été envoyé. Nous revenons vers vous très rapidement.'
      );
    } catch (error) {
      setSubmissionState('error');
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue pendant l’envoi. Merci de réessayer.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-28 bg-soft-beige px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-24 xl:px-20"
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
            Écrivez-nous quelques lignes, votre message part directement dans notre
            boîte de réception sans ouvrir votre messagerie.
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
            <ContactField
              autoComplete="name"
              id="contact-name"
              label="Nom"
              maxLength={80}
              minLength={2}
              name="name"
              onChange={handleChange}
              required
              value={formValues.name}
            />
            <ContactField
              autoComplete="email"
              id="contact-email"
              inputMode="email"
              label="Email"
              maxLength={120}
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formValues.email}
            />
            <ContactField
              autoComplete="tel"
              id="contact-phone"
              inputMode="tel"
              label="Téléphone"
              maxLength={30}
              name="phone"
              onChange={handleChange}
              type="tel"
              value={formValues.phone}
            />
            <ContactField
              autoComplete="off"
              id="contact-subject"
              label="Sujet"
              maxLength={120}
              name="subject"
              onChange={handleChange}
              value={formValues.subject}
            />

            <div className="md:col-span-2">
              <ContactField
                autoComplete="off"
                id="contact-message"
                label="Message"
                maxLength={2000}
                minLength={10}
                name="message"
                onChange={handleChange}
                required
                textarea
                value={formValues.message}
              />
            </div>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-website">Site web</label>
              <input
                id="contact-website"
                name="_honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div className="contact-action flex flex-col items-center md:col-span-2">
              <button
                type="submit"
                aria-busy={submissionState === 'sending'}
                disabled={submissionState === 'sending'}
                className="inline-flex h-[54px] items-center gap-4 bg-bordeaux px-10 font-body text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-deep-burgundy disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submissionState === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
                <Send className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </button>

              <p className="mt-5 max-w-[38rem] font-body text-[14px] leading-[1.65] text-charcoal/72">
                En envoyant ce message, vous acceptez d&apos;être recontacté(e) par{' '}
                {SITE_NAME}.
              </p>

              {feedbackMessage ? (
                <p
                  className={`mt-3 font-body text-[14px] ${
                    submissionState === 'error' ? 'text-[#a13722]' : 'text-bordeaux'
                  }`}
                  aria-live="polite"
                  role={submissionState === 'error' ? 'alert' : 'status'}
                >
                  {feedbackMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
