"use client"

import { useGetUserByIDQuery } from '@/services/users'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/global/Button'
import { Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { CustomerPersonalDetails } from '@/components/users/customers/CustomerPersonalDetails'
import { TasksPosted } from '@/components/users/customers/CustomerTasks'
import { SectionHeader } from '@/components/global/SectionHeader'

type TabType = 'personal' | 'tasks';

const CustomerDetailsPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal')
  const id = params.id;
  const {
    data: userData,
    isLoading,
  } = useGetUserByIDQuery(id as unknown as number);
  console.log({userData})

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin size-20 text-primary" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="text-center py-8">
        User not found
      </div>
    )
  }

  const fullName = `${userData.firstName} ${userData.lastName}`

  return (
    <>
      <div className="mb-4">
        <SectionHeader>User Management</SectionHeader>
      </div>
      <div className="border border-blue-100 rounded-xl p-5 lg:p-8 w-full">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            {userData.profileImage ? (
              <Image
                src={userData.profileImage}
                alt={fullName}
                width={80}
                height={80}
                className="rounded-full size-[130px]"
              />
            ) : (
              <div className="size-32 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-4xl text-gray-600">{userData.firstName.charAt(0)}</span>
              </div>
            )}
            <div className='space-y-1'>
              <h1 className="text-xl lg:text-2xl font-satoshiBold text-primary">{fullName}</h1>
              <p className="text-primary font-satoshi text-sm lg:text-lg">
                {userData.roles[0].split('_').map(word =>
                  word.charAt(0) + word.slice(1).toLowerCase()
                ).join(' ')}
              </p>
              <p className="text-sm text-gray-500">Joined {formatDate(userData.createdAt)}</p>
            </div>
          </div>
          <div className="hidden lg:inline-block space-y-2">
            <Button className="w-full rounded-full bg-secondary" theme="secondary">
              Send a message
            </Button>
            {userData.isEnabled && (
              <Button className="w-full rounded-full text-secondary border-secondary bg-[#FCF4E6]" theme="outline">
                Deactivate account
              </Button>
            )}
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
              Personal Details
            </button>
            <button
              className={`px-4 lg:px-6 py-3 rounded-full font-satoshiMedium text-xs lg:text-sm ${activeTab === 'tasks'
                ? 'bg-primary text-white'
                : 'bg-[#EBE9F4] text-[#381F8C] font-satoshi'
                }`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks Posted
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' ? (
          <CustomerPersonalDetails userData={userData} />
        ) : (
          <TasksPosted />
        )}
      </div>
    </>
  )
}

export default CustomerDetailsPage