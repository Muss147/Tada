"use client";

import Image from "next/image";
import { useI18n } from "../locales/client";

export function PartnersSection() {
  const t = useI18n();

  return (
    <section className="py-10 lg:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-center text-gray-600 text-base lg:text-lg mb-6 lg:mb-8">
          {t("common.partnersTitle")}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <Image
            src="/images/cocacola.png"
            alt="Coca-Cola"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/pepsico.png"
            alt="PepsiCo"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/unicef.png"
            alt="UNICEF"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/mckinsey.png"
            alt="McKinsey"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/toyota.png"
            alt="Toyota"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/glovo.png"
            alt="Glovo"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
          <Image
            src="/images/bcg-31.png"
            alt="BCG"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
        </div>
      </div>
    </section>
  );
}
