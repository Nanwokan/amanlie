import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CupSoda,
  Dessert,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type MenuCategory = 'plats' | 'desserts' | 'boissons';

interface MenuItem {
  name: string;
  price: string;
  description: string;
}

const menuTabs: { key: MenuCategory; label: string; icon: LucideIcon }[] = [
  { key: 'plats', label: 'Plats chauds', icon: UtensilsCrossed },
  { key: 'desserts', label: 'Desserts', icon: Dessert },
  { key: 'boissons', label: 'Boissons', icon: CupSoda },
];

const menuByCategory: Record<MenuCategory, MenuItem[]> = {
  plats: [
    {
      name: 'Thiéboudienne',
      price: '16€',
      description:
        'Riz au poisson, légumes mijotés, sauce tomate et tamarin, inspiré des grandes tables sénégalaises.',
    },
    {
      name: 'Jollof Rice & Poulet braisé',
      price: '15€',
      description:
        "Riz tomate-épices, poulet mariné grillé au feu de bois et notes fumées d'Afrique de l'Ouest.",
    },
    {
      name: 'Attiéké & Poisson grillé',
      price: '17€',
      description:
        "Semoule de manioc fermentée, poisson entier mariné, piment maison et fraîcheur ivoirienne.",
    },
    {
      name: 'Mafé Bœuf',
      price: '16€',
      description:
        "Ragoût onctueux de bœuf à la pâte d'arachide, légumes racines et riz basmati parfumé.",
    },
    {
      name: 'Yassa Poulet',
      price: '15€',
      description:
        'Poulet mariné citron-oignons confits, olives, sauce vive et riz blanc moelleux.',
    },
    {
      name: 'Alloco du chef',
      price: '9€',
      description:
        'Bananes plantains caramélisées, sauce tomate épicée et œuf brouillé en option.',
    },
  ],
  desserts: [
    {
      name: 'Nems banane-chocolat',
      price: '7€',
      description:
        'Croustillant minute, banane fondante, chocolat noir et pointe de sucre vanillé.',
    },
    {
      name: 'Perles de coco maison',
      price: '6€',
      description:
        'Bouchées moelleuses à la noix de coco, cœur doux et finition légèrement toastée.',
    },
    {
      name: 'Ananas rôti au gingembre',
      price: '8€',
      description:
        'Ananas caramélisé, sirop gingembre-citron vert et éclats croquants.',
    },
    {
      name: 'Beignets sucrés du marché',
      price: '6€',
      description:
        'Petits beignets tièdes servis avec sucre fin et parfum subtil de fleur d’oranger.',
    },
  ],
  boissons: [
    {
      name: 'Bissap glacé',
      price: '5€',
      description:
        'Infusion d’hibiscus, menthe fraîche et agrumes, servie bien froide.',
    },
    {
      name: 'Gingembre maison',
      price: '5€',
      description:
        'Boisson fraîche au gingembre pressé, citron et juste ce qu’il faut de sucre.',
    },
    {
      name: 'Jus de bouye',
      price: '6€',
      description:
        'Texture veloutée et saveur fruitée du baobab, signature douce et réconfortante.',
    },
    {
      name: 'Bulles du moment',
      price: '7€',
      description:
        'Sélection pétillante maison selon la saison, légère et festive.',
    },
  ],
};

export default function Dishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('plats');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const introItems = introRef.current?.querySelectorAll('.menu-intro-item');
      if (introItems && introItems.length > 0) {
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
      if (shellItems && shellItems.length > 0) {
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

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const ctx = gsap.context(() => {
      const dishItems = menuRef.current?.querySelectorAll('.dish-item');
      if (!dishItems || dishItems.length === 0) return;

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

    return () => ctx.revert();
  }, [activeCategory]);

  const activeItems = menuByCategory[activeCategory];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="bg-warm-cream px-6 py-24 md:px-10 md:py-28 lg:px-20 lg:py-32"
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
              Du feu, du <span className="italic">sucre</span>, et des bulles
              <span className="block">maison.</span>
            </h2>
          </div>

          <p className="menu-intro-item max-w-[480px] pt-1 font-body text-[14px] leading-[1.7] text-charcoal/78 xl:ml-auto xl:pt-24">
            Une carte courte, vibrante, que nous renouvelons au fil des saisons et des
            envies. Pour les groupes et événements, des menus sur mesure sont
            disponibles sur demande.
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
                    isActive
                      ? 'text-bordeaux'
                      : 'text-charcoal/65 hover:text-bordeaux'
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
          {activeItems.map((item) => (
            <article
              key={`${activeCategory}-${item.name}`}
              className="dish-item border-b border-[#ddd0be] py-8 first:pt-10 xl:py-10"
            >
              <div className="flex items-center gap-4">
                <h3 className="shrink-0 font-display text-[20px] font-normal leading-[1.08] text-bordeaux md:text-[23px]">
                  {item.name}
                </h3>
                <span className="mt-1 h-px flex-1 border-b border-dotted border-[#ddcdb7]" />
                <span className="shrink-0 font-display text-[17px] font-normal leading-none text-bordeaux md:text-[19px]">
                  {item.price}
                </span>
              </div>

              <p className="mt-4 max-w-[42rem] font-body text-[14px] leading-[1.7] text-charcoal/76 md:pr-6 md:text-[15px]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
