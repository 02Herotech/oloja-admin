"use client"

import React, { Suspense } from 'react'
import { SectionHeader } from '@/components/global/SectionHeader'
import { useRouter, useSearchParams } from 'next/navigation'
import Icons from '@/components/icons'
import Dropdown from '@/components/global/Dropdown'
import AllUsers from '@/components/users/AllUsers'
import AllCustomers from '@/components/users/AllCustomers'
import AllServiceProviders from '@/components/users/AllServiceProviders'
import AllAdmins from '@/components/users/AllAdmins'

// Separate component for the tab-dependent content
const UserContent = () => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'

  return (
    <div className="mt-6">
      {activeTab === 'all' && <AllUsers />}
      {activeTab === 'customers' && <AllCustomers />}
      {activeTab === 'providers' && <AllServiceProviders />}
      {activeTab === 'admin' && <AllAdmins />}
    </div>
  )
}

// Separate component for the tabs
interface TabButtonsProps {
  onTabChange: (tabId: string) => void;
}

const TabButtons = ({ onTabChange }: TabButtonsProps) => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'customers', label: 'Customers' },
    { id: 'providers', label: 'Service Providers' },
    { id: 'admin', label: 'Admin' }
  ]

  return (
    <>
      <Dropdown
        trigger={() => (
          <div className="flex items-center justify-center lg:hidden border rounded-full p-3 size-14">
            <Icons.UsersFilterIcon />
          </div>
        )}
        className='-right-3 top-14'>
        <div className='w-[240px] bg-white rounded-lg shadow-lg border border-gray-100'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(tab.id)}
              className='flex w-full dropdown-item hover:bg-gray-50 transition-colors text-base text-tc-dark font-satoshiMedium items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100'>
              {tab.label}
            </button>
          ))}
        </div>
      </Dropdown>

      <div className="mt-6">
        <div className="hidden lg:flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-5 py-2 rounded-xl font-satoshiMedium ${activeTab === tab.id
                  ? 'bg-tc-primary text-white'
                  : 'border border-gray-300 text-primary hover:bg-tc-primary hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

const Users = () => {
  const router = useRouter()

  const handleTabChange = (tabId: string) => {
    router.push(`?tab=${tabId}`, { scroll: false })
  }

  return (
    <div className="relative">
      {/* Header Section: User Management + Signup Bonus */}
      <div className="flex justify-between items-center w-full mb-6">
        <SectionHeader>User Management</SectionHeader>
        <button
          onClick={() => router.push('/signupbonus')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Edit Bonuses
        </button>
      </div>

      {/* Tabs Below the Header */}
      <Suspense>
        <TabButtons onTabChange={handleTabChange} />
      </Suspense>

      {/* User Content */}
      <Suspense>
        <UserContent />
      </Suspense>
    </div>
  )
}

export default Users