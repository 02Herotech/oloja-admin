'use client'

import Button from "@/components/global/Button";
import { useState, useEffect } from "react";
import { Loader2 } from 'lucide-react'
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import Popup from "@/components/global/Popup";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";


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

  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);  // Track success or error state


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
      setPopupMessage(`${role} bonus saved successfully!`);
      setIsSuccess(true); // Set success state
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error saving signup bonus:", error);
      setPopupMessage("Failed to save signup bonus. Please try again.");
      setIsSuccess(false); // Set error state
      setIsPopupOpen(true);
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
    // <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden max-w-screen-xl mx-auto">

      <div className="w-full h-full flex flex-col bg-white">

        <h2 className="text-5xl font-bold mt-3 pl-6">Sign up Bonus</h2>
        <p className="text-gray-600 text-xl mt-4 pl-6">
          Fill in the details below and apply the changes to all user types
        </p>

        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} popUpTitle="">
          <AnimatePresence>
            <motion.div
              className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl px-5 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success Message */}
              {isSuccess ? (
                <>
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#4CAF50]">
                    <FaCheck className="text-white" />
                  </div>
                  <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-primary lg:text-3xl">
                    Success!
                  </h1>
                  <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                    {popupMessage}
                  </h4>
                </>
              ) : (
                /* Error Message */
                <>
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#FF5722]">
                    <FaExclamationTriangle className="text-white" />
                  </div>
                  <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-red-600 lg:text-3xl">
                    Error!
                  </h1>
                  <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">
                    {popupMessage}
                  </h4>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Popup>

        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="animate-spin size-20 text-primary" />
          </div>
        ) : (
          <div className="flex flex-col space-y-6 p-6 rounded-lg shadow-sm bg-white">


          {/* Customer Bonus Section */}
  <div className="flex items-end space-x-8 py-4">
      <div className="flex flex-col">
        <label className="text-md text-primary font-bold mb-2">Customer Bonus Price</label>
        <div className="relative w-65">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 font-bold">$</span>
          <input
            type="number"
            placeholder="0.00"
            value={customerBonus}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setCustomerBonus(value.toString());
            }}
            min="0"
            disabled={!customerEnabled} // Disable when not enabled
            className={`border p-2 pl-8 w-full rounded-xl focus:border-primary focus:outline-none 
              ${!customerEnabled ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}`}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-md text-primary font-bold mb-2">Number of Days</label>
        <input
          type="number"
          placeholder="Valid number of days"
          value={customerDays}
          onChange={(e) => {
            const value = Math.max(0, Number(e.target.value));
            setCustomerDays(value.toString());
          }}
          min="0"
          disabled={!customerEnabled} // Disable when not enabled
          className={`border p-2 w-50 rounded-xl focus:border-primary focus:outline-none 
            ${!customerEnabled ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}`}
        />
      </div>

      <Button
        onClick={() => handleApplySignupBonus("CUSTOMER", customerBonus, customerDays)}
        disabled={!customerEnabled} // Disable button
        className={`py-3 px-6 rounded-full text-lg border-secondary text-white
          ${customerEnabled ? "bg-secondary hover:bg-secondary-700" : "bg-gray-400 border-gray-400 text-black cursor-not-allowed"}`}
      >
        Save Changes
      </Button>

      <Button
        onClick={() => handleEnableToggle("CUSTOMER", !customerEnabled)}
        className={`py-3 px-6 rounded-full text-lg 
          ${customerEnabled ? "bg-red-600 hover:bg-red-700 border-red-600 text-white" : "bg-primary hover:bg-primary-700 text-white"}`}
      >
        {customerEnabled ? "Disable" : "Enable"}
      </Button>
    </div>

    
    {/* Service Provider Bonus Section */}
    <div className="flex items-end space-x-8 py-4">
      <div className="flex flex-col">
        <label className="text-md text-primary font-bold mb-2">Service Provider Bonus Price</label>
        <div className="relative w-65">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 font-bold">$</span>
          <input
            type="number"
            placeholder="Service provider bonus"
            value={serviceProviderBonus}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setServiceProviderBonus(value.toString());
            }}
            min="0"
            disabled={!serviceProviderEnabled} // Disable input when service provider bonus is disabled
            className={`border p-2 pl-8 w-full rounded-xl focus:outline-none 
              ${serviceProviderEnabled ? "focus:border-primary" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-md text-primary font-bold mb-2">Number of Days</label>
        <input
          type="number"
          placeholder="Valid number of days"
          value={serviceProviderDays}
          onChange={(e) => {
            const value = Math.max(0, Number(e.target.value));
            setServiceProviderDays(value.toString());
          }}
          min="0"
          disabled={!serviceProviderEnabled} // Disable input when service provider bonus is disabled
          className={`border p-2 w-50 rounded-xl focus:outline-none 
            ${serviceProviderEnabled ? "focus:border-primary" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
        />
      </div>

      {/* Save Changes Button */}
      <Button
        onClick={() => handleApplySignupBonus("SERVICE_PROVIDER", serviceProviderBonus, serviceProviderDays)}
        disabled={!serviceProviderEnabled} // Disable button when not enabled
        className={`py-3 px-6 rounded-full text-lg border-secondary text-white border-400gray- text-black
          ${serviceProviderEnabled ? "bg-secondary hover:bg-secondary-700" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Save Changes
      </Button>

      {/* Enable/Disable Button */}
      <Button
        onClick={() => handleEnableToggle("SERVICE_PROVIDER", !serviceProviderEnabled)}
        className={`py-3 px-6 rounded-full text-lg 
          ${serviceProviderEnabled ? "bg-red-600 hover:bg-red-700 border-red-600 text-white" 
                                  : "bg-primary hover:bg-primary-700 text-white"}`}
      >
        {serviceProviderEnabled ? "Disable" : "Enable"}
      </Button>
      </div>

        </div>
        )}
      </div>
    </div>
  );

}
