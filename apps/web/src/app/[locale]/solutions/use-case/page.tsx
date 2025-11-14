import Image from "next/image";
import Link from "next/link";
import { generateMetadata } from "../../metadata";
import SolutionsFilter from "@/components/solutions-filter";
import { getI18n } from "@/locales/server";
import { Button } from "@tada/ui/components/button";
import {
  featuresByUseCase,
} from "@/components/solutions/data";

export const metadata = generateMetadata({
  title: "Solutions | Tada",
  description:
    "Discover Tada's data intelligence solutions that provide actionable insights for businesses and organizations across industries.",
});

export default async function SolutionsPage() {
  const t = await getI18n();
  const categoriesByUseCase = [
    t("solutions.categoriesByUseCase.all"),
    t("solutions.categoriesByUseCase.fmcg"),
    t("solutions.categoriesByUseCase.public"),
    t("solutions.categoriesByUseCase.consultancies"),
  ];
  return (
    <div className="flex flex-col">
      {/* Solutions Overview */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-rational-bold leading-tight mb-6">
              {t("solutions.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 ">
              {t("solutions.subtitle")}
            </p>
            <Link
              href="/schedule-a-demo"
              className="btn-primary bg-premise-blue text-white px-8 py-3 rounded-md font-rational-medium hover:bg-blue-700 transition-colors"
            >
              {t("solutions.cta.title")}
            </Link>
          </div>
          <h2 className="text-2xl md:text-3xl font-rational-bold mb-12 text-center">
            {t("solutions.menu.title")}
          </h2>

          <SolutionsFilter
            features={featuresByUseCase}
            categories={categoriesByUseCase}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t("pricing.ready_to_unlock_real_world_insights")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t(
              "pricing.join_companies_ngos_and_startups_across_africa_who_trust_tada_for_ground_truth"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="" asChild>
              <Link href="/schedule-a-demo">{t("pricing.schedule_demo")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
