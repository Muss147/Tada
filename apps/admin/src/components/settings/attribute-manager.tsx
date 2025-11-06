"use client";

import { useState } from "react";
import { Button } from "@tada/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@tada/ui/components/dialog";
import { Input } from "@tada/ui/components/input";
import { Label } from "@tada/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { Textarea } from "@tada/ui/components/textarea";
import { Switch } from "@tada/ui/components/switch";
import { Badge } from "@tada/ui/components/badge";
import { X } from "lucide-react";

interface AttributeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  attribute?: any;
}

export function AttributeManager({
  isOpen,
  onClose,
  attribute,
}: AttributeManagerProps) {
  const [formData, setFormData] = useState({
    name: attribute?.name || "",
    key: attribute?.key || "",
    type: attribute?.type || "text",
    category: attribute?.category || "demographics",
    description: attribute?.description || "",
    required: attribute?.required || false,
    enrichmentOnly: attribute?.enrichmentOnly || false,
    options: attribute?.options || [],
  });

  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim()) {
      setFormData({
        ...formData,
        options: [...formData.options, newOption.trim()],
      });
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_: any, i: number) => i !== index),
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = attribute
        ? `/api/audience-attributes/${attribute.id}`
        : "/api/audience-attributes";
      
      const method = attribute ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save attribute");
      }

      // Succès - fermer le modal (le parent rechargera les données)
      onClose();
    } catch (err) {
      console.error("Error saving attribute:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {attribute ? "Modifier l'attribut" : "Créer un nouvel attribut"}
          </DialogTitle>
          <DialogDescription>
            Définissez les propriétés de l'attribut pour filtrer et enrichir les profils
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'attribut *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Compétences professionnelles"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="key">Clé technique *</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value })
                  }
                  placeholder="Ex: professional_skills"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Utilisé dans le code (snake_case)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de données *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texte</SelectItem>
                    <SelectItem value="number">Nombre</SelectItem>
                    <SelectItem value="select">Liste déroulante</SelectItem>
                    <SelectItem value="multiselect">Sélection multiple</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="boolean">Oui/Non</SelectItem>
                    <SelectItem value="range">Plage de valeurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demographics">Démographiques</SelectItem>
                    <SelectItem value="profile">Profil général</SelectItem>
                    <SelectItem value="professional">Professionnel</SelectItem>
                    <SelectItem value="interests">Intérêts & Passions</SelectItem>
                    <SelectItem value="technical">Technique & Équipement</SelectItem>
                    <SelectItem value="availability">Disponibilité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Décrivez à quoi sert cet attribut..."
                rows={3}
              />
            </div>
          </div>

          {/* Options pour select/multiselect */}
          {(formData.type === "select" || formData.type === "multiselect") && (
            <div className="space-y-4 border-t pt-4">
              <Label>Options disponibles</Label>
              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Ajouter une option..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddOption}>
                  Ajouter
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.options.map((option: string, index: number) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {option}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Paramètres avancés */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Paramètres avancés</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="required">Champ obligatoire</Label>
                <p className="text-sm text-muted-foreground">
                  Les contributeurs doivent remplir ce champ
                </p>
              </div>
              <Switch
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, required: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enrichmentOnly">Enrichissement uniquement</Label>
                <p className="text-sm text-muted-foreground">
                  Collecté via missions d'enrichissement de profil
                </p>
              </div>
              <Switch
                id="enrichmentOnly"
                checked={formData.enrichmentOnly}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enrichmentOnly: checked })
                }
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : attribute ? "Mettre à jour" : "Créer l'attribut"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AttributeManager;
