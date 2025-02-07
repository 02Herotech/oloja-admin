import {Customer} from "@/types/services/users/customers";

export interface AdminResponse {
    user: Customer;
    permission: unknown | null
}