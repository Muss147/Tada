"use client";

import { useState } from "react";
import { Button } from "@tada/ui/components/button";
import { Badge } from "@tada/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@tada/ui/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tada/ui/components/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { AttributeManager } from "./attribute-manager";

// Données de démonstration
const DEMO_ATTRIBUTES = [
  {
    id: "1",
    name: "Compétences professionnelles",
    key: "professional_skills",
    type: "multiselect",
    category: "professional",
    required: false,
    enrichmentOnly: true,
    usageCount: 45,
  },
  {
    id: "2",
    name: "Secteur d'activité",
    key: "job_sector",
    type: "select",
    category: "professional",
    required: false,
    enrichmentOnly: false,
    usageCount: 120,
  },
  {
    id: "3",
    name: "Centres d'intérêt",
    key: "interests",
    type: "multiselect",
    category: "interests",
    required: false,
    enrichmentOnly: true,
    usageCount: 89,
  },
  {
    id: "4",
    name: "Équipement disponible",
    key: "equipment",
    type: "multiselect",
    category: "technical",
    required: false,
    enrichmentOnly: false,
    usageCount: 67,
  },
  {
    id: "5",
    name: "Langues parlées",
    key: "languages",
    type: "multiselect",
    category: "technical",
    required: true,
    enrichmentOnly: false,
    usageCount: 234,
  },
];

const TYPE_LABELS: Record<string, string> = {
  text: "Texte",
  number: "Nombre",
  select: "Liste",
  multiselect: "Multi-sélection",
  date: "Date",
  boolean: "Oui/Non",
  range: "Plage",
};

const CATEGORY_LABELS: Record<string, string> = {
  demographics: "Démographiques",
  profile: "Profil",
  professional: "Professionnel",
  interests: "Intérêts",
  technical: "Technique",
  availability: "Disponibilité",
};

const CATEGORY_COLORS: Record<string, string> = {
  demographics: "bg-blue-100 text-blue-800",
  profile: "bg-green-100 text-green-800",
  professional: "bg-purple-100 text-purple-800",
  interests: "bg-pink-100 text-pink-800",
  technical: "bg-orange-100 text-orange-800",
  availability: "bg-yellow-100 text-yellow-800",
};

export function AttributeList() {
  const [attributes, setAttributes] = useState(DEMO_ATTRIBUTES);
  const [selectedAttribute, setSelectedAttribute] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet attribut ?")) {
      setAttributes(attributes.filter((attr) => attr.id !== id));
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Clé technique</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Utilisations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell className="font-medium">{attribute.name}</TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {attribute.key}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {TYPE_LABELS[attribute.type]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={CATEGORY_COLORS[attribute.category]}
                    variant="secondary"
                  >
                    {CATEGORY_LABELS[attribute.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {attribute.required && (
                      <Badge variant="destructive" className="text-xs">
                        Obligatoire
                      </Badge>
                    )}
                    {attribute.enrichmentOnly && (
                      <Badge variant="secondary" className="text-xs">
                        Enrichissement
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {attribute.usageCount} missions
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(attribute)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(attribute.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal d'édition */}
      <AttributeManager
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAttribute(null);
        }}
        attribute={selectedAttribute}
      />
    </>
  );
}

export default AttributeList;
