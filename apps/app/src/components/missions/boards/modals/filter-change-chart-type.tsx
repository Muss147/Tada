"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@tada/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@tada/ui/components/dialog";
import { Label } from "@tada/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { Switch } from "@tada/ui/components/switch";
import { useQueryState } from "nuqs";
import { ALL_VISUALIZATIONS, type VisualizationId } from "@/lib/chart-types";

interface FilterChangeChartTypeProps {
  getQuestionConfig?: (questionId: string) =>
    | {
        allowed_chart: VisualizationId[];
        currentChartType: VisualizationId;
      }
    | undefined;
  onApply?: (params: {
    questionId: string;
    filter: string;
    chartType: VisualizationId;
    isSorted: boolean;
  }) => void;
}

export default function FilterChangeChartType({
  getQuestionConfig,
  onApply,
}: FilterChangeChartTypeProps) {
  const [questionId, setQuestionId] = useQueryState("questionId", {
    defaultValue: "",
  });

  const [filter, setFilter] = useState<string>("standard");
  const [chartType, setChartType] = useState<VisualizationId>("bar");
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const isOpen = Boolean(questionId);

  const config = useMemo(() => {
    if (!questionId || !getQuestionConfig) return undefined;
    return getQuestionConfig(questionId);
  }, [questionId, getQuestionConfig]);

  // Liste des viz affichées dans le Select : allowed_chart → objets complets
  const availableVisualizations = useMemo(() => {
    if (!config || !config.allowed_chart || config.allowed_chart.length === 0) {
      return ALL_VISUALIZATIONS;
    }

    return ALL_VISUALIZATIONS.filter((viz) =>
      config.allowed_chart.includes(viz.id)
    );
  }, [config]);

  // Quand on ouvre / change de question → synchro le chartType
  useEffect(() => {
    if (!config) return;

    const { currentChartType, allowed_chart } = config;

    // si le type courant est dans la liste autorisée → on garde
    if (allowed_chart?.includes(currentChartType)) {
      setChartType(currentChartType);
      return;
    }

    // sinon on prend le premier autorisé si dispo
    if (allowed_chart && allowed_chart.length > 0) {
      setChartType(allowed_chart[0]);
      return;
    }

    // fallback global
    setChartType("bar");
  }, [config]);

  const onClose = () => {
    setQuestionId("");
  };

  const handleApplyClick = () => {
    if (!questionId || !onApply) {
      onClose();
      return;
    }

    onApply({
      questionId,
      filter,
      chartType,
      isSorted,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Modifier la visualisation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filtre */}
          <div className="flex flex-col gap-2">
            <Label>Filtre</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un filtre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="age">Âge</SelectItem>
                <SelectItem value="gender">Genre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type de visualisation (restreint à allowed_chart) */}
          <div className="flex flex-col gap-2">
            <Label>Visualisation</Label>
            <Select
              value={chartType}
              onValueChange={(v) => setChartType(v as VisualizationId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type de graphique" />
              </SelectTrigger>
              <SelectContent>
                {availableVisualizations.map((viz) => (
                  <SelectItem key={viz.id} value={viz.id}>
                    {viz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <Switch
              id="is_sorted"
              checked={isSorted}
              onCheckedChange={setIsSorted}
            />
            <Label htmlFor="is_sorted">Ordonner les réponses</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleApplyClick} disabled={!questionId}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
