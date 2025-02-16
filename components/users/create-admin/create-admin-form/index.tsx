"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/global/Input";
import { FormProvider, useForm } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";
import AdminPermissions from "@/components/users/admin/AdminPermissions";
import Button from "@/components/global/Button";
import {
    useCreateAdminMutation,
    useGetAvailablePermissionsQuery,
} from "@/services/users";
import { Loader2 } from "lucide-react";
import {
    CreateAdminRequest,
    PermissionGroup,
    PermissionResponse,
} from "@/types/services/users/admin";

const CreateUserForm = () => {
    const [createAdmin, { isLoading }] = useCreateAdminMutation();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            permissions: {},
        },
    });

    const { data: permissionResponse, isLoading: isPermissionLoading } =
        useGetAvailablePermissionsQuery();

    const transformPermissions = (data?: PermissionResponse): PermissionGroup[] => {
        if (!data || !data.permissions) return [];
        return Object.entries(data.permissions).map(([groupName, permissionList]) => ({
            name: groupName,
            permissions: permissionList.map((permissionName) => ({
                name: permissionName,
                isChecked: false,
            })),
        }));
    };

    const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
    const [isMarkAllChecked, setIsMarkAllChecked] = useState(false);

    useEffect(() => {
        if (permissionResponse) {
            setPermissionGroups(transformPermissions(permissionResponse));
        }
    }, [permissionResponse]);

    const handlePermissionChange = (groupName: string, permissionName: string, isChecked: boolean) => {
        setPermissionGroups(prevGroups => {
            const updatedGroups = prevGroups.map(group =>
                group.name === groupName
                    ? {
                        ...group,
                        permissions: group.permissions.map(permission =>
                            permission.name === permissionName ? { ...permission, isChecked } : permission
                        ),
                    }
                    : group
            );

            const selectedPermissions: Record<string, string[]> = {};
            updatedGroups.forEach((group) => {
                selectedPermissions[group.name] = group.permissions
                    .filter((permission) => permission.isChecked)
                    .map((permission) => permission.name);
            });

            methods.setValue("permissions", selectedPermissions);

            return updatedGroups;
        });
    };

    const handleMarkAllChange = (isChecked: boolean) => {
        setIsMarkAllChecked(isChecked);
        const updatedGroups = permissionGroups.map((group) => ({
            ...group,
            permissions: group.permissions.map((permission) => ({
                ...permission,
                isChecked,
            })),
        }));
        setPermissionGroups(updatedGroups);

        const selectedPermissions: Record<string, string[]> = {};
        updatedGroups.forEach((group) => {
            selectedPermissions[group.name] = isChecked
                ? group.permissions.map((p) => p.name)
                : [];
        });

        methods.setValue("permissions", selectedPermissions);
    };

    useEffect(() => {
        const allChecked = permissionGroups.every((group) =>
            group.permissions.every((permission) => permission.isChecked)
        );
        setIsMarkAllChecked(allChecked);
    }, [permissionGroups]);

    const onSubmit = async (data: CreateAdminRequest) => {
        try {
            console.log("data sent", data);
            const response = await createAdmin(data).unwrap();
            console.log("Admin created successfully:", response);
        } catch (error) {
            console.error("Error creating admin:", error);
        }
    };


    if (isPermissionLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="animate-spin size-20 text-primary" />
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <div className="p-8 max-w-3xl bg-white rounded-lg">
                <h1 id="account-details-section" className="text-3xl font-bold mb-2 text-primary">Create New Admin</h1>
                <p className="font-satoshiMedium mb-6">
                    Fill in the details below to add a new admin.
                </p>
                <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
                    <div  className="grid grid-cols-2 gap-6">
                        <Input label="First Name" name="firstName" type="text" placeholder="John" rules={["required"]} className="w-full border border-[#E9ECF1]" />
                        <Input label="Last Name" name="lastName" type="text" placeholder="Doe" rules={["required"]} className="w-full border border-[#E9ECF1]" />
                    </div>

                    <div className="grid grid-cols-2 gap-6 items-center">
                        <Input label="Email Address" name="email" type="email" placeholder="JohnDoe@gmail.com" rules={["email", "required"]} className="w-full border border-[#E9ECF1]" />
                        <div>
                            <label className="block text-sm font-satoshiMedium">Role</label>
                            <div className="relative mt-1">
                                <select {...methods.register("role", { required: true })} className="w-full px-3 py-2 border border-[#E9ECF1] rounded-xl appearance-none focus:outline-none bg-transparent">
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                <MdArrowDropDown className="absolute right-3 top-3 text-gray-500" size={20} />
                            </div>
                        </div>
                    </div>

                    <div  id="permissions-section" className="rounded-xl p-4 border border-primary">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-lg font-satoshiBold">Permissions</label>
                            <div className="flex items-center gap-3 text-primary">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked={isMarkAllChecked} onChange={(e) => handleMarkAllChange(e.target.checked)} />
                                <span>Mark All</span>
                            </div>
                        </div>
                        <AdminPermissions
                            groups={permissionGroups}
                            onChange={handlePermissionChange}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="w-full max-w-[200px] bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90">
                            {isLoading ? <Loader2 className="animate-spin size-5" /> : 'Create user'}
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default CreateUserForm;