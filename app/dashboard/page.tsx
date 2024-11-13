"use client"

import ChangePasswordModal from '@/components/auth/Change-Password'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const DashboardPage = () => {
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(true)
    const session = useSession()
    console.log("sesso", session)

    return (
        <div className='h-screen'>
            <h3>Dashboard Page</h3>
            <ChangePasswordModal
                showModal={resetPasswordModalOpen}
                setShowModal={setResetPasswordModalOpen}
            />
        </div>
    )
}

export default DashboardPage