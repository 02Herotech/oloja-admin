"use client";

import {
    useGetAdminByIDQuery,
    useGetAvailablePermissionsQuery,
} from "@/services/users";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/global/SectionHeader";
import { AdminDetails } from "@/components/users/admin/AdminDetails";
import AdminPermissions from "@/components/users/admin/AdminPermissions";
import BackToPreviousTabButton from "@/components/global/Button/previousTabButton";
import {
    PermissionGroup,
    PermissionResponse
} from "@/types/services/users/admin";

type TabType = "personal" | "permissions";





const AdminDetailsPage = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState<TabType>("personal");
    const id = params.id;

    const { data: userData, isLoading } = useGetAdminByIDQuery(Number(id));
    const { data: permissionResponse, isLoading: isPermissionLoading } = useGetAvailablePermissionsQuery();

    const transformPermissions = (data?: PermissionResponse): PermissionGroup[] => {
        if (!data || !data.permissions) return [];
        return Object.entries(data.permissions).map(([groupName, permissionList]) => ({
            name: groupName,
            permissions: permissionList.map(permissionName => ({
                name: permissionName,
                isChecked: false,
            })),
        }));
    };

    const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);

    useEffect(() => {
        if (permissionResponse) {
            setPermissionGroups(transformPermissions(permissionResponse));
        }
    }, [permissionResponse]);

    const handlePermissionChange = (groupName: string, permissionName: string, isChecked: boolean) => {
        setPermissionGroups(prevGroups =>
            prevGroups.map(group =>
                group.name === groupName
                    ? {
                        ...group,
                        permissions: group.permissions.map(permission =>
                            permission.name === permissionName ? { ...permission, isChecked } : permission
                        ),
                    }
                    : group
            )
        );
    };

    if (isLoading || isPermissionLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="animate-spin size-20 text-primary" />
            </div>
        );
    }

    if (!userData) {
        return <div className="text-center py-8">User not found</div>;
    }

    const fullName = `${userData.user.firstName} ${userData.user.lastName}`;

    return (
        <>
            <div className="mb-4">
                <SectionHeader>User Management</SectionHeader>
            </div>
            <div className={'flex justify-start items-start gap-2'}>
                <BackToPreviousTabButton />
                <div className="flex space-x-6 mb-2">

                    <button
                        className={`px-5 py-2 rounded-xl font-satoshiMedium bg-white text-primary border border-primary hover:text-white hover:bg-tc-primary hover:text-bg-tc-primary'
                        `}
                    >
                        Admin
                    </button>

                </div>
            </div>

            <div className="border border-blue-100 rounded-xl p-5 lg:p-8 w-full">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {userData.user.profileImage ? (
                            <Image
                                src={userData.user.profileImage}
                                alt={fullName}
                                width={80}
                                height={80}
                                className="rounded-full size-[130px]"
                            />
                        ) : (
                            <div className="size-32 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-4xl text-gray-600">
                                    {userData.user.firstName.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="space-y-1">
                            <h1 className="text-xl lg:text-2xl font-bold text-primary">{fullName}</h1>
                            <p className="text-primary font-medium text-sm lg:text-lg">
                                {userData.user.roles[0]
                                    .split("_")
                                    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
                                    .join(" ")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4">
                        <button
                            className={`px-4 lg:px-6 py-3 rounded-full font-medium text-xs lg:text-sm ${
                                activeTab === "personal" ? "bg-primary text-white" : "bg-gray-200 text-primary"
                            }`}
                            onClick={() => setActiveTab("personal")}
                        >
                            Admin Details
                        </button>
                        <button
                            className={`px-4 lg:px-6 py-3 rounded-full font-medium text-xs lg:text-sm ${
                                activeTab === "permissions" ? "bg-primary text-white" : "bg-gray-200 text-primary"
                            }`}
                            onClick={() => setActiveTab("permissions")}
                        >
                            Permissions
                        </button>
                    </div>
                </div>

                {activeTab === "personal" ? (
                    <AdminDetails userData={userData} />
                ) : (
                    <>
                        <AdminPermissions groups={permissionGroups} onChange={handlePermissionChange} />
                        <div className="mt-10">
                            <Button className="w-full rounded-full bg-secondary" theme="secondary">
                                Save changes
                            </Button>
                            <div className="flex items-center justify-between gap-4 mt-4">
                                <Button className="w-full rounded-full text-[#E10909] bg-white border-[#E10909]">
                                    Deactivate account
                                </Button>
                                <Button className="w-full rounded-full bg-[#EBE9F4] text-primary border-[0.5px]">
                                    Delete admin
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AdminDetailsPage;