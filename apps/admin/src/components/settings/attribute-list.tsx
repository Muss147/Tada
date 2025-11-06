"use client";

import { useState, useEffect } from "react";
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

// Types
interface Attribute {
  id: string;
  name: string;
  key: string;
  type: string;
  category: string;
  required: boolean;
  enrichmentOnly: boolean;
  active: boolean;
  _count?: {
    values: number;
  };
}

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

interface AttributeListProps {
  onRefresh?: () => void;
}

export function AttributeList({ onRefresh }: AttributeListProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les attributs depuis l'API
  const fetchAttributes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/audience-attributes");
      
      if (!response.ok) {
        throw new Error("Failed to fetch attributes");
      }
      
      const data = await response.json();
      setAttributes(data);
      // Notifier le parent pour mettre à jour les statistiques
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Error fetching attributes:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les attributs au montage du composant
  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleEdit = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet attribut ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/audience-attributes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete attribute");
      }

      // Recharger la liste après suppression
      await fetchAttributes();
    } catch (err) {
      console.error("Error deleting attribute:", err);
      alert(err instanceof Error ? err.message : "Failed to delete attribute");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Chargement des attributs...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {!isLoading && !error && attributes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun attribut configuré</p>
          <p className="text-sm text-muted-foreground mt-2">
            Cliquez sur "Nouvel attribut" pour créer votre premier attribut
          </p>
        </div>
      )}

      {!isLoading && !error && attributes.length > 0 && (
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
                  {attribute._count?.values || 0} contributeurs
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
      )}

      {/* Modal d'édition */}
      <AttributeManager
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAttribute(null);
          // Recharger les attributs après fermeture du modal
          fetchAttributes();
        }}
        attribute={selectedAttribute}
      />
    </>
  );
}

export default AttributeList;
