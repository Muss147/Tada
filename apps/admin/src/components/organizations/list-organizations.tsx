"use client";
import { useI18n } from "@/locales/client";
import { Badge } from "@tada/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@tada/ui/components/table";
import { cn } from "@tada/ui/lib/utils";
import {
  type Row,
  type RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useMemo } from "react";
import type { Organization } from "./type";

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

type OrganizationWithMissions = Organization & { missions: number };

export function ListOrganizations({
  organizations,
}: {
  organizations: OrganizationWithMissions[];
}) {
  const t = useI18n();
  const pageSize = 8;

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
      header: "",
      accessorKey: "actions",
      meta: {
        align: "text-right",
      },
      cell: ({ row }: { row: Row<OrganizationWithMissions> }) => {
        return (
          <Link href={`/organizations/${row.original.id}`}>
            <EyeIcon className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50" />
          </Link>
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
    <div className="w-full rounded-lg border border-gray-100 bg-white shadow-sm p-5">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        {t("organizations.list.title")}
      </h2>
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
  );
}
