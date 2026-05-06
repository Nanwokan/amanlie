import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Menu', href: '#menu' },
  { label: 'Notre histoire', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#e6d7c5] bg-warm-cream px-6 py-16 md:px-10 md:py-18 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <span className="font-display text-[24px] font-normal tracking-[0.18em] text-bordeaux md:text-[26px]">
            AMANLIÈ
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
                    onClick={(e) => handleNavClick(e, link.href)}
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
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bordeaux transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bordeaux transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/330618487736"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
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
                +33 6 18 48 77 36
              </a>
              <a
                href="mailto:nolyndavalerie@outlook.com"
                className="flex items-center justify-center gap-2 font-body text-[12px] text-charcoal/76 transition-colors duration-300 hover:text-bordeaux md:justify-end"
              >
                <Mail size={14} />
                nolyndavalerie@outlook.com
              </a>
            </div>
          </div>
        </div>

        <div className="mb-8 h-px w-full bg-[#e6d7c5]" />

        <p className="text-center font-body text-[11px] text-charcoal/58">
          © 2025 AMANLIÈ. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
