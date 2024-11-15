"use client"

import ChangePasswordModal from '@/components/auth/Change-Password'
import { signOut, useSession } from 'next-auth/react'
import React, { useLayoutEffect, useState } from 'react'

const DashboardPage = () => {
    const { data: session, status } = useSession()
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)

    useLayoutEffect(() => {
        if (status === 'authenticated' && session?.user?.firstLogin === "true") {
            setResetPasswordModalOpen(true)
        }
    }, [session, status]);

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
            <h4>First Name: {session?.user.firstName}</h4>
            <h4>Last Name: {session?.user.lastName}</h4>
            <ChangePasswordModal
                showModal={resetPasswordModalOpen}
                setShowModal={setResetPasswordModalOpen}
            />
        </section>
    )
}

export default DashboardPage