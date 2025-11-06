/**
 * Types pour les réponses de l'API
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  errors?: string[];
  warning?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// Types spécifiques pour les utilisateurs
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  position: string | null;
  country: string | null;
  sector: string | null;
  image: string | null;
  kyc_status: string | null;
  job: string | null;
  location: string | null;
  banned: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListItem extends UserResponse {
  _count: {
    members: number;
    missionAssignments: number;
    surveyResponses: number;
  };
}

export interface UserDetail extends UserResponse {
  members: Array<{
    id: string;
    role: string;
    organization: {
      id: string;
      name: string;
      slug: string;
    };
    createdAt: string;
  }>;
  missionAssignments: Array<{
    id: string;
    status: string;
    progress: number;
    mission: {
      id: string;
      name: string;
      status: string | null;
    };
    assignedAt: string;
  }>;
  _count: {
    members: number;
    missionAssignments: number;
    surveyResponses: number;
    subDashboard: number;
    contributorData: number;
  };
}

export type UserListResponse = PaginatedResponse<UserListItem>;
export type UserDetailResponse = ApiResponse<UserDetail>;
export type UserCreateResponse = ApiResponse<UserResponse>;
export type UserUpdateResponse = ApiResponse<UserResponse>;
export type UserDeleteResponse = ApiResponse<{ id: string; email: string; name: string; banned: boolean }>;
