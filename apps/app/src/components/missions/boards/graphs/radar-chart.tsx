"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tada/ui/components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { FC, useRef } from "react";
import { DataKey } from "recharts/types/util/types";
import { BarChartCardProps } from "./type";
import { CardHeaderChart } from "./ui/card-header";
import { useSetDocumentId, VeltComments } from "@veltdev/react";

export const RadarChartCard: FC<BarChartCardProps> = ({
  config,
  data,
  categoryKey = "month",
  primaryDataKey = "desktop",
  title,
  description,
  participationQuestions,
  subDashboardItemId,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useSetDocumentId(subDashboardItemId);

  return (
    <>
      <VeltComments />
      <Card ref={chartRef} className="mx-auto w-full px-4">
        <CardHeader className="flex flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <CardHeaderChart
              participationQuestions={participationQuestions}
              title=""
              chartRef={chartRef}
              subDashboardItemId={subDashboardItemId}
            />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <RadarChart data={data}>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelKey={categoryKey}
                  />
                }
              />
              <PolarGrid gridType="circle" />
              <PolarAngleAxis dataKey={categoryKey} />
              <Radar
                dataKey={primaryDataKey as DataKey<any>}
                fill={`var(--color-${primaryDataKey})`}
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
              <PolarRadiusAxis
                angle={60}
                stroke="hsla(var(--foreground))"
                orientation="middle"
                axisLine={false}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
