"use client"

import React, {Suspense, useState} from 'react'
import {SectionHeader} from '@/components/global/SectionHeader'
import {useRouter, useSearchParams} from 'next/navigation'
import Icons from '@/components/icons'
import Dropdown from '@/components/global/Dropdown'
import Button from "@/components/global/Button";
import Modal from '@/components/global/Modal'
import {FormProvider, useForm} from "react-hook-form";
import {NumberInputField} from "@/components/global/Input/NumberInput";
import {useUpdatePricingFeeMutation} from "@/services/users/admin";
import {
    UpdatePricingFeeRequest
} from "@/types/services/users/admin";
import {Loader2} from "lucide-react";
import Image from "next/image";
import ModalSuccessImage from "/public/assets/images/modal-success.png";

const SettingsContent = () => {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('tab') || 'all'

    return (
        <div className="mt-6">
            {activeTab === 'all' && <p >all</p >}
            {activeTab === 'tasks' && <p >tasks</p >}
            {activeTab === 'services' && <p >services</p >}
        </div >
    )
}

// Separate component for the tabs
interface TabButtonsProps {
    onTabChange: (tabId: string) => void;
}

const TabButtons = ({onTabChange}: TabButtonsProps) => {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "all";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatePricingFee, { isLoading }] = useUpdatePricingFeeMutation();
    const [showSuccess, setShowSuccess] = useState(false);


    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            taskCharge:0,
            serviceCharge:0,
            gstRate:0
        },
    });

    const handleButtonClick = () => {
        setIsModalOpen(true)
    };

    const onSubmit = async (data: UpdatePricingFeeRequest) => {
        console.log("data sent", JSON.stringify(data, null, 2));
        const response = await updatePricingFee(data).unwrap();
        console.log("Request successful:", JSON.stringify(response, null, 2));

        setShowSuccess(true); // Show success image after successful submission
    };

    const tabs = [
        {id: "all", label: "All"},
        {id: "tasks", label: "Tasks"},
        {id: "services", label: "Services"},
    ];

    return (
        <div
            className="flex flex-col lg:flex-row lg:items-center justify-between"
        >

            <div
            >
                <Dropdown
                trigger={() => (

                    <div className="ml-4 flex items-center cursor-pointer md:hidden">
                        <Icons.UsersFilterIcon />
                    </div >
                )}
                className="-right-3 top-14"
            >
                <div
                    className="w-[240px] bg-white rounded-lg shadow-lg border border-gray-100"
                >
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => onTabChange(tab.id)}
                            className="flex w-full dropdown-item hover:bg-gray-50 transition-colors text-base text-tc-dark font-satoshiMedium items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100"
                        >
                            {tab.label}
                        </button >
                    ))}
                </div >
            </Dropdown >
                <div className={'flex justify-end align-middle items-center' +
                    ' md:hidden'}>
                    <Button
                        onClick={handleButtonClick}
                        className="ml-4 font-satoshi bg-secondary border border-secondary rounded-full whitespace-nowrap hover:bg-secondary/90"
                    >
                        Change Pricing & Fees
                    </Button >
                </div>

            </div >


            <div className="hidden lg:flex items-center justify-between w-full">
                <div className="flex space-x-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-5 py-2 rounded-xl font-satoshiMedium ${
                                activeTab === tab.id
                                    ? "bg-tc-primary text-white"
                                    : "border border-gray-300 text-primary hover:bg-tc-primary hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button >
                    ))}
                </div >
                <Button
                    onClick={handleButtonClick}
                    className="ml-4 font-satoshi bg-secondary border border-secondary rounded-full whitespace-nowrap hover:bg-secondary/90"
                >
                    Change Pricing & Fees
                </Button >
            </div >

            <Modal
                show={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title={'Create new fee'}
                description={'Note: New fees will apply to tasks and Services created and all tasks and services will be affected.'}
                style={{
                    color:"#381F8C",
                }}
            >
                {showSuccess ? (
                    <>
                        <div className="w-16 h-16 mx-auto bg-green-100 flex items-center justify-center rounded-full">
                            <Image src={ModalSuccessImage}
                                   alt={"success"}
                                   width={50}
                                   height={50}
                            />
                        </div>
                        <p className={'text-center font-satoshi text-primary mt-5 text-sm'}> You have Successfully updated Pricing & Fees. </p>
                    </>

                ) : (
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}
                              className={'flex flex-col gap-6'}>

                            <NumberInputField
                                id="taskCharge"
                                label={"Task Charge"}
                                placeholder={"Task Charge"}
                            />
                            <NumberInputField
                                id="serviceCharge"
                                label={"Service Charge"}
                                placeholder={"Service Charge"}
                            />
                            <NumberInputField
                                id="gstRate"
                                label={'GST Rate'}
                                placeholder={'GST Rate'}
                            />


                            <div className={'flex justify-center'}>
                                <Button
                                    type="submit"
                                    className="bg-primary rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="animate-spin size-5" />}
                                    Save Changes
                                </Button>
                            </div>


                        </form>
                    </FormProvider>
                )}



            </Modal >
        </div >
    );
};

const Settings = () => {
    const router = useRouter()

    const handleTabChange = (tabId: string) => {
        router.push(`?tab=${tabId}`, {scroll: false})
    }

    return (
        <div className="relative">
            {/* Header Section: User Management + Signup Bonus */}
            <div className="flex justify-between items-center w-full mb-6">
                <SectionHeader >Settings</SectionHeader >
            </div >

            {/* Tabs Below the Header */}
            <Suspense >
                <TabButtons onTabChange={handleTabChange}/>
            </Suspense >

            {/* Settings Content */}
            <Suspense >
                <SettingsContent />
            </Suspense >
        </div >
    )
}

export default Settings