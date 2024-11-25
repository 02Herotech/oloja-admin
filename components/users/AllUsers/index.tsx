"use client"

import React, { useEffect, useState } from 'react'
import UserCard from '../UserCard'
import { useGetAllUsersMutation } from '@/services/users'
import Button from '@/components/global/Button'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { FetchAllUsersResponse, User } from '@/types/services/users'
import { formatDate } from '@/lib/utils'

const AllUsers = () => {
    const [page, setPage] = useState(0)
    const [getAllUsers] = useGetAllUsersMutation()
    const [usersData, setUsersData] = useState<FetchAllUsersResponse | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUsers = async (pageNumber: number) => {
        try {
            setLoading(true)
            const response = await getAllUsers(pageNumber).unwrap()
            setUsersData(response)
        } catch (error) {
            console.error('Failed to fetch users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(page)
    }, [page])

    const handleNextPage = () => {
        if (usersData && page < usersData.totalPages - 1) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1)
        }
    }

    // Map API user data to UserCard props
    const mapUserToCardProps = (user: User) => ({
        name: `${user.firstName} ${user.lastName}`,
        role: user.roles.includes('SUPER_ADMIN') ? 'admin' as const :
            user.roles.includes('SERVICE_PROVIDER') ? 'provider' as const : 'customer' as const,
        dateJoined: formatDate(user.createdAt),
        image: user.profileImage,
        id: user.id
    })

    if (loading) {
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
                    All Users ({usersData?.totalElements ?? 0})
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-primary">
                        Page {page + 1} of {usersData?.totalPages ?? 1}
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
                            disabled={!usersData || page >= usersData.totalPages - 1}
                            className="p-2 rounded-xl"
                            theme="outline"
                        >
                            <ChevronRight className="size-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {usersData?.content.map((user) => (
                <UserCard
                    key={user.id}
                    {...mapUserToCardProps(user)}
                />
            ))}

            {usersData?.content.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No users found
                </div>
            )}
        </div>
    )
}

export default AllUsers