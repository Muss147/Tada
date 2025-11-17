// apps/web/src/components/DynamicTrustedBy.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const logos = [
  { src: "/images/cocacola.png", alt: "Coca-Cola" },
  { src: "/images/pepsico.png", alt: "Pepsico" },
  { src: "/images/unicef.png", alt: "Unicef" },
  { src: "/images/mckinsey.png", alt: "Mckinsey" },
  { src: "/images/toyota.png", alt: "Toyota" },
  { src: "/images/glovo.png", alt: "Glovo" },
  { src: "/images/bcg-31.png", alt: "BCG" },
];

export default function DynamicTrustedBy() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animation continue du scroll horizontal
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 2.5; // vitesse du défilement
    let animationFrame: number;

    const scroll = () => {
      container.scrollLeft += scrollStep;
      scrollAmount += scrollStep;

      // Réinitialise le scroll pour boucle infinie
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // On duplique les logos pour un effet de boucle fluide
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-white overflow-hidden mb-20 md:mb-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-10">
          Trusted by <span className="font-bold">3,000+</span> world industry leaders
          <br className="hidden md:block" /> to deliver the insights that matter
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-hidden whitespace-nowrap"
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 flex items-center w-40 md:w-48">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                className="object-contain w-full h-auto opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}