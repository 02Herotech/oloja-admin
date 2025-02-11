export interface UserAddress {
    id: number;
    state: string;
    streetName: string;
    streetNumber: string;
    unitNumber: string;
    postCode: string;
    suburb: string;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'SERVICE_PROVIDER';
export type AccountState = 'NOT_VERIFIED' | 'VERIFIED' | 'DEACTIVATED';

export interface User {
    id: number;
    lastPasswordChangeDate: string;
    deactivatedAt: string;
    accountState: AccountState;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    roles: UserRole[];
    emailAddress: string;
    createdAt: string;
    stripeId: string;
    userAddress: UserAddress;
    profileImage: string;
    phoneNumber: string;
    isEnabled: boolean;
}

export interface PaginatedResponse<T> {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    content: T[];
}



export type FetchAllUsersResponse = PaginatedResponse<User>;

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TaskType = 'REMOTE_SERVICE' | 'IN_PERSON_SERVICE';

export interface Category {
    id: number;
    categoryName: string;
    description: string;
}

export interface CustomerTask {
    id: number;
    posterId: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage: string;
    taskTime: string | [number, number, number];
    taskDate: string | [number, number, number];
    termAccepted: boolean;
    taskType: TaskType;
    taskStatus: TaskStatus;
    suburb: string;
    state: string;
    postCode: string;
    createdAt: [number, number, number] | string;
    deleted: boolean;
    available: boolean;
    assignedTo: number | null;
    customerBudget: number;
    category: Category;
    active: boolean;
}

export interface Customer {
    id: number;
    address: Partial<UserAddress>;
    enabled: boolean;
    customerId: number;
    emailAddress: string;
    roles: UserRole[];
    accountState: AccountState;
    firstName: string;
    lastName: string;
    registeredAt: [number, number, number] | string;
    profileImage: string;
    dateOfBirth: [number, number, number] | string;
}

export interface GetCustomerByIdResponse {
    user: Customer;
    customerTasks: CustomerTask[];
    document: never | null;
}