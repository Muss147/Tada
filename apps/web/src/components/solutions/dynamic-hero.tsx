"use client";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import React from "react";
import { Play, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@tada/ui/components/button";
import Link from "next/link";

interface HeroData {
  headline: string;        // <-- Ces valeurs sont maintenant des clés t()
  subheadline: string;
  image: string;
  benefits: string[];
  ctaPrimary: string;
  ctaPrimaryLink?: string;
  ctaSecondary: string;
  ctaSecondaryLink?: string;
}

interface DynamicHeroProps {
  data: HeroData;
}

const DynamicHero: React.FC<DynamicHeroProps> = ({ data }) => {
  const t = useI18n();

  return (
    <section className="relative bg-white pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="lg:col-span-6">

            {/* Headline */}
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
              {t(data.headline as any, {})
                .split("\n")
                .map((line, index) => (
                  <span
                    key={index}
                    className={index === 1 ? "text-blue-600 block" : "block"}
                  >
                    {line}
                  </span>
                ))}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {t(data.subheadline as any, {})}
            </p>

            {/* Key Benefits */}
            {data.benefits.length !== 0 && (
              <div className="mt-8 space-y-4">
                {data.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t(benefit as any, {})}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex items-center justify-center group"
              >
                <Link href={data.ctaPrimaryLink ?? "#"}>
                  {t(data.ctaPrimary as any, {})}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              {data.ctaSecondary && t(data.ctaSecondary as any, {}) !== data.ctaSecondary && (
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center justify-center group"
                >
                  <Link href={data.ctaSecondaryLink ?? "#"}>
                    {t(data.ctaSecondary as any, {})}
                    <Play className="mr-2 w-5 h-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <Image src={data.image} width={450} height={320} alt="" className="max-h-[320px] w-full h-auto object-cover"/>
            {/* <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">
                      Dashboard Overview
                    </h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded mr-3"></div>
                        <span className="text-sm font-medium">Product A</span>
                      </div>
                      <span className="text-green-600 font-semibold text-sm">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded mr-3"></div>
                        <span className="text-sm font-medium">Product B</span>
                      </div>
                      <span className="text-yellow-600 font-semibold text-sm">
                        Monitoring
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded mr-3"></div>
                        <span className="text-sm font-medium">Product C</span>
                      </div>
                      <span className="text-blue-600 font-semibold text-sm">
                        Tracked
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DynamicHero;