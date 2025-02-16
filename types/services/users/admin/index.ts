import {Customer} from "@/types/services/users/customers";

export interface AdminResponse {
    user: Customer;
    permission: unknown | null
}

export interface Permission {
    name: string;
    isChecked: boolean;
}

export interface PermissionGroup {
    name: string;
    permissions: Permission[];
}

export interface PermissionResponse {
    permissions: Record<string, string[]>;
}

export interface CreateAdminRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    permissions: Record<string, string[]>;
}
