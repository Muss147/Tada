"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@tada/ui/components/button";
import { Input } from "@tada/ui/components/input";
import { Label } from "@tada/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tada/ui/components/select";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface UserFormProps {
  mode: "create" | "edit";
  initialData?: {
    id?: string;
    email: string;
    name: string;
    role: string;
    position?: string | null;
    country?: string | null;
    sector?: string | null;
    job?: string | null;
    location?: string | null;
    kyc_status?: string | null;
    banned?: boolean | null;
  };
}

export function UserForm({ mode, initialData }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    name: initialData?.name || "",
    role: initialData?.role || "contributor",
    position: initialData?.position || "",
    country: initialData?.country || "",
    sector: initialData?.sector || "",
    job: initialData?.job || "",
    location: initialData?.location || "",
    kyc_status: initialData?.kyc_status || "",
    banned: initialData?.banned || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = mode === "create" ? "/api/users" : `/api/users/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      // Nettoyer les champs vides
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          mode === "create"
            ? "Utilisateur créé avec succès"
            : "Utilisateur mis à jour avec succès"
        );
        router.push("/users");
        router.refresh();
      } else {
        toast.error(result.error || "Une erreur est survenue");
        if (result.errors) {
          result.errors.forEach((error: string) => toast.error(error));
        }
      }
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations de base */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Informations de base
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nom complet <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="jean.dupont@example.com"
              required
              disabled={mode === "edit"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">
              Rôle <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contributor">Contributeur</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kyc_status">Statut KYC</Label>
            <Select
              value={formData.kyc_status}
              onValueChange={(value) => handleChange("kyc_status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Non défini</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Complété</SelectItem>
                <SelectItem value="canceled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Informations professionnelles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Informations professionnelles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              placeholder="Développeur Senior"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">Métier</Label>
            <Input
              id="job"
              value={formData.job}
              onChange={(e) => handleChange("job", e.target.value)}
              placeholder="Ingénieur Logiciel"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">Secteur d'activité</Label>
          <Input
            id="sector"
            value={formData.sector}
            onChange={(e) => handleChange("sector", e.target.value)}
            placeholder="Technologie, Finance, Marketing..."
          />
        </div>
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Localisation</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="France"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ville</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Paris"
            />
          </div>
        </div>
      </div>

      {/* Statut */}
      {mode === "edit" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Statut</h3>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="banned"
              checked={formData.banned}
              onChange={(e) => handleChange("banned", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="banned" className="font-normal cursor-pointer">
              Bannir cet utilisateur
            </Label>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Créer l'utilisateur" : "Enregistrer les modifications"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
