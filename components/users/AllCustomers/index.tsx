"use client"

import React, { useState } from 'react'
import UserCard from '../UserCard'
import { useGetAllCustomersQuery } from '@/services/users'
import Button from '@/components/global/Button'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import type { User } from '@/types/services/users'
import { formatDate } from '@/lib/utils'

const AllCustomers = () => {
    const [page, setPage] = useState(0)
    const {
        data: customersData,
        isLoading,
    } = useGetAllCustomersQuery(page)

    const handleNextPage = () => {
        if (customersData && page < customersData.totalPages - 1) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1)
        }
    }

    const mapUserToCardProps = (user: User) => ({
        name: `${user.firstName} ${user.lastName}`,
        role: 'customer' as const,
        dateJoined: formatDate(user.createdAt),
        image: user.profileImage,
        id: user.id
    })

    // Show loading only if we don't have data yet
    if (!customersData || isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="animate-spin size-20 text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className='text-primary font-satoshiMedium'>
                    All Customers ({customersData.totalElements})
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-primary">
                        Page {page + 1} of {customersData.totalPages}
                    </span>
                    <div className="flex gap-4">
                        <Button
                            onClick={handlePrevPage}
                            disabled={page === 0}
                            className="p-2 rounded-xl"
                            theme="outline"
                        >
                            <ChevronLeft className="size-6" />
                        </Button>
                        <Button
                            onClick={handleNextPage}
                            disabled={page >= customersData.totalPages - 1}
                            className="p-2 rounded-xl"
                            theme="outline"
                        >
                            <ChevronRight className="size-6" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {customersData.content.map((user) => (
                    <UserCard
                        key={user.id}
                        {...mapUserToCardProps(user)}
                    />
                ))}

                {customersData.content.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No customers found
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllCustomers