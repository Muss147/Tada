"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  organizationId?: string | null;
};

type WorkspaceContextValue = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  setCurrentWorkspaceId: (id: string) => void;
  refresh: () => Promise<void>;
  loading: boolean;
};

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "tada-current-workspace-id";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceIdState] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/workspaces", { cache: "no-store" });

      if (!res.ok) {
        console.error("Failed to fetch workspaces");
        setWorkspaces([]);
        return;
      }

      const data: Workspace[] = await res.json();
      setWorkspaces(data || []);

      let initialId: string | null = currentWorkspaceId;

      if (typeof window !== "undefined" && !initialId) {
        initialId = window.localStorage.getItem(STORAGE_KEY);
      }

      if (!initialId && data.length > 0) {
        initialId = data[0].id;
      }

      if (initialId) {
        setCurrentWorkspaceIdState(initialId);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, initialId);
        }
      }
    } catch (e) {
      console.error("[WORKSPACES_FETCH_ERROR]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentWorkspaceId = (id: string) => {
    setCurrentWorkspaceIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, id);
    }
  };

  const currentWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) || null;

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        setCurrentWorkspaceId,
        refresh: fetchWorkspaces,
        loading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return ctx;
}
