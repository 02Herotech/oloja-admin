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