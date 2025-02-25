'use client'

import Button from "@/components/global/Button";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Popup from "@/components/global/Popup";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useSaveRewardPointsMutation, useGetRewardPointsQuery } from "@/services/users";
import { Loader2 } from "lucide-react";

export default function RewardPoints() {
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [rewards, setRewards] = useState<{ fixedAmount: number; role: string; status: string; type: string }[]>([]);
  
  const { data, isLoading, refetch } = useGetRewardPointsQuery();
  const [saveRewardPoints] = useSaveRewardPointsMutation();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRewards(data);
    }
  }, [data]);

  const handleSaveRewardPoints = async (role, fixedAmount, type, enabled) => {
    try {
      await saveRewardPoints({ role, fixedAmount, type, status: enabled ? "ENABLED" : "DISABLED" }).unwrap();
      refetch();
      setPopupMessage(`Reward for ${type.replace(/_/g, " ")} saved successfully!`);
      setIsSuccess(true);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error saving reward points:", error);
      setPopupMessage("Failed to save reward points. Please try again.");
      setIsSuccess(false);
      setIsPopupOpen(true);
    }
  };

  const handleEnableToggle = async (role: string, enabled: boolean) => {
    try {
      const newStatus = enabled ? "ENABLED" : "DISABLED";

      await saveRewardPoints({
        role,
        fixedAmount: rewards.find((r) => r.role === role)?.fixedAmount || 0,
        type: rewards.find((r) => r.role === role)?.type || "",
        status: newStatus,
      }).unwrap();

      setRewards(prevRewards =>
        prevRewards.map(r => (r.role === role ? { ...r, status: newStatus } : r))
      );

      refetch();
    } catch (error) {
      console.error("Error toggling enable state:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden max-w-screen-xl mx-auto">
      <div className="w-full h-full flex flex-col bg-white p-6">
        <h2 className="text-5xl font-bold mt-3">Reward Points</h2>
        <p className="text-gray-600 text-xl mt-4">Assign point values to tasks and apply changes easily</p>

        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} popUpTitle="">
          <AnimatePresence>
            <motion.div className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl px-5 py-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {isSuccess ? (
                <>
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#4CAF50]">
                    <FaCheck className="text-white" />
                  </div>
                  <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-primary lg:text-3xl">Success!</h1>
                  <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">{popupMessage}</h4>
                </>
              ) : (
                <>
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#FF5722]">
                    <FaExclamationTriangle className="text-white" />
                  </div>
                  <h1 className="text-center font-clashSemiBold text-2xl font-semibold text-red-600 lg:text-3xl">Error!</h1>
                  <h4 className="text-center font-satoshiMedium text-xl font-medium text-[#140B31]">{popupMessage}</h4>
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
            <div className="mt-2 flex flex-col">
              {rewards.map((reward, index) => (
                <div key={index} className="flex items-center space-x-6 mt-6">
                  <span className="mt-6 text-lg font-semibold flex-shrink-0">
                    {reward.type.replace(/_/g, " ")}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-md text-primary font-semibold ml-6">Points value</span>
                    <input 
                      type="number" 
                      placeholder="reward points" 
                      value={reward.fixedAmount} 
                      onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value));
                        setRewards(prevRewards => prevRewards.map((r, i) => i === index ? { ...r, fixedAmount: value } : r));
                      }}
                      min="0"
                      disabled={reward.status !== "ENABLED"} // Disable when status is DISABLED
                      className={`p-3 border border-gray-300 rounded-xl w-32 focus:border-primary focus:outline-none 
                        ${reward.status !== "ENABLED" ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}`}
                    />
                  </div>
                  <Button
                    onClick={() => handleSaveRewardPoints(reward.role, reward.fixedAmount, reward.type, reward.status === "ENABLED")}
                    disabled={reward.status !== "ENABLED"} // Disable button
                    className={`mt-6 py-5 px-6 rounded-full text-lg border-secondary text-white 
                      ${reward.status === "ENABLED" ? "bg-secondary hover:bg-secondary-700" : "bg-gray-400 border-gray-400 text-black cursor-not-allowed"}`}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => handleEnableToggle(reward.role, reward.status !== "ENABLED")}
                    className={`mt-6 py-5 px-8 rounded-full text-lg text-white 
                      ${reward.status === "ENABLED" ? "bg-red-600 hover:bg-red-700 border-red-600" : "bg-primary hover:bg-primary-700 border-primary-700"}`}
                  >
                    {reward.status === "ENABLED" ? "Disable" : "Enable"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
