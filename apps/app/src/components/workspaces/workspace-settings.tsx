"use client";

import { useEffect, useState } from "react";
import { useI18n, useCurrentLocale } from "@/locales/client";
import { useRouter } from "next/navigation";

import { Button } from "@tada/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tada/ui/components/card";
import { Input } from "@tada/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@tada/ui/components/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tada/ui/components/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@tada/ui/components/select";

import {
  WorkspaceSettingsMenu,
  WorkspaceSettingsTab,
} from "@/components/workspaces/workspace-settings-menu";
import { getPublicUrlForPath } from "@/lib/uploads.public";

type WorkspaceMember = {
  id: string;
  role: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

type WorkspaceInvitation = {
  id: string;
  email: string;
  role: string;
  status: string; // "pending", "accepted", "expired", ...
  createdAt: string;
};

type WorkspaceInfo = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
};

type WorkspaceSettingsData = {
  workspace: WorkspaceInfo;
  members: WorkspaceMember[];
  invitations: WorkspaceInvitation[];
};

export function WorkspaceSettings({ workspaceId }: { workspaceId: string }) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const router = useRouter();

  const [data, setData] = useState<WorkspaceSettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<WorkspaceSettingsTab>("general");

  const [workspaceNameInput, setWorkspaceNameInput] = useState("");
  const [workspaceSlugInput, setWorkspaceSlugInput] = useState("");
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [isInviting, setIsInviting] = useState(false);

  const [dangerOpen, setDangerOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [editingMember, setEditingMember] = useState<WorkspaceMember | null>(
    null
  );
  const [editingRole, setEditingRole] = useState("member");
  const [isSavingRole, setIsSavingRole] = useState(false);

  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);

  const [invitationToDelete, setInvitationToDelete] =
    useState<WorkspaceInvitation | null>(null);
  const [isDeletingInvitation, setIsDeletingInvitation] = useState(false);

  /**
   * Chargement du workspace + membres (GET /api/workspaces/[workspaceId])
   */
  const loadWorkspace = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "GET",
      });

      if (!res.ok) {
        console.error("Failed to load workspace", await res.text());
        setData({
          workspace: {
            id: workspaceId,
            name: "Workspace",
            slug: "",
            logo: null,
          },
          members: [],
          invitations: [],
        });
        return;
      }

      const ws = await res.json();

      setData({
        workspace: {
          id: ws.id,
          name: ws.name,
          slug: ws.slug,
          logo: ws.logo ?? null,
        },
        members: ws.members ?? [],
        invitations: ws.invitations ?? [],
      });
      setWorkspaceNameInput(ws.name || "");
      setWorkspaceSlugInput(ws.slug || "");

      setLogoPreview(
        getPublicUrlForPath({
          category: "workspaceLogo",
          pathOrUrl: ws.logo,
        })
      );
      setNewLogoFile(null);
    } catch (e) {
      console.error("Error loading workspace settings", e);
      setData({
        workspace: {
          id: workspaceId,
          name: "Workspace",
          slug: "",
          logo: null,
        },
        members: [],
        invitations: [],
      });
      setWorkspaceNameInput("Workspace");
      setWorkspaceSlugInput("");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setNewLogoFile(null);
      setLogoPreview(
        getPublicUrlForPath({
          category: "workspaceLogo",
          pathOrUrl: data?.workspace.logo,
        })
      );

      return;
    }
    setNewLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleUpdateWorkspace = async () => {
    if (!data) return;
    if (!workspaceNameInput.trim()) return;

    setIsSavingWorkspace(true);
    try {
      const formData = new FormData();
      formData.append("name", workspaceNameInput.trim());
      if (workspaceSlugInput.trim()) {
        formData.append("slug", workspaceSlugInput.trim());
      }
      if (newLogoFile) {
        formData.append("logo", newLogoFile);
      }

      const res = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        console.error("Error updating workspace", await res.text());
        setIsSavingWorkspace(false);
        return;
      }

      const updated = await res.json();

      setData((prev) =>
        prev
          ? {
              ...prev,
              workspace: {
                id: updated.id,
                name: updated.name,
                slug: updated.slug,
                logo: updated.logo ?? prev.workspace.logo,
              },
            }
          : prev
      );

      setLogoPreview(
        getPublicUrlForPath({
          category: "workspaceLogo",
          pathOrUrl: updated.logo,
        })
      );

      setNewLogoFile(null);
    } catch (e) {
      console.error("Error updating workspace", e);
    } finally {
      setIsSavingWorkspace(false);
    }
  };

  useEffect(() => {
    void loadWorkspace();
  }, [workspaceId]);

  /**
   * Invitation d’un membre : POST /api/workspaces/[workspaceId]/invite
   */
  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inviteEmail.trim(),
          role: inviteRole,
        }),
      });

      if (!res.ok) {
        console.error("Error inviting workspace member", await res.text());
      } else {
        setInviteEmail("");
        await loadWorkspace();
      }
    } catch (e) {
      console.error("Error inviting workspace member", e);
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteInvitation = async () => {
    if (!invitationToDelete) return;

    setIsDeletingInvitation(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/invite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invitationId: invitationToDelete.id }),
      });

      if (!res.ok) {
        console.error("Error deleting invitation", await res.text());
        setIsDeletingInvitation(false);
        return;
      }

      // Mise à jour locale : on enlève l’invitation du state
      setData((prev) =>
        prev
          ? {
              ...prev,
              invitations: prev.invitations.filter(
                (inv) => inv.id !== invitationToDelete.id
              ),
            }
          : prev
      );

      setInvitationToDelete(null);
    } catch (e) {
      console.error("Error deleting invitation", e);
    } finally {
      setIsDeletingInvitation(false);
    }
  };

  /**
   * Suppression du workspace : DELETE /api/workspaces/[workspaceId]
   */
  const handleDeleteWorkspace = async () => {
    if (!data) return;
    if (confirmName !== data.workspace.name) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmationName: confirmName }),
      });

      if (!res.ok) {
        console.error("Error deleting workspace", await res.text());
        setIsDeleting(false);
        return;
      }

      // Après suppression : redirection vers la home (ou une page de choix)
      router.push(`/${locale}`);
    } catch (e) {
      console.error("Error deleting workspace", e);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Ouverture du dialog d’édition de rôle
   */
  const openEditMember = (member: WorkspaceMember) => {
    setEditingMember(member);
    setEditingRole(member.role);
  };

  /**
   * PATCH rôle d’un membre : /api/workspaces/[workspaceId]/members/[memberId]
   */
  const handleUpdateMemberRole = async () => {
    if (!editingMember) return;

    setIsSavingRole(true);
    try {
      const res = await fetch(
        `/api/workspaces/${workspaceId}/members/${editingMember.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: editingRole }),
        }
      );

      if (!res.ok) {
        console.error("Error updating member role", await res.text());
        setIsSavingRole(false);
        return;
      }

      // Mettre à jour le state local
      setData((prev) =>
        prev
          ? {
              ...prev,
              members: prev.members.map((m) =>
                m.id === editingMember.id ? { ...m, role: editingRole } : m
              ),
            }
          : prev
      );

      setEditingMember(null);
    } catch (e) {
      console.error("Error updating member role", e);
    } finally {
      setIsSavingRole(false);
    }
  };

  /**
   * DELETE membre (soft remove) : /api/workspaces/[workspaceId]/members/[memberId]
   */
  const handleRemoveMember = async (member: WorkspaceMember) => {
    setRemovingMemberId(member.id);
    try {
      const res = await fetch(
        `/api/workspaces/${workspaceId}/members/${member.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        console.error("Error removing member", await res.text());
        setRemovingMemberId(null);
        return;
      }

      // Soit on filtre localement, soit on reload
      // Ici on met à jour localement les members actifs
      setData((prev) =>
        prev
          ? {
              ...prev,
              members: prev.members.filter((m) => m.id !== member.id),
            }
          : prev
      );
    } catch (e) {
      console.error("Error removing member", e);
    } finally {
      setRemovingMemberId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const workspaceName = data?.workspace.name || "Workspace";

  const activeMembers =
    data?.members.filter((m) => m.status === "active") ?? [];

  const pendingInvitations =
    data?.invitations?.filter((inv) => inv.status === "pending") ?? [];

  return (
    <div className="space-y-10">
      {/* Titre principal */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {t("workspace.settings.title") || "Workspace settings"}
        </h1>
        <p className="text-sm text-gray-500">
          {t("workspace.settings.subtitle") ||
            "Manage this workspace team, invitations and dangerous actions."}
        </p>
      </div>

      {/* Contenu + mini menu à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,1fr)_minmax(0,3fr)] gap-8 items-start">
        {/* Colonne gauche : mini menu */}
        <WorkspaceSettingsMenu active={activeTab} onChange={setActiveTab} />

        {/* Colonne droite : contenu selon l’onglet */}
        <div className="space-y-8">
          {/* Onglet 1 : modifier workspace + danger zone */}
          {activeTab === "general" && (
            <>
              {/* Card : infos générales du workspace */}
              <Card>
                <CardHeader className="px-6 pt-6 pb-3">
                  <CardTitle className="text-lg">
                    {t("workspace.settings.generalTitle") ||
                      "General information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                  {/* Logo du workspace */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("workspace.settings.fields.logo") || "Workspace logo"}
                    </label>
                    <div className="flex items-center gap-4">
                      {/* Aperçu logo actuel ou fallback */}
                      {logoPreview ? (
                        <div className="h-14 w-14 rounded-lg border border-gray-200 overflow-hidden bg-white">
                          <img
                            src={logoPreview}
                            alt={workspaceName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="h-14 w-14">
                          <AvatarFallback>
                            {workspaceName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className="space-y-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="max-w-xs"
                        />
                        <p className="text-xs text-gray-500">
                          PNG, JPG… Taille recommandée ~ 128×128px.
                        </p>
                        {newLogoFile && (
                          <p className="text-xs text-gray-500 italic">
                            {t("workspace.settings.fields.newLogoSelected") ||
                              "New logo selected:"}{" "}
                            {newLogoFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("workspace.settings.fields.name") || "Workspace name"}
                    </label>
                    <Input
                      value={workspaceNameInput}
                      onChange={(e) => setWorkspaceNameInput(e.target.value)}
                      placeholder="My workspace"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("workspace.settings.fields.slug") || "URL slug"}
                    </label>
                    <Input
                      value={workspaceSlugInput}
                      onChange={(e) => setWorkspaceSlugInput(e.target.value)}
                      placeholder="my-workspace"
                    />
                    <p className="text-xs text-gray-500">
                      {t("workspace.settings.fields.slugHelp") ||
                        "Used in URLs and public links."}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleUpdateWorkspace}
                      disabled={isSavingWorkspace}
                    >
                      {isSavingWorkspace
                        ? t("common.loading") || "Saving..."
                        : t("common.save") || "Save changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger zone (tu gardes exactement ta logique actuelle) */}
              <Card className="border-red-200">
                <CardHeader className="px-6 pt-6 pb-3">
                  <CardTitle className="text-lg text-red-600">
                    {t("workspace.settings.dangerTitle") || "Danger zone"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    {t("workspace.settings.dangerDescription") ||
                      "Deleting this workspace is irreversible. All related missions and data may be affected."}
                  </p>
                  <Button
                    variant="outline"
                    className="border-red-400 text-red-600 hover:bg-red-50"
                    onClick={() => setDangerOpen(true)}
                  >
                    {t("workspace.settings.deleteButton") ||
                      "Delete this workspace"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Onglet 2 : membres / invitations */}
          {activeTab === "members" && (
            <Card>
              <CardHeader className="px-6 pt-6 pb-3">
                <CardTitle className="text-lg">
                  {t("workspace.settings.teamTitle") || "Workspace team"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                {/* 👉 ici tu gardes TOUT ton bloc existant :
                    - invitation (input email + select role + bouton)
                    - tableau des membres
                    - tableau des invitations en attente
                    Je le recolle exactement tel que tu l’avais : */}

                {/* Invitation */}
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                  <div className="flex-1 w-full">
                    <Input
                      type="email"
                      placeholder={
                        t("workspace.settings.invitePlaceholder") ||
                        "Invite a member by email"
                      }
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            t("workspace.settings.rolePlaceholder") || "Role"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInvite} disabled={isInviting}>
                    {isInviting
                      ? t("common.loading") || "Loading..."
                      : t("workspace.settings.inviteButton") || "Send invite"}
                  </Button>
                </div>

                {/* Liste des membres */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 bg-gray-50 text-xs font-semibold uppercase text-gray-500 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,1fr)]">
                    <div>
                      {t("workspace.settings.columns.member") || "Member"}
                    </div>
                    <div>{t("workspace.settings.columns.role") || "Role"}</div>
                    <div className="text-right">
                      {t("workspace.settings.columns.actions") || "Actions"}
                    </div>
                  </div>

                  {loading ? (
                    <div className="px-4 py-6 text-sm text-gray-500">
                      {t("common.loading") || "Loading..."}
                    </div>
                  ) : !data || activeMembers.length === 0 ? (
                    <div className="px-4 py-6 text-sm text-gray-500">
                      {t("workspace.settings.emptyMembers") ||
                        "No members yet in this workspace."}
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {activeMembers.map((member) => (
                        <div
                          key={member.id}
                          className="px-4 py-3 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,1fr)] items-center"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={member.user.image || undefined}
                              />
                              <AvatarFallback>
                                {member.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {member.user.name}
                              </div>
                              <div className="text-xs text-gray-500 truncate">
                                {member.user.email}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">
                            {member.role}
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditMember(member)}
                            >
                              {t("common.edit") || "Edit"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleRemoveMember(member)}
                              disabled={removingMemberId === member.id}
                            >
                              {removingMemberId === member.id
                                ? t("common.loading") || "Removing..."
                                : t("common.remove") || "Remove"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Invitations en attente */}
                {pendingInvitations.length > 0 && (
                  <div className="mt-6 border border-dashed border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2 bg-gray-50 text-xs font-semibold uppercase text-gray-500 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,1fr)]">
                      <div>
                        {t("workspace.settings.columns.member") || "Membre"}
                      </div>
                      <div>
                        {t("workspace.settings.columns.role") || "Rôle"}
                      </div>
                      <div className="text-right">
                        {t("workspace.settings.columns.status") || "Statut"}
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {pendingInvitations.map((inv) => (
                        <div
                          key={inv.id}
                          className="px-4 py-3 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,1fr)] items-center"
                        >
                          <div className="text-sm text-gray-900 truncate">
                            {inv.email}
                          </div>
                          <div className="text-sm text-gray-700">
                            {inv.role}
                          </div>
                          <div className="flex justify-end gap-2">
                            <span className="text-xs font-medium text-amber-600">
                              {inv.status === "pending"
                                ? "En attente"
                                : inv.status}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 ml-2"
                              onClick={() => setInvitationToDelete(inv)}
                            >
                              {t("common.delete") || "Supprimer"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Onglet 3 : Billing (placeholder pour l’instant) */}
          {activeTab === "billing" && (
            <Card>
              <CardHeader className="px-6 pt-6 pb-3">
                <CardTitle className="text-lg">
                  {t("workspace.settings.billingTitle") || "Billing & credits"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <p className="text-sm text-gray-600">
                  {t("workspace.settings.billingEmpty") ||
                    "Billing, invoices and credit usage will appear here soon."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog de confirmation suppression */}
      <Dialog open={dangerOpen} onOpenChange={setDangerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("workspace.settings.deleteDialogTitle", {
                name: workspaceName,
              }) || `Supprimer le workspace «${workspaceName}»`}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">
            {t("workspace.settings.deleteDialogDescription", {
              name: workspaceName,
            }) || "Please type the workspace name to confirm this action."}
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">
              {t("workspace.settings.workspaceNameLabel") || "Workspace name:"}
            </span>{" "}
            {workspaceName}
          </p>
          <Input
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder={workspaceName}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDangerOpen(false)}
              disabled={isDeleting}
            >
              {t("common.cancel") || "Cancel"}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteWorkspace}
              disabled={
                isDeleting || !data || confirmName !== data.workspace.name
              }
            >
              {isDeleting
                ? t("common.loading") || "Deleting..."
                : t("workspace.settings.confirmDeleteButton") ||
                  "Yes, delete this workspace"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog édition rôle membre */}
      <Dialog
        open={!!editingMember}
        onOpenChange={(open) => {
          if (!open) setEditingMember(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("workspace.settings.editMemberTitle") || "Edit member role"}
            </DialogTitle>
          </DialogHeader>

          {editingMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={editingMember.user.image || undefined} />
                  <AvatarFallback>
                    {editingMember.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">
                    {editingMember.user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {editingMember.user.email}
                  </div>
                </div>
              </div>

              <Select value={editingRole} onValueChange={setEditingRole}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      t("workspace.settings.rolePlaceholder") || "Role"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingMember(null)}
              disabled={isSavingRole}
            >
              {t("common.cancel") || "Cancel"}
            </Button>
            <Button
              onClick={handleUpdateMemberRole}
              disabled={isSavingRole || !editingMember}
            >
              {isSavingRole
                ? t("common.loading") || "Saving..."
                : t("common.save") || "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog confirmation suppression invitation */}
      <Dialog
        open={!!invitationToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeletingInvitation) {
            setInvitationToDelete(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("workspace.settings.deleteInvitationTitle") ||
                "Supprimer l’invitation ?"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 mb-4">
            {t("workspace.settings.deleteInvitationDescription") ||
              "Cette action va annuler l’invitation envoyée à cet email. L’utilisateur ne pourra plus rejoindre le workspace avec ce lien."}
          </p>

          {invitationToDelete && (
            <p className="text-sm mb-4">
              <span className="font-semibold">Email :</span>{" "}
              {invitationToDelete.email}
              <br />
              <span className="font-semibold">Rôle :</span>{" "}
              {invitationToDelete.role}
            </p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInvitationToDelete(null)}
              disabled={isDeletingInvitation}
            >
              {t("common.cancel") || "Annuler"}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteInvitation}
              disabled={isDeletingInvitation}
            >
              {isDeletingInvitation
                ? t("common.loading") || "Suppression..."
                : t("workspace.settings.deleteInvitationConfirm") ||
                  "Oui, supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
