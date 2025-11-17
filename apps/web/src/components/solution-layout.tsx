import React from "react";
import { Solution } from "./solutions/data";
import DynamicHero from "./solutions/dynamic-hero";
import DynamicTrustedBy from "@/components/solution-trusted-by";
import DynamicFeatures from "./solutions/dynamic-features";
import DynamicZigZag from "./solutions/dynamic-zig-zag";
/* import DynamicHowItWorks from "./solutions/dynamic-how-it-works"; */
import DynamicUseCases from "./solutions/dynamic-use-cases";
/* import DynamicTestimonials from "./solutions/dynamic-testimonials"; */
import DynamicQuestions from "./solutions/dynamic-questions";
import DynamicMore from "./solutions/dynamic-more";
import DynamicCTA from "./solutions/dynamic-cta";
import DynamicAccordion from "./solutions/dynamic-accordion";
import { strict } from "assert";

interface SolutionLayoutProps {
  solution: Solution;
  family?: string;
}

const SolutionLayout: React.FC<SolutionLayoutProps> = ({ solution, family }) => {
  return (
    <div className="min-h-screen bg-white space-y-8">
      <DynamicHero data={solution.hero} />
      <DynamicTrustedBy />
      <DynamicFeatures data={solution.features} />
      {/*  <DynamicHowItWorks data={solution.howItWorks} /> */}
      <DynamicZigZag data={solution.zigZag} />
      <DynamicUseCases data={solution.useCases} />
      {/*  <DynamicTestimonials data={solution.testimonials} /> */}
      <DynamicQuestions data={solution.questions} />
      <DynamicAccordion data={solution.accordion} />
      <DynamicMore title={solution.title} category={solution.category} family={family} />
      <DynamicCTA data={solution.cta} />
    </div>
  );
};

export default SolutionLayout;
