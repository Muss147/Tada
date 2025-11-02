"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../locales/client";

export function CTASection() {
  const t = useI18n();

  return (
    <section className="pt-4 lg:pt-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center">
          {/* Text Block */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-sora font-semibold text-[#282828]">
                {t("common.ctaTitle1")}
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-sora font-semibold text-[#282828]">
                {t("common.ctaTitle2")}
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-sora font-semibold text-[#282828]">
                {t("common.ctaTitle3")}
              </h2>
            </div>
            <p className="text-base font-light lg:text-lg text-gray-600">
              {t("common.ctaDescription")}
            </p>
            <div className="flex flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
              <Link
                href="https://testflight.apple.com/join/NU6pMECN"
                target="_blank"
              >
                <Image
                  src="/icons/apple.svg"
                  alt={t("common.downloadApple")}
                  height={40}
                  width={135}
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.tada-contributors.app"
                target="_blank"
              >
                <Image
                  src="/icons/android.svg"
                  alt={t("common.downloadAndroid")}
                  height={40}
                  width={150}
                />
              </Link>
            </div>
          </div>

          {/* Image Block */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto px-4 lg:px-0">
            <Image
              src="/images/mobile-app.png"
              alt="Tada Mobile App"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
