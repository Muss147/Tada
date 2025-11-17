export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  metadata?: string | null;
  status?: string | null;
}
