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
import { Plus, Settings, Filter } from "lucide-react";
import { AttributeManager } from "@/components/settings/attribute-manager";
import { AttributeList } from "@/components/settings/attribute-list";

export default function AudienceAttributesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Attributs d'audience
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez les attributs personnalisés pour filtrer et enrichir les profils des contributeurs
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel attribut
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attributs actifs
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profils enrichis
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Sur 2,500 contributeurs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de complétion
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49.4%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des attributs */}
      <Card>
        <CardHeader>
          <CardTitle>Attributs configurés</CardTitle>
          <CardDescription>
            Gérez les attributs utilisés pour filtrer et enrichir les profils
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttributeList />
        </CardContent>
      </Card>

      {/* Modal de création/édition */}
      <AttributeManager
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
