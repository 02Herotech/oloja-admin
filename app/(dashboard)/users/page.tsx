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

const Users = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'customers', label: 'Customers' },
    { id: 'providers', label: 'Service Providers' },
    { id: 'admin', label: 'Admin' }
  ]

  const handleTabChange = (tabId: string) => {
    router.push(`?tab=${tabId}`, { scroll: false })
  }

  return (
    <Suspense>
      <div className="relative">
        <div className="flex items-center justify-between">
          <SectionHeader>User Management</SectionHeader>
          <Dropdown
            trigger={() => (
              <div className="flex items-center justify-center lg:hidden border rounded-full p-3">
                <Icons.UsersFilterIcon />
              </div>
            )}
            className='-right-3 top-14'>
            <div className='w-[240px] bg-white rounded-lg shadow-lg border border-gray-100'>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(tab.id)}
                  className='flex w-full dropdown-item hover:bg-gray-50 transition-colors text-base text-tc-dark font-satoshiMedium items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100'>
                  {tab.label}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>

        <div className="mt-6">
          <div className="hidden lg:flex space-x-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

        <div className="mt-6">
          {activeTab === 'all' && <AllUsers />}
          {activeTab === 'customers' && <AllCustomers />}
          {activeTab === 'providers' && <AllServiceProviders />}
          {activeTab === 'admin' && <AllAdmins />}
        </div>
      </div>
    </Suspense>
  )
}

export default Users