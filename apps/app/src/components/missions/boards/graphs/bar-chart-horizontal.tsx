"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@tada/ui/components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { FC, useRef } from "react";
import { DataKey } from "recharts/types/util/types";
import { BarChartCardProps } from "./type";
import { CardHeaderChart } from "./ui/card-header";
import {
  useSetDocumentId,
  VeltComments,
  VeltCommentTool,
} from "@veltdev/react";

export const BarChartHorizontalCard: FC<BarChartCardProps> = ({
  config,
  data,
  categoryKey = "month",
  primaryDataKey = "desktop",
  title,
  description,
  participationQuestions,
  onDelete,
  isDeletable,
  subDashboardItemId,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useSetDocumentId(subDashboardItemId);

  return (
    <div data-velt-id={`item-${subDashboardItemId}`}>
      <VeltComments />
      <Card className="border-none mx-auto w-full px-4">
        <div className="py-3">
          <CardHeaderChart
            participationQuestions={participationQuestions}
            title={title}
            isDeletable={isDeletable}
            onDelete={onDelete}
            chartRef={chartRef}
            subDashboardItemId={subDashboardItemId}
          />

          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <CardContent className="pt-0 pb-3">
          <ChartContainer
            className="mx-auto aspect-square w-full max-h-[350px]"
            config={config}
            ref={chartRef}
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey={categoryKey}
                type="category"
                tickLine={false}
                tickMargin={2}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <XAxis dataKey={primaryDataKey} type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey={primaryDataKey as DataKey<any>}
                layout="vertical"
                fill={`var(--color-${primaryDataKey})`}
                radius={5}
                barSize={80}
              >
                <LabelList
                  dataKey={primaryDataKey}
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
