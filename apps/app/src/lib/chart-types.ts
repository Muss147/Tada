// src/lib/chart-types.ts

export const ALL_VISUALIZATIONS = [
  { id: "bar",            label: "Barres horizontales" },
  { id: "column",         label: "Barres verticales" },
  { id: "stacked_bar",    label: "Barres empilées (horizontal)" },
  { id: "stacked_column", label: "Barres empilées (vertical)" },
  { id: "pie",            label: "Camembert" },
  { id: "table",          label: "Tableau" },
  { id: "turf",           label: "Radar / Turf" },
  //{ id: "chart",          label: "Courbe / Chart" },
] as const;

export type VisualizationId = (typeof ALL_VISUALIZATIONS)[number]["id"];

export function getVisualizationDef(id: VisualizationId) {
  return ALL_VISUALIZATIONS.find((v) => v.id === id)!;
}