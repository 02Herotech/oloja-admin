"use client";

import { usePathname, useRouter } from "next/navigation";
import Icons from "@/components/icons";
import { TbX } from "react-icons/tb";
import { useGetAllAdminsQuery } from "@/services/users";
import UserCard from "@/components/users/UserCard";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { User } from "@/types/services/users/customers";
import { formatDate } from "@/lib/utils";

const CreateUserSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: adminsData, isLoading, error } = useGetAllAdminsQuery(0);
    const [activeTab, setActiveTab] = useState("account");

    const mapUserToCardProps = (user: User) => ({
        name: `${user.firstName} ${user.lastName}`,
        role: "admin" as const,
        dateJoined: formatDate(user.createdAt),
        image: user.profileImage,
        id: user.id,
        showButton: false,
    });

    const handleScrollToAccountDetails = () => {
        const accountDetailsSection = document.getElementById("account-details-section");
        if (accountDetailsSection) {
            accountDetailsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScrollToPermissions = () => {
        const permissionsSection = document.getElementById("permissions-section");
        if (permissionsSection) {
            permissionsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const accountDetailsSection = document.getElementById("account-details-section");
        const permissionsSection = document.getElementById("permissions-section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === "account-details-section") {
                            setActiveTab("account");
                        } else if (entry.target.id === "permissions-section") {
                            setActiveTab("permissions");
                        }
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (accountDetailsSection) observer.observe(accountDetailsSection);
        if (permissionsSection) observer.observe(permissionsSection);

        return () => {
            if (accountDetailsSection) observer.unobserve(accountDetailsSection);
            if (permissionsSection) observer.unobserve(permissionsSection);
        };
    }, []);

    if (pathname !== "/create-admin") return null;

    return (
        <nav className="hidden lg:block w-[278px] min-h-[calc(100vh-100px)] py-2 mt-[100px] px-6 fixed bg-white border-r">
            <div className="flex justify-start items-center">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white"
                >
                    <TbX size={20} />
                </button>
            </div>

            <h2 className="mt-4 text-xl font-satoshiBold">Create new admin</h2>

            <ul className="mt-4 space-y-2">
                <li>
                    <div
                        className={`flex items-center px-4 py-3 rounded-lg ${
                            activeTab === "account" ? "bg-secondary text-white" : "text-primary"
                        }`}
                        onClick={() => {
                            setActiveTab("account");
                            handleScrollToAccountDetails();
                        }}
                    >
                        <Icons.AccountDetailsIcon />
                        <span className="ml-4">Account details</span>
                    </div>
                </li>
                <li>
                    <div
                        className={`flex items-center px-4 py-3 rounded-lg ${
                            activeTab === "permissions" ? "bg-secondary text-white" : "text-primary"
                        }`}
                        onClick={() => {
                            setActiveTab("permissions");
                            handleScrollToPermissions();
                        }}
                    >
                        <Icons.PermissionIcon />
                        <span className="ml-4">Permissions</span>
                    </div>
                </li>
            </ul>

            <div className="mt-8 w-full border-t pt-4">
                <h3 className="font-satoshiBold text-xl mb-4">Other admins</h3>

                <div className="w-full flex flex-col items-center justify-center mt-4 overflow-y-auto max-h-[300px] pt-6 ">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate-spin size-20 text-primary" />
                        </div>
                    ) : error ? (
                        <p className="text-base text-center">Error loading other admins</p>
                    ) : adminsData && adminsData.content ? (
                        adminsData.content.map((admin) => (
                            <div
                                onClick={() => router.push('/users/admins/${admin.id}')}
                                key={admin.id}
                                className="w-full">
                                <UserCard {...mapUserToCardProps(admin)} />
                                <div className="mb-4 cursor-pointer" />
                            </div>
                        ))
                    ) : (
                        <p className="text-base text-center">No admins found</p>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CreateUserSidebar;