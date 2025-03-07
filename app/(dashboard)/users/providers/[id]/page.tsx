"use client"

import {
    useGetServiceProviderByIdQuery,
} from '@/services/users'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/global/Button'
import { Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { SectionHeader } from '@/components/global/SectionHeader'
import { ProvidersPersonalDetails } from '@/components/users/providers/ProvidersPersonalDetails'
import { ServicesPosted } from '@/components/users/providers/ProviderServices'
import { ProviderReviews } from '@/components/users/providers/ProviderReviews'
import BackToPreviousTabButton from "@/components/global/Button/previousTabButton"
import {useDeactivateUser} from "@/hooks/useDeactivateUser";

type TabType = 'personal' | 'services' | 'reviews';

const ServiceProviderDetailsPage = ({ params }: { params: { id: string } }) => {
    const [activeTab, setActiveTab] = useState<TabType>('personal')
    const id = params.id;
    const {
        data: userData,
        isLoading,
        refetch
    } = useGetServiceProviderByIdQuery(id as unknown as number);
    const { deactivateUserHandler, isLoading: isDeactivating } = useDeactivateUser();
    const handleDeactivate = async () => {
        await deactivateUserHandler(parseInt(id));
        refetch();
    };

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
    const fullName = `${userData.user.firstName} ${userData.user.lastName}`

    return (
        <>
            <div className="mb-4">
                <SectionHeader>User Management</SectionHeader>
            </div>
            <div className={'flex justify-start items-start gap-2'}>
                <BackToPreviousTabButton />
                <div className="flex space-x-6 mb-2">

                    <button
                        className={`px-5 py-2 rounded-xl font-satoshiMedium bg-white text-primary border border-primary hover:text-white hover:bg-tc-primary hover:text-bg-tc-primary'
                        `}
                    >
                        Service Provider
                    </button>

                </div>
            </div>
            <div className="border border-blue-100 rounded-xl p-5 lg:p-8 w-full">
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
                                <span className="text-4xl text-gray-600">{userData.user.firstName.charAt(0)}</span>
                            </div>
                        )}
                        <div className='space-y-1'>
                            <h1 className="text-xl lg:text-2xl font-satoshiBold text-primary">{fullName}</h1>
                            <p className="text-primary font-satoshi text-sm lg:text-lg">
                                {userData.user.roles[0].split('_').map(word =>
                                    word.charAt(0) + word.slice(1).toLowerCase()
                                ).join(' ')}
                            </p>
                            <p className="text-sm text-gray-500">Joined {formatDate(userData.user.registeredAt)}</p>
                        </div>
                    </div>
                    <div className="hidden lg:inline-block space-y-2">
                        <Button className="w-full rounded-full bg-secondary" theme="secondary">
                            Send a message
                        </Button>
                        {userData.user.accountState !== "DEACTIVATED"
                            && (
                                <Button
                                    className="w-full rounded-full text-[#E10909] border-[#E10909] bg-[#fdfdfd]"
                                    theme="outline"
                                    onClick={handleDeactivate}
                                    disabled={isDeactivating}
                                >
                                    {isDeactivating ? <Loader2 className="animate-spin size-5" /> : "Deactivate account"}
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
                            className={`px-4 lg:px-6 py-3 rounded-full font-satoshiMedium text-xs lg:text-sm ${activeTab === 'services'
                                ? 'bg-primary text-white'
                                : 'bg-[#EBE9F4] text-[#381F8C] font-satoshi'
                            }`}
                            onClick={() => setActiveTab('services')}
                        >
                            Services Posted
                        </button>
                        <button
                            className={`px-4 lg:px-6 py-3 rounded-full font-satoshiMedium text-xs lg:text-sm ${activeTab === 'reviews'
                                ? 'bg-primary text-white'
                                : 'bg-[#EBE9F4] text-[#381F8C] font-satoshi'
                            }`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews and Ratings
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'personal' ? (
                    <ProvidersPersonalDetails userData={userData} />
                ) : activeTab === 'services' ? (
                    <ServicesPosted userData={userData} />
                ) : (
                    <ProviderReviews reviews={userData.review} />
                )}
            </div>
        </>
    )
}

export default ServiceProviderDetailsPage