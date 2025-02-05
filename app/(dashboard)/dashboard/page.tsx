"use client";

import ChangePasswordModal from '@/components/auth/Change-Password';
import Button from '@/components/global/Button';
import { SectionHeader } from '@/components/global/SectionHeader';
import Icons from '@/components/icons';
import { useSession } from 'next-auth/react';
import React, { useLayoutEffect, useState } from 'react';
import DashboardCards from '@/components/Card';
import UserAnalytics from '@/components/ActivityLog';
import ActivityLog from '@/components/Analytics';

const DashboardPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

    useLayoutEffect(() => {
        if (status === 'authenticated' && session?.user?.firstLogin === "true") {
            setResetPasswordModalOpen(true);
        }
    }, [session, status]);

    return (
        <>
            <section className='p-6'>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <SectionHeader>Overview</SectionHeader>
                        <p className='text-sm lg:text-2xl text-primary'>Welcome to your dashboard</p>
                    </div>
                    <Button theme='outline' className='rounded-full hidden lg:inline-flex'>
                        This week
                    </Button>
                    <Icons.CalendarIcon className="lg:hidden" />
                </div>
            </section>

            <DashboardCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <ActivityLog />
                <UserAnalytics />
            </div>
            <ChangePasswordModal
                showModal={resetPasswordModalOpen}
                setShowModal={setResetPasswordModalOpen}
            />
        </>
    );
};

export default DashboardPage;