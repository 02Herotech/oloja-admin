"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/global/Input";
import { FormProvider, useForm } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";
import AdminPermissions from "@/components/users/admin/AdminPermissions";
import Button from "@/components/global/Button";
import ModalSuccessImage from "/public/assets/images/modal-success.png";
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
import Modal from "@/components/global/Modal";
import Image from "next/image";

const CreateUserForm = () => {
    const [createAdmin, { isLoading }] = useCreateAdminMutation();
    const [showModal, setShowModal] = useState(false);

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
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
            const transformedPermissions: Record<string, string[]> = {};

            Object.entries(data.permissions).forEach(([groupName, permissions]) => {
                const normalizedGroupName = groupName.replace(/PERMISSIONS$/i, "").toUpperCase();

                transformedPermissions[normalizedGroupName] = permissions.map(
                    (permission) => `${normalizedGroupName.toLowerCase()}.${permission}`
                );
            });

            const transformedData = {
                firstName: data.firstName,
                lastName: data.lastName,
                emailAddress: data.emailAddress,
                role: data.role,
                permissions: transformedPermissions,
            };

            console.log("Data sent:", JSON.stringify(transformedData, null, 2));

            const response = await createAdmin(transformedData).unwrap();
            console.log("Admin created successfully:", JSON.stringify(response, null, 2));

            setShowModal(true);
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
            <div id={'account-details-section'} className="p-8 max-w-3xl bg-white rounded-lg">
                <h1 className="text-3xl font-bold mb-2 text-primary">Create New Admin</h1>
                <p className="font-satoshiMedium mb-6">
                    Fill in the details below to add a new admin.
                </p>
                <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-6">
                        <Input label="First Name" name="firstName" type="text" placeholder="John" rules={["required"]} />
                        <Input label="Last Name" name="lastName" type="text" placeholder="Doe" rules={["required"]} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Input label="Email Address" name="emailAddress" type="email" placeholder="JohnDoe@gmail.com" rules={["email", "required"]} />
                        <div>
                            <label className="block text-sm font-satoshiMedium">Role</label>
                            <div className="relative mt-1">
                                <select {...methods.register("role", { required: true })} className="w-full px-3 py-2 border border-[#E9ECF1] rounded-xl appearance-none focus:outline-none bg-transparent">
                                    <option value="">Select Role</option>
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                <MdArrowDropDown className="absolute right-3 top-3 text-gray-500" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl p-4 border border-primary">
                        <div id={'permissions-section'} className="flex items-center justify-between mb-3">
                            <label className="text-lg font-bold">Permissions</label>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked={isMarkAllChecked} onChange={(e) => handleMarkAllChange(e.target.checked)} />
                                <span>Mark All</span>
                            </div>
                        </div>
                        <AdminPermissions groups={permissionGroups} onChange={handlePermissionChange} />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="w-full max-w-[200px] bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90">
                            {isLoading ? <Loader2 className="animate-spin size-5" /> : 'Create user'}
                        </Button>
                    </div>
                </form>
            </div>

            <Modal show={showModal} onRequestClose={() => setShowModal(false)}>
                <div className="p-2 text-center">
                    <div className="w-16 h-16 mx-auto bg-green-100 flex items-center justify-center rounded-full">
                        <Image src={ModalSuccessImage}
                               alt={"success"}
                               width={20}
                               height={20}
                        />
                    </div>
                    <h2 className="text-2xl font-satoshiBold mt-4 text-primary">Success!</h2>
                    <p className="mt-2 font-satoshi text-[#140B31]">The admin has been successfully added
                        <span className={'block'}>to the system.</span>
                    </p>
                    <div className='flex justify-center'>
                        <Button
                            onClick={() => setShowModal(false)}
                            className="w-full max-w-[150px] mt-4 px-2 py-2 bg-primary text-white rounded-full"
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </Modal>
        </FormProvider>
    );
};

export default CreateUserForm;