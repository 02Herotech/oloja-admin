import { useState } from "react";

export default function SignupBonus() {
  const [customerBonus, setCustomerBonus] = useState("");
  const [serviceProviderBonus, setServiceProviderBonus] = useState("");
  const [applyToCustomer, setApplyToCustomer] = useState(false);
  const [applyToService, setApplyToService] = useState(false);
  const [applyToBoth, setApplyToBoth] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold">Sign up Bonus</h2>
        <p className="text-gray-600">Fill these fields</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="customerBonus" className="block font-medium">Customer Bonus</label>
            <input
              id="customerBonus"
              type="number"
              placeholder="Enter bonus"
              value={customerBonus}
              onChange={(e) => setCustomerBonus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="serviceProviderBonus" className="block font-medium">Service Provider Bonus</label>
            <input
              id="serviceProviderBonus"
              type="number"
              placeholder="Enter bonus"
              value={serviceProviderBonus}
              onChange={(e) => setServiceProviderBonus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="applyToCustomer"
              type="checkbox"
              checked={applyToCustomer}
              onChange={() => setApplyToCustomer(!applyToCustomer)}
              className="w-4 h-4"
            />
            <label htmlFor="applyToCustomer" className="font-medium">Apply to Customer</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="applyToService"
              type="checkbox"
              checked={applyToService}
              onChange={() => setApplyToService(!applyToService)}
              className="w-4 h-4"
            />
            <label htmlFor="applyToService" className="font-medium">Apply to Service</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="applyToBoth"
              type="checkbox"
              checked={applyToBoth}
              onChange={() => setApplyToBoth(!applyToBoth)}
              className="w-4 h-4"
            />
            <label htmlFor="applyToBoth" className="font-medium">Apply to Both</label>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Save Changes</button>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">Disable</button>
        </div>
      </div>
    </div>
  );
}
