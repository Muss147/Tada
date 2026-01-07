"use client";

import { useChartBuilder } from "@/context/chart-builder-context";
import { VegaEmbed } from "react-vega";

export function ChartGraph() {
  const { vegaLiteSpec, data: values } = useChartBuilder();

  const customizedSpec = {
    ...vegaLiteSpec,
    background: "white",
    data: {
      values,
    },
    config: {
      ...((vegaLiteSpec as any)?.config || {}),
      axis: {
        grid: false,
      },
      axisY: {
        grid: false,
      },
      view: {
        fill: "white",
        stroke: "transparent",
      },
    },
  };

  return (
    <div className="w-full">
      <VegaEmbed
        spec={customizedSpec}
        options={{
          actions: false,
          renderer: "canvas",
          theme: "none",
        }}
      />
    </div>
  );
}