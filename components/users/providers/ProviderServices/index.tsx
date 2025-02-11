import React, { useState } from "react";
import {
    GetServiceProviderByIdResponse,
    ServiceProviderListing,
} from "@/types/services/users/service-providers";
import {ServiceCard} from "@/components/users/providers/ProviderServices/view-service/ServiceCard";
import {
    ViewService
} from "@/components/users/providers/ProviderServices/view-service";


interface ServicePostedProps {
    userData: GetServiceProviderByIdResponse;
}

export const ServicesPosted: React.FC<ServicePostedProps> = ({ userData }) => {
    const [selectedService, setSelectedService] = useState<ServiceProviderListing | null>(null);

    return (
        <div className="py-4">
            <h2 className="text-lg font-satoshiMedium mb-4">
                All Services: ({userData.serviceProviderListing.length})
            </h2>
            {selectedService ? (
                <ViewService service={selectedService} onClose={() => setSelectedService(null)} />
            ) : (
                userData.serviceProviderListing.length > 0 ? (
                    userData.serviceProviderListing.map((service) => (
                        <ServiceCard
                            key={service.id}
                            listing={service}
                            onClick={() => setSelectedService(service)}
                        />
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-8">
                        No Services posted yet
                    </div>
                )
            )}
        </div>
    );
};