import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Menu', href: '#menu' },
  { label: 'Notre histoire', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 md:px-10 lg:px-20 ${
          scrolled
            ? 'bg-warm-cream/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className={`font-display text-2xl font-semibold tracking-[3px] transition-colors duration-500 ${
            scrolled ? 'text-bordeaux' : 'text-warm-cream'
          }`}
        >
          AMANLIÉ
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative font-body text-sm font-medium uppercase tracking-[1.5px] transition-colors duration-300 group ${
                scrolled
                  ? 'text-charcoal hover:text-bordeaux'
                  : 'text-warm-cream/90 hover:text-warm-cream'
              }`}
            >
              {link.label}
              <span
                className={`absolute left-1/2 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                  scrolled ? 'bg-bordeaux' : 'bg-warm-cream'
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors duration-500 ${scrolled ? 'text-bordeaux' : 'text-warm-cream'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-warm-cream transition-all duration-500 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-[2.4rem] font-normal text-bordeaux transition-colors hover:text-deep-burgundy"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
