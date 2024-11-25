"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/global/Button";

interface UserCardProps {
    name: string;
    role: 'admin' | 'customer' | 'provider';
    dateJoined: string;
    image?: string;
    id: number;
}

const UserCard = ({ name, role, dateJoined, image, id }: UserCardProps) => {
    const router = useRouter();
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-[#EBE9F4]';
            case 'customer':
                return 'bg-[#FE9B07]';
            case 'provider':
                return 'bg-primary';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="rounded-2xl border border-[#8B899247] overflow-hidden">
            <div className="flex">
                <div className={`w-2 ${getRoleColor(role)}`}></div>
                <div className="flex-1 py-3 pl-2 pr-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={name}
                                    width={100}
                                    height={100}
                                    className="rounded-full size-12 object-fit"
                                />
                            ) : (
                                <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-600 font-medium">{name.charAt(0)}</span>
                                </div>
                            )}
                            <div className="space-y-1 lg:space-y-2 text-primary capitalize">
                                <h3 className="lg:text-xl font-satoshiBold">{name}</h3>
                                <p className="text-sm lg:text-base">{role}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-500">Joined {dateJoined}</p>
                            <Button
                                onClick={() => router.push(`/users/${role}s/${id}`)}
                                className="text-sm font-satoshiMedium rounded-full mt-2"
                                size="sm"
                            >
                                View 
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
