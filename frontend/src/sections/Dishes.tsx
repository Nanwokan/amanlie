import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  CupSoda,
  Dessert,
  Sandwich,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

type MenuCategory = 'plats' | 'accompagnements' | 'boissons' | 'desserts';

const INITIAL_VISIBLE_ITEMS = 6;

interface MenuItem {
  description?: string;
  meta?: string;
  name: string;
  price?: string;
}

const menuTabs: { icon: LucideIcon; key: MenuCategory; label: string }[] = [
  { key: 'plats', label: 'Plats chauds', icon: UtensilsCrossed },
  {
    key: 'accompagnements',
    label: 'Accompagnement & snacks',
    icon: Sandwich,
  },
  { key: 'boissons', label: 'Boissons', icon: CupSoda },
  { key: 'desserts', label: 'Desserts', icon: Dessert },
];

const menuByCategory: Record<MenuCategory, MenuItem[]> = {
  plats: [
    {
      name: 'Sauce Djoumblé',
      price: '15,00 €',
      description:
        'Sauce ivoirienne à base de poudre de gombo sec, servie avec accompagnement au choix.',
    },
    {
      name: 'Sauce Arachide',
      price: '16,00 €',
      description:
        "Sauce onctueuse à la pâte d'arachide, généreuse et mijotée à feu doux.",
    },
    {
      name: 'Sauce Graine',
      price: '16,00 €',
      description:
        'Sauce ivoirienne à la pulpe de noix de palme, aux saveurs riches et profondes.',
    },
    {
      name: 'Sauce Claire',
      price: '15,00 €',
      description:
        "Sauce à base de tomates, d'oignons et d'akpi, épicée et parfumée.",
    },
    {
      name: 'Sauce Épinards',
      price: '15,00 €',
      description:
        "Épinards mijotés aux saveurs africaines, relevés d'un assaisonnement maison.",
    },
    {
      name: 'Sauce Pistache',
      price: '16,00 €',
      description:
        'Sauce onctueuse aux graines de pistache, mijotée avec soin aux épices douces.',
    },
    {
      name: 'Travers de porc braisés',
      price: '17,00 €',
      description:
        'Travers de porc marinés puis braisés lentement, servis avec accompagnement au choix.',
    },
    {
      name: 'Tilapia grillé',
      price: '18,00 €',
      description:
        "Tilapia entier grillé aux épices, accompagné d'un accompagnement au choix.",
    },
    {
      name: 'Poulet braisé',
      price: '14,00 €',
      description:
        'Poulet mariné puis braisé, servi avec accompagnement au choix.',
    },
    {
      name: 'Brochettes de viande (au choix)',
      price: '14,00 €',
      description:
        'Brochettes de viande marinées, servies avec accompagnement au choix.',
    },
  ],
  accompagnements: [
    {
      name: 'Alloco',
      price: '3,50 €',
    },
    {
      name: 'Abolo (6 pièces)',
      price: '2,50 €',
    },
    {
      name: 'Placali (150 g)',
      price: '3,00 €',
    },
    {
      name: 'Pomme de terre sautée',
      price: '3,50 €',
    },
    {
      name: 'Foufou (2 boules)',
      price: '4,00 €',
    },
    {
      name: 'Riz blanc (150 g)',
      price: '3,00 €',
    },
    {
      name: 'Riz sauté (150 g)',
      price: '4,00 €',
    },
    {
      name: 'Wings panés (5 pièces)',
      price: '5,50 €',
    },
  ],
  boissons: [
    {
      name: 'Jus de Bissap',
      meta: '25 cl',
      price: '2,50 €',
      description:
        'Infusion d’hibiscus aux notes florales et mentholées, servie fraîche.',
    },
    {
      name: 'Jus de Tamarin',
      meta: '25 cl',
      price: '2,50 €',
      description:
        'Boisson traditionnelle au tamarin, légèrement acidulée et rafraîchissante.',
    },
    {
      name: 'Jus de Passion',
      meta: '25 cl',
      price: '3,50 €',
      description:
        'Jus de fruit de la passion aux saveurs exotiques et délicatement acidulées.',
    },
    {
      name: 'Citronnade maison',
      meta: '25 cl',
      price: '2,00 €',
      description:
        'Boisson citronnée fraîchement préparée, légère et désaltérante.',
    },
    {
      name: 'Jus de Baobab',
      meta: '25 cl',
      price: '3,00 €',
      description:
        'Boisson onctueuse au fruit de baobab, aux saveurs douces et gourmandes.',
    },
  ],
  desserts: [
    {
      name: 'Tiramisu',
    },
  ],
};

export default function Dishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('plats');
  const [expandedCategories, setExpandedCategories] = useState<
    Partial<Record<MenuCategory, boolean>>
  >({});

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const introItems = introRef.current?.querySelectorAll('.menu-intro-item');
      if (introItems?.length) {
        gsap.fromTo(
          introItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const shellItems = sectionRef.current?.querySelectorAll('.menu-shell-item');
      if (shellItems?.length) {
        gsap.fromTo(
          shellItems,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      const dishItems = menuRef.current?.querySelectorAll('.dish-item');
      if (!dishItems?.length) {
        return;
      }

      gsap.fromTo(
        dishItems,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, menuRef);

    return () => context.revert();
  }, [activeCategory, expandedCategories]);

  const activeItems = menuByCategory[activeCategory];
  const isExpanded = expandedCategories[activeCategory] ?? false;
  const shouldShowToggle = activeItems.length > INITIAL_VISIBLE_ITEMS;
  const visibleItems = shouldShowToggle && !isExpanded
    ? activeItems.slice(0, INITIAL_VISIBLE_ITEMS)
    : activeItems;

  const handleToggleExpanded = () => {
    setExpandedCategories((previousState) => ({
      ...previousState,
      [activeCategory]: !previousState[activeCategory],
    }));
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="scroll-mt-28 bg-warm-cream px-6 py-24 md:px-10 md:py-28 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div
          ref={introRef}
          className="grid grid-cols-1 items-start gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] xl:gap-24"
        >
          <div className="menu-intro-item">
            <div className="mb-9 w-fit">
              <span className="mb-3 block h-px w-40 bg-[#d9b588]" />
              <span className="font-body text-[11px] uppercase tracking-[0.34em] text-[#d9b588]">
                Notre carte
              </span>
            </div>

            <h2 className="max-w-[660px] font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-bordeaux">
              Les grands classiques
              <span className="block italic">de la maison.</span>
            </h2>
          </div>

          <p className="menu-intro-item max-w-[480px] pt-1 font-body text-[14px] leading-[1.7] text-charcoal/78 xl:ml-auto xl:pt-24">
            Sauces traditionnelles, braisés, accompagnements maison, jus frais et
            douceurs: voici la vraie carte servie chez AMANLIÈ.
          </p>
        </div>

        <div className="menu-shell-item mt-16 border-b border-[#d8cbb9] md:mt-20">
          <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
            {menuTabs.map((tab) => {
              const isActive = activeCategory === tab.key;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`relative flex items-center gap-2 pb-5 font-body text-[11px] uppercase tracking-[0.29em] transition-colors duration-300 ${
                    isActive ? 'text-bordeaux' : 'text-charcoal/65 hover:text-bordeaux'
                  }`}
                >
                  <Icon size={13} strokeWidth={1.8} />
                  {tab.label}
                  <span
                    className={`absolute bottom-[-1px] left-0 h-[2px] bg-bordeaux transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={menuRef}
          className="menu-shell-item mt-10 grid grid-cols-1 gap-x-16 xl:mt-14 xl:grid-cols-2"
        >
          {visibleItems.map((item) => (
            <article
              key={`${activeCategory}-${item.name}`}
              className="dish-item border-b border-[#ddd0be] py-8 first:pt-10 xl:py-10"
            >
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="shrink-0 font-display text-[20px] font-normal leading-[1.08] text-bordeaux md:text-[23px]">
                  {item.name}
                </h3>

                {item.meta || item.price ? (
                  <span className="mt-1 h-px flex-1 border-b border-dotted border-[#ddcdb7]" />
                ) : null}

                {item.meta ? (
                  <span className="shrink-0 font-body text-[11px] uppercase tracking-[0.22em] text-charcoal/58 md:text-[12px]">
                    {item.meta}
                  </span>
                ) : null}

                {item.price ? (
                  <span className="shrink-0 font-display text-[17px] font-normal leading-none text-bordeaux md:text-[19px]">
                    {item.price}
                  </span>
                ) : null}
              </div>

              {item.description ? (
                <p className="mt-4 max-w-[42rem] font-body text-[14px] leading-[1.7] text-charcoal/76 md:pr-6 md:text-[15px]">
                  {item.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        {shouldShowToggle ? (
          <div className="menu-shell-item mt-10 flex justify-center xl:mt-12">
            <button
              type="button"
              onClick={handleToggleExpanded}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-3 border border-[#d8cbb9] bg-[#f8f3ea] px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-bordeaux transition-colors duration-300 hover:bg-[#f1e7d8]"
            >
              {isExpanded ? 'Réduire la liste' : 'Voir plus'}
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
