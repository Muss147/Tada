"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@tada/ui/components/badge";
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
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@tada/ui/components/dropdown-menu";
import {
  UserPlus,
  MoreHorizontal,
  Edit,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  kyc_status: string | null;
  banned: boolean | null;
  position: string | null;
  country: string | null;
  _count?: {
    members: number;
    missionAssignments: number;
    surveyResponses: number;
  };
}

export function UsersManagement({ initialUsers }: { initialUsers: User[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "contributor",
    position: "",
    country: "",
    sector: "",
    job: "",
    location: "",
    image: "",
    kyc_status: "none",
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer les données en convertissant "none" en null et en nettoyant les champs vides
      const dataToSend = Object.fromEntries(
        Object.entries(formData)
          .map(([key, value]) => [key, value === "none" ? null : value])
          .filter(([key, value]) => {
            // Toujours garder les champs requis
            if (["email", "name", "role"].includes(key)) return true;
            // Filtrer les valeurs vides pour les autres champs
            return value !== "" && value !== null;
          })
      );

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Utilisateur créé",
          description: `${result.data.name} a été créé avec succès.`,
        });
        setIsCreateDialogOpen(false);
        setFormData({
          email: "",
          name: "",
          role: "contributor",
          position: "",
          country: "",
          sector: "",
          job: "",
          location: "",
          image: "",
          kyc_status: "none",
        });
        router.refresh();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsSubmitting(true);

    try {
      // Préparer les données en convertissant "none" en null et en nettoyant les champs vides
      const dataToSend = Object.fromEntries(
        Object.entries(formData)
          .map(([key, value]) => [key, value === "none" ? null : value])
          .filter(([key, value]) => {
            // Pour la mise à jour, on peut envoyer des valeurs vides sauf null
            return value !== null;
          })
      );

      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Utilisateur mis à jour",
          description: `${result.data.name} a été mis à jour avec succès.`,
        });
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        router.refresh();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleBan = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banned: !user.banned }),
      });

      if (response.ok) {
        toast({
          title: user.banned ? "Utilisateur débanni" : "Utilisateur banni",
          description: `${user.name} a été ${user.banned ? "débanni" : "banni"} avec succès.`,
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${user.name} ?`)) return;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Utilisateur supprimé",
          description: `${user.name} a été supprimé avec succès.`,
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
      position: user.position || "",
      country: user.country || "",
      sector: "",
      job: "",
      location: "",
      image: "",
      kyc_status: user.kyc_status || "none",
    });
    setIsEditDialogOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { label: "Admin", className: "bg-purple-100 text-purple-800" },
      client: { label: "Client", className: "bg-blue-100 text-blue-800" },
      contributor: { label: "Contributeur", className: "bg-green-100 text-green-800" },
    };
    const roleConfig = config[role as keyof typeof config] || {
      label: role,
      className: "bg-gray-100 text-gray-800",
    };
    return <Badge className={roleConfig.className}>{roleConfig.label}</Badge>;
  };

  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Gestion des Utilisateurs
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Créez et gérez tous les utilisateurs de la plateforme
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrer par rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Administrateurs</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="contributor">Contributeurs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {user.position || "-"}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {user.country || "-"}
                </TableCell>
                <TableCell>
                  {user.banned ? (
                    <Badge className="bg-red-100 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Banni
                    </Badge>
                  ) : user.kyc_status === "completed" ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">Actif</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleBan(user)}>
                        <Ban className="mr-2 h-4 w-4" />
                        {user.banned ? "Débannir" : "Bannir"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600"
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

      {/* Dialog Création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer un nouveau compte utilisateur.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Contributeur</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job">Métier</Label>
                  <Input
                    id="job"
                    value={formData.job}
                    onChange={(e) =>
                      setFormData({ ...formData, job: e.target.value })
                    }
                    placeholder="Ex: Développeur, Designer..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kyc_status">Statut KYC</Label>
                  <Select
                    value={formData.kyc_status || "none"}
                    onValueChange={(value) =>
                      setFormData({ ...formData, kyc_status: value === "none" ? "" : value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Non défini</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Complété</SelectItem>
                      <SelectItem value="canceled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Ex: France, Cameroun..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ville</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Ex: Paris, Douala..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector">Secteur d'activité</Label>
                  <Input
                    id="sector"
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                    placeholder="Ex: Technologie, Finance..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer l'utilisateur"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom complet *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Rôle *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Contributeur</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Poste</Label>
                  <Input
                    id="edit-position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-job">Métier</Label>
                  <Input
                    id="edit-job"
                    value={formData.job}
                    onChange={(e) =>
                      setFormData({ ...formData, job: e.target.value })
                    }
                    placeholder="Ex: Développeur, Designer..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-kyc_status">Statut KYC</Label>
                  <Select
                    value={formData.kyc_status || "none"}
                    onValueChange={(value) =>
                      setFormData({ ...formData, kyc_status: value === "none" ? "" : value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Non défini</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Complété</SelectItem>
                      <SelectItem value="canceled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-country">Pays</Label>
                  <Input
                    id="edit-country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Ex: France, Cameroun..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Ville</Label>
                  <Input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Ex: Paris, Douala..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sector">Secteur d'activité</Label>
                  <Input
                    id="edit-sector"
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                    placeholder="Ex: Technologie, Finance..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL de l'image</Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
