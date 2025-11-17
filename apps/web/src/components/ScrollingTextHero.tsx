"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@tada/ui/components/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales/client";

export default function ScrollingTextHero() {
  const [index, setIndex] = useState(0);
  const t = useI18n();

  const texts = [
    t("home.hero.scrollTexts.one"),
    t("home.hero.scrollTexts.two"),
    t("home.hero.scrollTexts.three"),
    t("home.hero.scrollTexts.four"),
    t("home.hero.scrollTexts.five"),
    t("home.hero.scrollTexts.six"),
    t("home.hero.scrollTexts.seven"),
    t("home.hero.scrollTexts.eight"),
    t("home.hero.scrollTexts.nine"),
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6">
        <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start text-white text-center md:text-left">
          <p className="text-2xl md:text-3xl font-light flex-shrink-0">{t("home.hero.prefix")}</p>

          {/* Zone de texte animée */}
          <div className="relative h-[50px] sm:h-[150px] overflow-hidden w-full min-w-[600px] sm:min-w-[400px] flex items-center justify-center sm:justify-start sm:ps-8">
            {texts.map((text, i) => {
              const offset = (i - index + texts.length) % texts.length;

              // calcul de la position verticale
              let y = 0;
              let opacity = 1;
              let scale = 1;

              if (offset === 0) {
                y = 0;
                opacity = 1;
                scale = 1.1;
              } else if (offset === 1 || offset === texts.length - 1) {
                y = offset === 1 ? 40 : -40;
                opacity = 0.3;
                scale = 0.9;
              } else {
                y = offset < texts.length / 2 ? -80 : 80;
                opacity = 0;
              }

              return (
                <motion.p
                  key={text}
                  animate={{ y, opacity, scale }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute md:text-2xl font-semibold leading-tight"
                  style={{
                    filter: opacity < 1 ? "blur(1.2px)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
        </div>

        {/* Bouton d’action */}
        <div className="mt-8 md:mt-0">
          <Button
            asChild
            className="flex items-center justify-center group"
          >
            <Link href="/book-a-demo">
              {t("home.hero.bookDemo")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}