"use client";

import { useState, useEffect } from "react";
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
  const [stats, setStats] = useState({
    activeAttributes: 0,
    enrichedProfiles: 0,
    totalContributors: 0,
    completionRate: 0,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Charger les statistiques
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/audience-attributes");
        if (response.ok) {
          const attributes = await response.json();
          const activeCount = attributes.filter((attr: any) => attr.active).length;
          const totalValues = attributes.reduce((sum: number, attr: any) => sum + (attr._count?.values || 0), 0);
          
          setStats({
            activeAttributes: activeCount,
            enrichedProfiles: totalValues,
            totalContributors: 2500, // TODO: Récupérer depuis l'API
            completionRate: totalValues > 0 ? Math.round((totalValues / 2500) * 100 * 10) / 10 : 0,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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
            <div className="text-2xl font-bold">{stats.activeAttributes}</div>
            <p className="text-xs text-muted-foreground">
              Attributs configurés
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
            <div className="text-2xl font-bold">{stats.enrichedProfiles}</div>
            <p className="text-xs text-muted-foreground">
              Valeurs enregistrées
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
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Taux d'enrichissement
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
          <AttributeList onRefresh={handleRefresh} />
        </CardContent>
      </Card>

      {/* Modal de création/édition */}
      <AttributeManager
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          handleRefresh();
        }}
      />
    </div>
  );
}
