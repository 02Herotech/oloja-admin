import React from 'react'
import { Mail, Calendar, Phone } from 'lucide-react'
import { User } from '@/types/services/users'
import { formatDate } from '@/lib/utils'

interface AdminDetailsProps {
    userData: User;
}

export const AdminDetails = ({ userData }: AdminDetailsProps) => {
    return (
        <div className='mt-10'>
            <h2 className="text-lg lg:text-2xl text-tc-dark font-satoshiBold font-semibold mb-4">Admin Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className='space-y-8'>
                    <div className="flex items-center gap-4 text-gray-600 mb-2">
                        <Mail className="size-7" />
                        {userData.emailAddress}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-2">
                        <Calendar className="size-7" />
                        {formatDate(userData.dateOfBirth)}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                        <Phone className="size-7" />
                        {userData.phoneNumber || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    )
}