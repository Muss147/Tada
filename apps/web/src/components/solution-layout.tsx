import React from "react";
import { Solution } from "./solutions/data";
import DynamicHero from "./solutions/dynamic-hero";
import DynamicFeatures from "./solutions/dynamic-features";
/* import DynamicHowItWorks from "./solutions/dynamic-how-it-works"; */
import DynamicUseCases from "./solutions/dynamic-use-cases";
/* import DynamicTestimonials from "./solutions/dynamic-testimonials"; */
import DynamicCTA from "./solutions/dynamic-cta";

interface SolutionLayoutProps {
  solution: Solution;
}

const SolutionLayout: React.FC<SolutionLayoutProps> = ({ solution }) => {
  return (
    <div className="min-h-screen bg-white">
      <DynamicHero data={solution.hero} />
      <DynamicFeatures data={solution.features} />
      {/*  <DynamicHowItWorks data={solution.howItWorks} /> */}
      <DynamicUseCases data={solution.useCases} />
      {/*  <DynamicTestimonials data={solution.testimonials} /> */}
      <DynamicCTA data={solution.cta} />
    </div>
  );
};

export default SolutionLayout;
