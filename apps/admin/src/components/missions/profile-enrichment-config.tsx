"use client";

import { useState } from "react";
import { Button } from "@tada/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tada/ui/components/card";
import { Checkbox } from "@tada/ui/components/checkbox";
import { Label } from "@tada/ui/components/label";
import { Badge } from "@tada/ui/components/badge";
import { ScrollArea } from "@tada/ui/components/scroll-area";
import { Separator } from "@tada/ui/components/separator";
import { Info, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@tada/ui/components/tooltip";

interface ProfileEnrichmentConfigProps {
  onAttributesSelected?: (attributes: string[]) => void;
  selectedAttributes?: string[];
}

// Attributs disponibles pour l'enrichissement
const ENRICHMENT_ATTRIBUTES = [
  {
    category: "Professionnel",
    color: "bg-purple-100 text-purple-800",
    attributes: [
      {
        id: "professional_skills",
        name: "Compétences professionnelles",
        description: "Compétences techniques et professionnelles du contributeur",
        examples: ["Développement web", "Marketing digital", "Gestion de projet"],
      },
      {
        id: "job_sector",
        name: "Secteur d'activité",
        description: "Domaine professionnel principal",
        examples: ["Technologie", "Santé", "Finance"],
      },
      {
        id: "work_experience",
        name: "Années d'expérience",
        description: "Nombre d'années d'expérience professionnelle",
        examples: ["0-2 ans", "3-5 ans", "5+ ans"],
      },
    ],
  },
  {
    category: "Intérêts & Passions",
    color: "bg-pink-100 text-pink-800",
    attributes: [
      {
        id: "interests",
        name: "Centres d'intérêt",
        description: "Hobbies et passions personnelles",
        examples: ["Sport", "Lecture", "Voyages"],
      },
      {
        id: "hobbies",
        name: "Activités de loisirs",
        description: "Activités pratiquées régulièrement",
        examples: ["Photographie", "Cuisine", "Musique"],
      },
    ],
  },
  {
    category: "Technique & Équipement",
    color: "bg-orange-100 text-orange-800",
    attributes: [
      {
        id: "equipment",
        name: "Équipement disponible",
        description: "Matériel et équipements possédés",
        examples: ["Smartphone", "Ordinateur", "Appareil photo"],
      },
      {
        id: "software_skills",
        name: "Compétences logicielles",
        description: "Logiciels et outils maîtrisés",
        examples: ["Microsoft Office", "Adobe Suite", "Outils de design"],
      },
    ],
  },
  {
    category: "Disponibilité",
    color: "bg-yellow-100 text-yellow-800",
    attributes: [
      {
        id: "availability",
        name: "Disponibilités",
        description: "Créneaux horaires disponibles",
        examples: ["Matin", "Après-midi", "Soir", "Week-end"],
      },
      {
        id: "preferred_mission_duration",
        name: "Durée de mission préférée",
        description: "Durée idéale pour les missions",
        examples: ["Courte (< 1h)", "Moyenne (1-3h)", "Longue (> 3h)"],
      },
      {
        id: "participation_frequency",
        name: "Fréquence de participation",
        description: "Fréquence souhaitée pour participer aux missions",
        examples: ["Quotidienne", "Hebdomadaire", "Mensuelle"],
      },
    ],
  },
  {
    category: "Expérience & Préférences",
    color: "bg-green-100 text-green-800",
    attributes: [
      {
        id: "research_experience",
        name: "Expérience en recherche",
        description: "Expérience dans les études et recherches",
        examples: ["Débutant", "Intermédiaire", "Expert"],
      },
      {
        id: "mission_preferences",
        name: "Types de missions préférées",
        description: "Types de missions favorites",
        examples: ["Enquêtes", "Tests produits", "Interviews"],
      },
    ],
  },
];

export function ProfileEnrichmentConfig({
  onAttributesSelected,
  selectedAttributes = [],
}: ProfileEnrichmentConfigProps) {
  const [selected, setSelected] = useState<string[]>(selectedAttributes);

  const handleToggle = (attributeId: string) => {
    const newSelected = selected.includes(attributeId)
      ? selected.filter((id) => id !== attributeId)
      : [...selected, attributeId];
    
    setSelected(newSelected);
    onAttributesSelected?.(newSelected);
  };

  const handleSelectAll = (categoryAttributes: any[]) => {
    const categoryIds = categoryAttributes.map((attr) => attr.id);
    const allSelected = categoryIds.every((id) => selected.includes(id));
    
    const newSelected = allSelected
      ? selected.filter((id) => !categoryIds.includes(id))
      : [...new Set([...selected, ...categoryIds])];
    
    setSelected(newSelected);
    onAttributesSelected?.(newSelected);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Configuration de l'enrichissement de profil</CardTitle>
            <CardDescription>
              Sélectionnez les attributs que cette mission collectera pour enrichir les profils des contributeurs
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {selected.length} attributs sélectionnés
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Info box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Mission d'enrichissement de profil</p>
              <p>
                Les données collectées via cette mission seront automatiquement ajoutées aux profils des contributeurs
                et pourront être utilisées comme filtres d'audience pour les futures missions.
              </p>
            </div>
          </div>

          {/* Attributs par catégorie */}
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {ENRICHMENT_ATTRIBUTES.map((category) => {
                const categorySelected = category.attributes.filter((attr) =>
                  selected.includes(attr.id)
                ).length;
                const allCategorySelected =
                  categorySelected === category.attributes.length;

                return (
                  <div key={category.category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={category.color} variant="secondary">
                          {category.category}
                        </Badge>
                        {categorySelected > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {categorySelected}/{category.attributes.length} sélectionnés
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAll(category.attributes)}
                      >
                        {allCategorySelected ? "Tout désélectionner" : "Tout sélectionner"}
                      </Button>
                    </div>

                    <div className="grid gap-3">
                      {category.attributes.map((attribute) => {
                        const isSelected = selected.includes(attribute.id);
                        return (
                          <div
                            key={attribute.id}
                            className={`flex items-start gap-3 p-4 border rounded-lg transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-primary/5 border-primary"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => handleToggle(attribute.id)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleToggle(attribute.id)}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <Label className="font-medium cursor-pointer">
                                  {attribute.name}
                                </Label>
                                {isSelected && (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {attribute.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {attribute.examples.map((example, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {example}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Cet attribut sera collecté et ajouté au profil du contributeur.
                                    Il pourra ensuite être utilisé comme filtre d'audience.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        );
                      })}
                    </div>

                    {category !== ENRICHMENT_ATTRIBUTES[ENRICHMENT_ATTRIBUTES.length - 1] && (
                      <Separator className="my-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Résumé */}
          {selected.length > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Attributs sélectionnés :</h4>
              <div className="flex flex-wrap gap-2">
                {selected.map((id) => {
                  const attribute = ENRICHMENT_ATTRIBUTES.flatMap(
                    (cat) => cat.attributes
                  ).find((attr) => attr.id === id);
                  return (
                    <Badge key={id} variant="secondary">
                      {attribute?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileEnrichmentConfig;
