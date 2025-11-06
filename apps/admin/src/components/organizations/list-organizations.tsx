"use client";
import { useI18n } from "@/locales/client";
import { Badge } from "@tada/ui/components/badge";
import { Button as UIButton } from "@tada/ui/components/button";
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
import { cn } from "@tada/ui/lib/utils";
import {
  type Row,
  type RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, EyeIcon, MoreHorizontal, Edit, Trash2, Building2, Plus } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import type { Organization } from "./type";
import { OrganizationManager } from "./organization-manager";
import { useToast } from "@/hooks/use-toast";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align: string;
  }
}

const Button = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      className="group px-2.5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

type OrganizationWithMissions = Organization & { 
  missions: number;
  _count?: {
    members: number;
    missions: number;
    projects: number;
  };
};

export function ListOrganizations({
  organizations: initialOrganizations,
}: {
  organizations: OrganizationWithMissions[];
}) {
  const t = useI18n();
  const router = useRouter();
  const { toast } = useToast();
  const pageSize = 8;
  
  const [organizations, setOrganizations] = useState<OrganizationWithMissions[]>(initialOrganizations);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationWithMissions | null>(null);

  const handleEdit = (org: OrganizationWithMissions) => {
    setSelectedOrganization(org);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (org: OrganizationWithMissions) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${org.name}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/organizations/${org.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Organisation supprimée",
          description: `${org.name} a été supprimée avec succès.`,
        });
        router.refresh();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de supprimer l'organisation",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'organisation",
        variant: "destructive",
      });
    }
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const workspacesColumns = [
    {
      header: t("organizations.list.columns.name"),
      accessorKey: "name",
      meta: {
        align: "text-left",
      },
    },
    {
      header: t("organizations.list.columns.email"),
      accessorKey: "job",
      meta: {
        align: "text-left",
      },
    },
    {
      header: t("organizations.list.columns.missions"),
      accessorKey: "missions",
      meta: {
        align: "text-left",
      },
    },
    {
      header: "Membres",
      accessorKey: "members",
      meta: {
        align: "text-left",
      },
      cell: ({ row }: { row: Row<OrganizationWithMissions> }) => {
        return (
          <span className="text-sm text-gray-600">
            {row.original._count?.members || 0}
          </span>
        );
      },
    },
    {
      header: "",
      accessorKey: "actions",
      meta: {
        align: "text-right",
      },
      cell: ({ row }: { row: Row<OrganizationWithMissions> }) => {
        return (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/organizations/${row.original.id}`}>
              <UIButton variant="ghost" size="sm">
                <EyeIcon className="h-4 w-4" />
              </UIButton>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UIButton variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </UIButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(row.original)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable<OrganizationWithMissions>({
    data: organizations,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  return (
    <>
      <div className="w-full rounded-lg border border-gray-100 bg-white shadow-sm p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("organizations.list.title")}
          </h2>
          <UIButton onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle organisation
          </UIButton>
        </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader
                  key={header.id}
                  className={cn(header.column.columnDef.meta?.align)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(cell.column.columnDef.meta?.align)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10 flex items-center justify-between">
        <p className="text-sm tabular-nums text-gray-500 dark:text-gray-500">
          {t("contributors.list.pagination.page")}{" "}
          <span className="font-medium text-gray-900 dark:text-gray-50">{`${
            table.getState().pagination.pageIndex + 1
          }`}</span>{" "}
          {t("contributors.list.pagination.of")}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {" "}
            {`${table.getPageCount()}`}
          </span>
        </p>
        <div className="inline-flex items-center rounded-full shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">
              {t("contributors.list.pagination.previous")}
            </span>
            <ArrowLeft
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </Button>
          <span
            className="h-5 border-r border-gray-300 dark:border-gray-800"
            aria-hidden={true}
          />
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">
              {t("contributors.list.pagination.next")}
            </span>
            <ArrowRight
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </Button>
        </div>
      </div>
    </div>

    <OrganizationManager
      isOpen={isCreateDialogOpen}
      onClose={() => setIsCreateDialogOpen(false)}
      onSuccess={handleSuccess}
    />

    <OrganizationManager
      isOpen={isEditDialogOpen}
      onClose={() => {
        setIsEditDialogOpen(false);
        setSelectedOrganization(null);
      }}
      organization={selectedOrganization || undefined}
      onSuccess={handleSuccess}
    />
    </>
  );
}
