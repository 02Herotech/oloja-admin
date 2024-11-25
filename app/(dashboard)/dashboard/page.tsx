"use client"

import ChangePasswordModal from '@/components/auth/Change-Password'
import Button from '@/components/global/Button'
import { SectionHeader } from '@/components/global/SectionHeader'
import Icons from '@/components/icons'
import { useSession } from 'next-auth/react'
import React, { useLayoutEffect, useState } from 'react'

const DashboardPage = () => {
    const { data: session, status } = useSession()
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)

    useLayoutEffect(() => {
        if (status === 'authenticated' && session?.user?.firstLogin === "true") {
            setResetPasswordModalOpen(true)
        }
    }, [session, status]);

    return (
        <>
            <section className=''>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <SectionHeader>Overview</SectionHeader>
                        <p className='text-sm lg:text-2xl text-primary'>Welcome to your dashboard</p>
                    </div>
                    <Button
                        theme='outline'
                        className='rounded-full hidden lg:inline-flex'
                    >
                        This week
                    </Button>
                    <Icons.CalendarIcon className="lg:hidden"/>
                </div>
            </section>
            <ChangePasswordModal
                showModal={resetPasswordModalOpen}
                setShowModal={setResetPasswordModalOpen}
            />
        </>
    )
}

export default DashboardPage