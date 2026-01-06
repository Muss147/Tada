"use client";

import { useBoolean } from "@/hooks/use-boolean";
import { useI18n } from "@/locales/client";
import { Button } from "@tada/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { CreateSurveyModal } from "./modals/create-mission-modal";

// 1. Définir l'interface des props
interface MissionFilterProps {
  isValidatedList?: boolean;
}

// 2. Accepter la prop dans la fonction
export function MissionFilter({ isValidatedList = true }: MissionFilterProps) {
  const t = useI18n();

  const [params, setParams] = useQueryStates(
    {
      status: parseAsString.withDefault("all"),
    },
    {
      shallow: false,
    }
  );

  return (
    <div className="flex items-center justify-between p-4 pb-3 ">
      <div className="flex items-center">
        {/* 3. Conditionner l'affichage ici */}
        {isValidatedList && (
          <CreateSurveyModal
            trigger={
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                {t("missions.filter.add")}
              </Button>
            }
          />
        )}
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-500">
          {t("missions.filter.title")}
        </span>
        <div className="w-44">
          <Select
            value={params.status}
            onValueChange={(value) => setParams({ status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("missions.status.all")}</SelectItem>
              <SelectItem value="live">{t("missions.status.live")}</SelectItem>
              <SelectItem value="on hold">
                {t("missions.status.on_hold")}
              </SelectItem>
              <SelectItem value="complete">
                {t("missions.status.complete")}
              </SelectItem>
              <SelectItem value="draft">
                {t("missions.status.draft")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
