import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PermissionGroup } from "@/types/services/users/admin";
import {formatString} from "@/lib/utils";

interface AdminPermissionsProps {
    groups: PermissionGroup[];
    onChange: (groupName: string, permissionName: string, isChecked: boolean) => void;
}

const AdminPermissions: React.FC<AdminPermissionsProps> = ({ groups, onChange }) => {
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (groupName: string) => {
        setCollapsedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
    };

    const handleGroupCheckbox = (groupName: string, isChecked: boolean) => {
        groups
            .find((group) => group.name === groupName)
            ?.permissions.forEach((permission) => {
            onChange(groupName, permission.name, isChecked);
        });
    };

    const isGroupPartiallyChecked = (group: PermissionGroup): boolean => {
        const checkedCount = group.permissions.filter((p) => p.isChecked).length;
        return checkedCount > 0 && checkedCount < group.permissions.length;
    };

    const isGroupFullyChecked = (group: PermissionGroup): boolean => {
        return group.permissions.every((p) => p.isChecked);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {groups.map((group) => (
                <div key={group.name} className="border border-primary rounded-xl bg-white">
                    <button
                        type="button"
                        onClick={() => toggleGroup(group.name)}
                        className="w-full flex items-center justify-between p-4"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                checked={isGroupFullyChecked(group)}
                                ref={(input) => {
                                    if (input) {
                                        input.indeterminate = isGroupPartiallyChecked(group);
                                    }
                                }}
                                onChange={(e) => handleGroupCheckbox(group.name, e.target.checked)}
                            />
                            <span className="font-medium text-primary">
                                {formatString(group.name)}
                            </span>
                        </div>
                        {collapsedGroups[group.name] ? (
                            <ChevronDown className="size-6 text-primary" />
                        ) : (
                            <ChevronUp className="size-6 text-primary" />
                        )}
                    </button>

                    {!collapsedGroups[group.name] &&
                        group.permissions.map((permission) => (
                            <div key={permission.name} className="flex items-center gap-2 p-4">
                                <input
                                    type="checkbox"
                                    checked={permission.isChecked}
                                    onChange={(e) => onChange(group.name, permission.name, e.target.checked)}
                                />
                                <span className="text-gray-700">
                                    {formatString(permission.name)}
                                </span>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default AdminPermissions;