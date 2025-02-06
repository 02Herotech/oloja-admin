import {
     Customer,
} from "@/types/services/users/customers";

export type TaskType = 'PHYSICAL_SERVICE' | 'REMOTE_SERVICE';

export interface Category {
    id: number;
    categoryName: string;
}

export interface SubCategory {
    name: string;
}

export interface UserBasic {
    id: number;
    profileImage: string;
    fullName: string;
}

export interface ServiceProvider {
    id: number;
    user: UserBasic;
}

export interface Review {
    rating: number;
}

export interface ServiceProviderListing {
    id: number;
    listingTitle: string;
    listingDescription: string;
    planOneDescription: string;
    planOnePrice: number;
    planTwoDescription: string;
    planTwoPrice: number;
    planThreeDescription: string;
    planThreePrice: number;
    taskType: TaskType;
    suburb: string;
    state: string;
    postCode: string;
    availableDays: string[];
    createdAt: [number, number, number];
    available: boolean;
    deleted: boolean;
    stripeId: string;
    businessPictures: string[];
    category: Category;
    subCategory: SubCategory;
    serviceProvider: ServiceProvider;
    reviews: Review[];
}

export interface ReviewDetail {
    id: number;
    comment: string;
    createdAt: [number, number, number, number, number, number, number];
    rating: number;
    serviceCategory: Category;
    customer: {
        id: number;
        user: {
            id: number;
            emailAddress: string;
            firstName: string;
            lastName: string;
            profileImage: string;
        };
    };
}

// export interface ServiceProviderUser {
//     id: number;
//     address: Partial<UserAddress>;
//     enabled: boolean;
//     stripeId: string;
//     emailAddress: string;
//     roles: UserRole[];
//     serviceProviderId: number;
//     accountState: AccountState;
//     phoneNumber: string;
//     firstName: string;
//     lastName: string;
//     profileImage: string;
//     registeredAt: string | [number, number, number];
//     dateOfBirth: string | [number, number, number];
// }

export interface GetServiceProviderByIdResponse {
    user: Customer;
    serviceProviderListing: ServiceProviderListing[];
    bio: string;
}
