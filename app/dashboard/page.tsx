"use client"

import ChangePasswordModal from '@/components/auth/Change-Password'
import { signOut, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const DashboardPage = () => {
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)
    const session = useSession()

    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const handleLogout = async () => {
        await signOut()
    }

    return (
        <section className='h-screen p-10'>
            <div className='flex items-start justify-between'>
                <h3>Dashboard</h3>
                <button className='bg-primary text-white px-3 py-1 rounded-full' onClick={handleLogout}>Logout</button>
                <button className='bg-primary text-white px-3 py-1 rounded-full' onClick={() => setResetPasswordModalOpen(true)}>Change Password</button>
            </div>
            <h4>First Name: {session.data?.user.firstName}</h4>
            <h4>Last Name: {session.data?.user.lastName}</h4>
            <ChangePasswordModal
                showModal={resetPasswordModalOpen}
                setShowModal={setResetPasswordModalOpen}
                email={email}
            />
        </section>
    )
}

export default DashboardPage