import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@tada/ui/components/button";
import Link from "next/link";

interface CTAData {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLink?: string;
}

interface DynamicCTAProps {
  data: CTAData;
}

const DynamicCTA: React.FC<DynamicCTAProps> = ({ data }) => {
  return (
    <section className="py-16 sm:py-24 bg-primary text-white mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{data.title}</h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          {data.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            asChild
            className="flex items-center justify-center group"
          >
            <Link href={data.ctaPrimaryLink ?? "#"}>
              {data.primaryButton}{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {data.secondaryButton && (
            <Button
              variant="outline"
              asChild
              className="flex items-center justify-center group"
            >
              <Link href={data.ctaSecondaryLink ?? "#"} className="text-black">
                {data.secondaryButton}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicCTA;
