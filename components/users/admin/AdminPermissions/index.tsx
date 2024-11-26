"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Permission {
    name: string
    isChecked: boolean
}

interface PermissionGroup {
    name: string
    permissions: Permission[]
    isCollapsed?: boolean
}

interface PermissionsProps {
    groups: PermissionGroup[]
    onChange: (groupName: string, permissionName: string, isChecked: boolean) => void
}

const AdminPermissions = ({ groups, onChange }: PermissionsProps) => {
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
    const [groupStates, setGroupStates] = useState(() => {
        const states: Record<string, boolean> = {}
        groups.forEach(group => {
            states[group.name] = group.permissions.every(p => p.isChecked)
        })
        return states
    })

    const toggleGroup = (groupName: string) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }))
    }

    const handleGroupCheckbox = (groupName: string, checked: boolean) => {
        setGroupStates(prev => ({
            ...prev,
            [groupName]: checked
        }))
        groups.find(g => g.name === groupName)?.permissions.forEach(permission => {
            onChange(groupName, permission.name, checked)
        })
    }

    const handlePermissionCheckbox = (groupName: string, permissionName: string, checked: boolean) => {
        onChange(groupName, permissionName, checked)

        const group = groups.find(g => g.name === groupName)
        if (group) {
            const allChecked = group.permissions.every(p =>
                p.name === permissionName ? checked : p.isChecked
            )
            setGroupStates(prev => ({
                ...prev,
                [groupName]: allChecked
            }))
        }
    }

    const isGroupPartiallyChecked = (group: PermissionGroup) => {
        const checkedCount = group.permissions.filter(p => p.isChecked).length
        return checkedCount > 0 && checkedCount < group.permissions.length
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {groups.map((group) => (
                <div key={group.name} className={`border border-primary rounded-xl bg-white ${collapsedGroups[group.name] ? 'h-[72px]' : ''}`}>
                    <button
                        onClick={() => toggleGroup(group.name)}
                        className="w-full flex items-center justify-between p-4"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                checked={groupStates[group.name]}
                                ref={input => {
                                    if (input) {
                                        input.indeterminate = isGroupPartiallyChecked(group)
                                    }
                                }}
                                onChange={(e) => handleGroupCheckbox(group.name, e.target.checked)}
                            />
                            <span className="font-satoshiMedium text-primary">{group.name}</span>
                        </div>
                        {collapsedGroups[group.name] ? (
                            <ChevronDown className="size-6 text-primary" />
                        ) : (
                            <ChevronUp className="size-6 text-primary" />
                        )}
                    </button>

                    <div className={`${collapsedGroups[group.name] ? 'hidden' : ''}`}>
                        {group.permissions.map((permission) => (
                            <div
                                key={permission.name}
                                className="flex items-center gap-2 p-4"
                            >
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary focus:ring-primary checked:bg-primary"
                                    checked={permission.isChecked}
                                    onChange={(e) => handlePermissionCheckbox(group.name, permission.name, e.target.checked)}
                                />
                                <span className="text-gray-700">{permission.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminPermissions