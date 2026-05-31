import { Mail, Phone } from 'lucide-react';
import ComingSoonPill from '@/components/ComingSoonPill';
import { getScrollBehavior } from '@/lib/motion';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  INSTAGRAM_URL,
  SITE_NAME,
  WHATSAPP_URL,
} from '@/lib/utils';

const footerLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Menu', href: '#menu' },
  { label: 'Notre histoire', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: getScrollBehavior() });
    }
  };

  return (
    <footer className="border-t border-[#e6d7c5] bg-warm-cream px-6 py-16 md:px-10 md:py-18 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <span className="font-display text-[24px] font-normal tracking-[0.18em] text-bordeaux md:text-[26px]">
            {SITE_NAME}
          </span>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="text-center md:text-left">
            <h4 className="mb-5 font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="font-body text-[11px] uppercase tracking-[0.28em] text-charcoal/76 transition-colors duration-300 hover:text-bordeaux"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <h4 className="mb-5 font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
              Réseaux sociaux
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[2px] border border-[#25D366] px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#25D366] transition-colors duration-300 hover:bg-[#25D366] hover:text-white"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[2px] border border-bordeaux px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-bordeaux transition-colors duration-300 hover:bg-bordeaux hover:text-warm-cream"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <ComingSoonPill label="Facebook" />
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="mb-5 font-body text-[10px] uppercase tracking-[0.34em] text-[#d9b588]">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+33618487736"
                className="flex items-center justify-center gap-2 font-body text-[12px] text-charcoal/76 transition-colors duration-300 hover:text-bordeaux md:justify-end"
              >
                <Phone size={14} />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <p className="flex items-center justify-center gap-2 font-body text-[12px] text-charcoal/76 md:justify-end">
                <Mail size={14} />
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 h-px w-full bg-[#e6d7c5]" />

        <p className="text-center font-body text-[11px] text-charcoal/58">
          © {currentYear} {SITE_NAME}. Tous droits réservés. 
        </p>
        <p className="text-center font-body text-[11px] text-charcoal/58">
          Site conçu et développé par Nanwokan Ouattara.
        </p>
      </div>
    </footer>
  );
}
