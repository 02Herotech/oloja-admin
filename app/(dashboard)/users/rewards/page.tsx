'use client'

import Button from "@/components/global/Button";
import { useState, useEffect } from "react";
import { Loader2 } from 'lucide-react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useApplySignupBonusMutation, useGetSignupBonusDetailsQuery } from "@/services/users";

export default function SignupBonus() {
  const { data, isLoading, refetch } = useGetSignupBonusDetailsQuery();
  const [applySignupBonus] = useApplySignupBonusMutation();

  const [customerBonus, setCustomerBonus] = useState("");
  const [customerDays, setCustomerDays] = useState("");
  const [serviceProviderBonus, setServiceProviderBonus] = useState("");
  const [serviceProviderDays, setServiceProviderDays] = useState("");
  const [customerEnabled, setCustomerEnabled] = useState(false);
  const [serviceProviderEnabled, setServiceProviderEnabled] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const customerBonusData = data.find((bonus) => bonus.role === "CUSTOMER");
      const serviceProviderBonusData = data.find((bonus) => bonus.role === "SERVICE_PROVIDER");
  
      setCustomerBonus(customerBonusData?.amount?.toString() || "");
      setCustomerDays(customerBonusData?.validityDays?.toString() || "");
      setCustomerEnabled(customerBonusData?.status === "ENABLED");
  
      setServiceProviderBonus(serviceProviderBonusData?.amount?.toString() || "");
      setServiceProviderDays(serviceProviderBonusData?.validityDays?.toString() || "");
      setServiceProviderEnabled(serviceProviderBonusData?.status === "ENABLED");
    }
  }, [data]);  

  const handleApplySignupBonus = async (role: string, amount: string, validityDays: string) => {
    try {
      await applySignupBonus({ role, amount, validityDays }).unwrap();
      refetch();
      toast.success(`${role} bonus applied successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error applying signup bonus:", error);
      toast.error("Failed to apply signup bonus. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEnableToggle = async (role: string, enabled: boolean) => {
    try {
      const isCustomer = role === "CUSTOMER";
      const amount = isCustomer ? customerBonus : serviceProviderBonus;
      const validityDays = isCustomer ? customerDays : serviceProviderDays;
      const newStatus = enabled ? "ENABLED" : "DISABLED";

      await applySignupBonus({
        role,
        amount,
        validityDays,
        status: newStatus,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Error toggling enable state:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="w-full h-full flex flex-col bg-white">
      <ToastContainer />

        <h2 className="text-5xl font-bold mt-3 pl-6">Sign up Bonus</h2>
        <p className="text-gray-600 text-xl mt-4 pl-6">
          Fill in the details below and apply the changes to all user types
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="animate-spin size-20 text-primary" />
          </div>
        ) : (
          <div className="flex flex-col space-y-6 p-6 rounded-lg shadow-sm bg-white">
          {/* Customer Bonus Section */}
          <div className="flex items-end space-x-8 py-4">
            <div className="flex flex-col">
              <label className="text-md text-primary font-bold mb-2">Customer Bonus</label>
              <input
                type="number"
                placeholder="Customer bonus"
                value={customerBonus}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); 
                  setCustomerBonus(value.toString());
                }}
                min="0"
                className="border p-2 w-65 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md text-primary font-bold mb-2">Validity Days</label>
              <input
                type="number"
                placeholder="Validity days"
                value={customerDays}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setCustomerDays(value.toString());
                }}
                min="0"
                className="border p-2 w-50 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
              <Button onClick={() => handleApplySignupBonus("CUSTOMER", customerBonus, customerDays)} className="py-3 px-6 rounded-full text-lg bg-secondary hover:bg-secondary-700 border-secondary text-white">Apply</Button>
              <Button onClick={() => handleEnableToggle("CUSTOMER", !customerEnabled)} className={`py-3 px-6 rounded-full text-lg ${customerEnabled ? "bg-red-600 hover:bg-red-700 border-red-600 text-white" : "bg-primary hover:bg-primary-700 text-white"}`}>{customerEnabled ? "Disable" : "Enable"}</Button>
          </div>
    
          {/* Service Provider Bonus Section */}
          <div className="flex items-end space-x-8 py-4">
            <div className="flex flex-col">
              <label className="text-md text-primary font-bold mb-2">Service Provider Bonus</label>
              <input
                type="number"
                placeholder="Service provider bonus"
                value={serviceProviderBonus}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); 
                  setServiceProviderBonus(value.toString());
                }}
                min="0"
                className="border p-2 w-65 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md text-primary font-bold mb-2">Validity Days</label>
              <input
                type="number"
                placeholder="Validity days"
                value={serviceProviderDays}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setServiceProviderDays(value.toString());
                }}
                min="0"
                className="border p-2 w-50 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
              <Button onClick={() => handleApplySignupBonus("SERVICE_PROVIDER", serviceProviderBonus, serviceProviderDays)} className="py-3 px-6 rounded-full text-lg bg-secondary hover:bg-secondary-700 border-secondary text-white">Apply</Button>
              <Button onClick={() => handleEnableToggle("SERVICE_PROVIDER", !serviceProviderEnabled)} className={`py-3 px-6 rounded-full text-lg ${serviceProviderEnabled ? "bg-red-600 hover:bg-red-700 border-red-600 text-white" : "bg-primary hover:bg-primary-700 text-white"}`}>{serviceProviderEnabled ? "Disable" : "Enable"}</Button>
          </div>
        </div>
        )}
      </div>
    </div>
  );

}
