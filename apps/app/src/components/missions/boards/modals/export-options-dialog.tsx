"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@tada/ui/components/dialog";
import { Button } from "@tada/ui/components/button";
import { cn } from "@tada/ui/lib/utils";
import { X } from "lucide-react";

type ExportFormat = "ppt" | "excel" | "csv" | "spss";

interface ExportOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportOptionsDialog({
  open,
  onOpenChange,
}: ExportOptionsDialogProps) {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>("ppt");
  const [csvDelimiter, setCsvDelimiter] = useState<";" | ",">(";");

  const handleDownload = () => {
    // TODO: brancher ici ton API / génération de fichier
    // en fonction de activeFormat (+ csvDelimiter éventuellement)
    console.log("Download", { activeFormat, csvDelimiter });
  };

  const label = (() => {
    switch (activeFormat) {
      case "ppt":
        return "Download standard PPT";
      case "excel":
        return "Download Excel";
      case "csv":
        return "Download CSV";
      case "spss":
        return "Download SPSS";
      default:
        return "Download";
    }
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Colonne gauche : formats */}
          <div className="w-48 border-r border-slate-200 bg-slate-50">
            <div className="px-6 py-4 border-b border-slate-200">
              <p className="font-semibold text-slate-900 text-[15px]">
                Export options
              </p>
            </div>

            <nav className="flex flex-col p-2 gap-1">
              <FormatNavItem
                label="PowerPoint"
                format="ppt"
                icon="ppt"
                active={activeFormat === "ppt"}
                onClick={() => setActiveFormat("ppt")}
              />
              <FormatNavItem
                label="Excel"
                format="excel"
                icon="excel"
                active={activeFormat === "excel"}
                onClick={() => setActiveFormat("excel")}
              />
              <FormatNavItem
                label="CSV"
                format="csv"
                icon="csv"
                active={activeFormat === "csv"}
                onClick={() => setActiveFormat("csv")}
              />
              <FormatNavItem
                label="SPSS"
                format="spss"
                icon="spss"
                active={activeFormat === "spss"}
                onClick={() => setActiveFormat("spss")}
              />
            </nav>
          </div>

          {/* Colonne droite : contenu */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-[15px] font-semibold">
                  {getRightTitle(activeFormat)}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  {getRightDescription(activeFormat)}
                </DialogDescription>
              </DialogHeader>

              <DialogClose asChild>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </DialogClose>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
              {activeFormat === "csv" && (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <p className="text-sm font-medium text-slate-900">
                    Delimiter format
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="csv-delimiter"
                        value=";"
                        checked={csvDelimiter === ";"}
                        onChange={() => setCsvDelimiter(";")}
                      />
                      <span>Use EU delimiter format (;)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="csv-delimiter"
                        value=","
                        checked={csvDelimiter === ","}
                        onChange={() => setCsvDelimiter(",")}
                      />
                      <span>Use US/UK delimiter format (,)</span>
                    </label>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Including filters &amp; splits
                  </p>
                </div>
              )}

              {/* Placeholder pour d’autres options éventuelles */}
              {activeFormat === "ppt" && (
                <p className="text-sm text-slate-500">
                  Download the entire survey with all questions in their current
                  views. This includes applied filters and splits.
                </p>
              )}

              {activeFormat === "excel" && (
                <p className="text-sm text-slate-500">
                  Export all survey data as an Excel workbook, structured by
                  questions and responses.
                </p>
              )}

              {activeFormat === "spss" && (
                <p className="text-sm text-slate-500">
                  Export a dataset compatible with SPSS for advanced statistical
                  analysis.
                </p>
              )}

              <div className="mt-auto flex justify-end gap-3 pt-4">
                {activeFormat === "csv" && (
                  <Button variant="outline" size="sm">
                    Download codebook
                  </Button>
                )}
                <Button size="sm" onClick={handleDownload}>
                  {label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FormatNavItemProps {
  label: string;
  format: ExportFormat;
  icon: "ppt" | "excel" | "csv" | "spss";
  active: boolean;
  onClick: () => void;
}

function FormatNavItem({ label, active, onClick }: FormatNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        "transition-colors",
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      {/* Tu peux mettre de vraies icônes de fichier ici si tu veux */}
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700">
        {label[0]}
      </span>
      <span>{label}</span>
    </button>
  );
}

function getRightTitle(format: ExportFormat) {
  switch (format) {
    case "ppt":
      return "Standard PPT";
    case "excel":
      return "Excel export";
    case "csv":
      return "CSV export";
    case "spss":
      return "SPSS export";
  }
}

function getRightDescription(format: ExportFormat) {
  switch (format) {
    case "ppt":
      return "Download the entire survey with all questions in their current views.";
    case "excel":
      return "Export the dataset as an Excel file, ready for analysis.";
    case "csv":
      return "Exports the raw survey data as a CSV file.";
    case "spss":
      return "Exports the survey data as an SPSS-compatible file.";
  }
}
