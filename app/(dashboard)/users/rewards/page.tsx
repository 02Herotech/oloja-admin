'use client'

import Button from "@/components/global/Button";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useApplySignupBonusMutation, useGetSignupBonusDetailsQuery } from "@/services/users"; // Adjust path as needed

export default function SignupBonus() {
  const { data, isLoading } = useGetSignupBonusDetailsQuery();
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
      setCustomerEnabled(customerBonusData?.status === "ACTIVE");
  
      setServiceProviderBonus(serviceProviderBonusData?.amount?.toString() || "");
      setServiceProviderDays(serviceProviderBonusData?.validityDays?.toString() || "");
      setServiceProviderEnabled(serviceProviderBonusData?.status === "ACTIVE");
    }
  }, [data]);  

  const handleApplySignupBonus = async (role: string, amount: string, validityDays: string) => {
    try {
      await applySignupBonus({ role, amount, validityDays, status }).unwrap();
    } catch (error) {
      console.error("Error applying signup bonus:", error);
    }
  };

  const handleEnableToggle = async (role: string, enabled: boolean) => {
    try {
      const isCustomer = role === "CUSTOMER";
  
      const amount = isCustomer ? customerBonus : serviceProviderBonus;
      const validityDays = isCustomer ? customerDays : serviceProviderDays;
  
      await applySignupBonus({
        role,
        amount,
        validityDays,
        status: enabled ? "ENABLED" : "DISABLED",
      }).unwrap();
  
      if (isCustomer) {
        setCustomerEnabled(enabled);
      } else {
        setServiceProviderEnabled(enabled);
      }
    } catch (error) {
      console.error("Error toggling enable state:", error);
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[-6.5rem]">
      <div className="w-full p-24 bg-white shadow-none rounded-3xl">
        <h2 className="text-5xl font-bold">Sign up Bonus</h2>
        <p className="text-gray-600 text-xl mt-4">Fill in the details below and apply the changes to all user types</p>

        {isLoading ? (
          <p className="text-center text-xl mt-10">Loading signup bonuses...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-10 mt-16">
              <div className="flex flex-col space-y-2">
                <label htmlFor="customerBonus" className="text-primary font-bold text-md">Customer Bonus</label>
                <div className="flex items-center space-x-4">
                  <input
                    id="customerBonus"
                    type="number"
                    placeholder="Enter customer bonus"
                    value={customerBonus}
                    onChange={(e) => setCustomerBonus(e.target.value)}
                    className="w-5/12 px-4 py-3 mr-8 text-lg border rounded-xl focus:border-primary focus:outline-none"
                  />
                  <input
                    id="customerDays"
                    type="number"
                    placeholder="Validity days"
                    value={customerDays}
                    onChange={(e) => setCustomerDays(e.target.value)}
                    className="w-5/12 px-4 py-3 mr-8 text-lg border rounded-xl focus:border-primary focus:outline-none"
                  />
                  <Button
                    onClick={() => handleApplySignupBonus("CUSTOMER", customerBonus, customerDays)}
                    className="py-3 px-10 rounded-full text-lg bg-secondary hover:bg-secondary-700 border-secondary text-white"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => handleEnableToggle("CUSTOMER", !customerEnabled)}
                    className={`py-3 px-10 rounded-full text-lg ${customerEnabled ? "bg-primary hover:bg-primary-700 text-white" : "bg-red-600 hover:bg-red-700 border-red-600 text-white"}`}
                  >
                    {customerEnabled ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="serviceProviderBonus" className="text-primary font-bold text-md">Service Provider Bonus</label>
                <div className="flex items-center space-x-4">
                  <input
                    id="serviceProviderBonus"
                    type="number"
                    placeholder="Enter service provider bonus"
                    value={serviceProviderBonus}
                    onChange={(e) => setServiceProviderBonus(e.target.value)}
                    className="w-5/12 px-4 py-3 mr-8 text-lg border rounded-xl focus:border-primary focus:outline-none"
                  />
                  <input
                    id="serviceProviderDays"
                    type="number"
                    placeholder="Validity days"
                    value={serviceProviderDays}
                    onChange={(e) => setServiceProviderDays(e.target.value)}
                    className="w-5/12 px-4 py-3 mr-8 text-lg border rounded-xl focus:border-primary focus:outline-none"
                  />
                  <Button
                    onClick={() => handleApplySignupBonus("SERVICE_PROVIDER", serviceProviderBonus, serviceProviderDays)}
                    className="py-3 px-10 rounded-full text-lg bg-secondary hover:bg-secondary-700 border-secondary text-white"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => handleEnableToggle("SERVICE_PROVIDER", !serviceProviderEnabled)}
                    className={`py-3 px-10 rounded-full text-lg ${serviceProviderEnabled ? "bg-primary hover:bg-primary-700 text-white" : "bg-red-600 hover:bg-red-700 border-red-600 text-white"}`}
                  >
                    {serviceProviderEnabled ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
