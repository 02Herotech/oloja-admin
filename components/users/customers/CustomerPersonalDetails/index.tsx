import React from "react";
import { Mail, Calendar, Phone, MapPin } from "lucide-react";
import { User } from "@/types/services/users";
import { formatDate } from "@/lib/utils";
import DocumentCard from "../../DocumentCard";

interface CustomerPersonalDetailsProps {
  userData: User;
}

export const CustomerPersonalDetails = ({
  userData,
}: CustomerPersonalDetailsProps) => {
  const fullAddress = [
    userData.userAddress?.suburb,
    userData.userAddress?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const fullNames = [userData.firstName, userData.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-8 lg:space-y-10">
      <div>
        <h2 className="text-lg lg:text-2xl text-tc-dark font-satoshiBold font-semibold mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4 text-gray-600 mb-2">
              <Mail className="size-7" />
              {userData.emailAddress}
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-2">
              <Calendar className="size-7" />
              {formatDate(userData.dateOfBirth)}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <Phone className="size-7" />
              {userData.phoneNumber || "N/A"}
            </div>
          </div>
          <div>
            <h3 className="text-base lg:text-xl text-tc-dark font-satoshiBold font-semibold mb-2">
              Address
            </h3>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="size-7 flex-shrink-0" />
              <span>{fullAddress || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Documents / Account Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentCard
          title="ID Documents"
          fileName={`${fullNames}_ID_Documents`}
          fileType="PDF File"
          fileSize="165 MB"
        />
        <div className="">
          <h2 className="text-base lg:text-xl text-tc-dark font-satoshiBold font-semibold mb-4">
            Account Status
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-satoshiMedium">Account State:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  userData.accountState === "NOT_VERIFIED"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {userData.accountState.replace("_", " ")}
              </span>
            </div>
            {userData.deactivatedAt && (
              <div>
                <span className="font-satoshiMedium">Deactivated At:</span>
                <span className="ml-2">
                  {formatDate(userData.deactivatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
