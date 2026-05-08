import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getScrollBehavior } from '@/lib/motion';
import { SITE_NAME } from '@/lib/utils';

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
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hadMobileMenuOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = mobileOpen ? 'hidden' : previousOverflow;

    return () => {
      style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      if (hadMobileMenuOpen.current) {
        toggleButtonRef.current?.focus();
      }
      hadMobileMenuOpen.current = false;
      return undefined;
    }

    hadMobileMenuOpen.current = true;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      mobileNavRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: getScrollBehavior() });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 md:px-10 lg:px-20 ${
          scrolled ? 'bg-warm-cream/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, '#hero')}
          className={`font-display text-2xl font-semibold tracking-[3px] transition-colors duration-500 ${
            scrolled ? 'text-bordeaux' : 'text-warm-cream'
          }`}
        >
          {SITE_NAME}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className={`group relative font-body text-sm font-medium uppercase tracking-[1.5px] transition-colors duration-300 ${
                scrolled
                  ? 'text-charcoal hover:text-bordeaux'
                  : 'text-warm-cream/90 hover:text-warm-cream'
              }`}
            >
              {link.label}
              <span
                className={`absolute left-1/2 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:left-0 group-hover:w-full ${
                  scrolled ? 'bg-bordeaux' : 'bg-warm-cream'
                }`}
              />
            </a>
          ))}
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className={`transition-colors duration-500 md:hidden ${
            scrolled ? 'text-bordeaux' : 'text-warm-cream'
          }`}
          onClick={() => setMobileOpen((previousValue) => !previousValue)}
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation mobile"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-warm-cream md:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setMobileOpen(false);
            }
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="font-display text-[2.4rem] font-normal text-bordeaux transition-colors hover:text-deep-burgundy"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
