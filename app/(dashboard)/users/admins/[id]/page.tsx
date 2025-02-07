"use client"

import {useGetAdminByIDQuery} from '@/services/users'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/global/Button'
import { Loader2 } from 'lucide-react'
import { SectionHeader } from '@/components/global/SectionHeader'
import { AdminDetails } from '@/components/users/admin/AdminDetails'
import AdminPermissions from '@/components/users/admin/AdminPermissions'
import BackToPreviousTabButton
    from "@/components/global/Button/previousTabButton";

const permissionGroups = [
  {
    name: "User management",
    permissions: [
      { name: "View Cust. details", isChecked: false },
      { name: "View SP details", isChecked: false },
      { name: "View Other admins", isChecked: true },
      { name: "Send message", isChecked: true },
      { name: "Deactivate acct", isChecked: true },
      { name: "Create Admins", isChecked: false },
    ]
  },
  {
    name: "Bookings",
    permissions: [
      { name: "View Tasks details", isChecked: false },
      { name: "View Service details", isChecked: true },
      { name: "Deactivate tasks", isChecked: false },
      { name: "Deactivate Services", isChecked: true },
      { name: "View orders", isChecked: true },
      { name: "Bookings", isChecked: false },
    ]
  },
  {
    name: "Payments",
    permissions: [
      { name: "Approve withdrawals", isChecked: true },
      { name: "View transactions", isChecked: false },
      { name: "View payouts", isChecked: true },
      { name: "View Billings", isChecked: true },
      { name: "Payments", isChecked: false },
    ]
  },
  {
    name: "General",
    permissions: [
      { name: "Send noticfaions", isChecked: true },
      { name: "Send messages", isChecked: false },
      { name: "Reports & issues", isChecked: true },
      { name: "General", isChecked: false },
    ]
  }
]

type TabType = 'personal' | 'permissions';

const AdminDetailsPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal')
  const id = params.id;
  const {
    data: userData,
    isLoading,
  } = useGetAdminByIDQuery(id as unknown as number);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin size-20 text-primary" />
      </div>
    )
  }
    console.log("userdata",userData);
  if (!userData) {
    return (
      <div className="text-center py-8">
        User not found
      </div>
    )
  }

  const handlePermissionChange = (groupName: string, permissionName: string, isChecked: boolean) => {
    console.log(groupName, permissionName, isChecked)
  }

  const fullName = `${userData.user.firstName} ${userData.user.lastName}`

  return (
    <>
      <div className="mb-4">
        <SectionHeader>User Management</SectionHeader>
      </div>
      <div className="border border-blue-100 rounded-xl p-5 lg:p-8 w-full">
          <BackToPreviousTabButton/>
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
                <span className="text-4xl text-gray-600">{'userData.firstName.user'.charAt(0)}</span>
              </div>
            )}
            <div className='space-y-1'>
              <h1 className="text-xl lg:text-2xl font-satoshiBold text-primary">{fullName}</h1>
              <p className="text-primary font-satoshi text-sm lg:text-lg">
                {userData.user.roles[0].split('_').map(word =>
                  word.charAt(0) + word.slice(1).toLowerCase()
                ).join(' ')}
              </p>
              {/*<p className="text-sm text-gray-500">Joined {formatDate(userData.usercreatedAt)}</p>*/}
            </div>
          </div>
          <div className="hidden lg:inline-block space-y-2">
            <Button className="w-full rounded-full bg-secondary" theme="secondary">
              Send a message
            </Button>
            <Button className="w-full rounded-full text-secondary border-secondary bg-[#FCF4E6]" theme="outline">
              Update Admin
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              className={`px-4 lg:px-6 py-3 rounded-full font-satoshiMedium text-xs lg:text-sm ${activeTab === 'personal'
                ? 'bg-primary text-white'
                : 'bg-[#EBE9F4] text-[#381F8C] font-satoshi'
                }`}
              onClick={() => setActiveTab('personal')}
            >
              Admin Details
            </button>
            <button
              className={`px-4 lg:px-6 py-3 rounded-full font-satoshiMedium text-xs lg:text-sm ${activeTab === 'permissions'
                ? 'bg-primary text-white'
                : 'bg-[#EBE9F4] text-[#381F8C] font-satoshi'
                }`}
              onClick={() => setActiveTab('permissions')}
            >
              Permissions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' ? (
          <AdminDetails userData={userData} />
        ) : (
          <>
            <AdminPermissions
              groups={permissionGroups}
              onChange={handlePermissionChange}
            />
            <div className="mt-10">
              <Button className="w-full rounded-full bg-secondary" theme="secondary">
                Save changes
              </Button>
              <div className="flex items-center justify-between gap-4 mt-4">
                <Button className="w-full rounded-full" theme="outline">
                  Deactivate account
                </Button>
                <Button className="w-full rounded-full" theme="outline">
                  Delete admin
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminDetailsPage