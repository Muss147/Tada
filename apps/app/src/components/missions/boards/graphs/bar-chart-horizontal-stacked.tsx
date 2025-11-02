"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tada/ui/components/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { FC, useRef } from "react";
import { DataKey } from "recharts/types/util/types";
import { BarChartCardProps } from "./type";
import { CardHeaderChart } from "./ui/card-header";
import {
  useSetDocumentId,
  VeltComments,
  VeltCommentTool,
} from "@veltdev/react";

export const BarChartHorizontalStackedCard: FC<
  Omit<BarChartCardProps, "primaryDataKey"> & {
    max?: number;
    min?: number;
    subDashboardItemId: string;
  }
> = ({
  config,
  data,
  categoryKey = "month",
  title,
  description,
  participationQuestions,
  primaryKeys,
  label = "key",
  max = 100,
  min = 0,
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
        <CardHeader>
          <CardHeaderChart
            participationQuestions={participationQuestions}
            title={title}
            onDelete={onDelete}
            isDeletable={isDeletable}
            chartRef={chartRef}
            subDashboardItemId={subDashboardItemId}
          />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <ChartContainer
            ref={chartRef}
            className="mx-auto aspect-square w-full max-h-[350px]"
            config={config}
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              barCategoryGap={0}
              maxBarSize={60}
            >
              <XAxis domain={[min, max]} type="number" hide />
              <YAxis
                dataKey={categoryKey}
                type="category"
                tickLine={false}
                tickMargin={2}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {primaryKeys?.map((key, index) => (
                <Bar
                  dataKey={key as DataKey<any>}
                  layout="vertical"
                  fill={`var(--color-${key})`}
                  key={key}
                  stackId="a"
                  barSize={80}
                  radius={
                    index === 0
                      ? [5, 0, 0, 5]
                      : index === primaryKeys.length - 1
                      ? [0, 5, 5, 0]
                      : 0
                  }
                >
                  {label === "value" ? (
                    <LabelList
                      dataKey={key as DataKey<any>}
                      position="insideLeft"
                      offset={8}
                      className="fill-[--color-label]"
                      fontSize={12}
                    />
                  ) : (
                    <LabelList
                      dataKey={key as DataKey<any>}
                      position="insideLeft"
                      offset={8}
                      className="fill-[--color-label]"
                      fontSize={12}
                      content={(value) => {
                        const { x, y, height } = value as {
                          x: number;
                          y: number;
                          height: number;
                        };
                        return (
                          <text
                            x={x! + 8}
                            y={y! + height! / 2}
                            textAnchor="start"
                            dominantBaseline="middle"
                            className="fill-[--color-label]"
                            fontSize={12}
                          >
                            {config[key]?.label || key}
                          </text>
                        );
                      }}
                    />
                  )}
                </Bar>
              ))}
              <ChartLegend
                content={<ChartLegendContent />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
