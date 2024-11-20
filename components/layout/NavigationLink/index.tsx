import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinkProps = {
    link: {
        name: string;
        to: string;
        icon: React.ReactNode;
    };
};

const NavigationLink = ({ link }: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname.includes(link.to);

    return (
        <>
            {/* Desktop Navigation */}
            <li className="hidden lg:block">
                <Link
                    href={link.to}
                    className={cn(
                        "block transition-all rounded-lg font-clashMedium w-full px-4 py-3",
                        {
                            "bg-secondary rounded": isActive,
                        }
                    )}>
                    <div className="flex items-center space-x-8">
                        <div
                            className={cn("transition-all [&>svg]:transition-all [&>svg>path]:transition-all", {
                                "[&>svg>path]:stroke-white [&>svg>path]:fill-transparent": isActive,
                                "[&>svg>path]:stroke-primary [&>svg>path]:fill-transparent": !isActive,
                            })}>
                            {link.icon}
                        </div>
                        <div
                            className={cn("transition-all text-primary", {
                                "text-white": isActive,
                            })}
                        >
                            {link.name}
                        </div>
                    </div>
                </Link>
            </li>

            {/* Mobile Navigation */}
            <li className="lg:hidden list-none">
                <Link href={link.to}>
                    <div className="flex items-center justify-center">
                        <div
                            className={cn(
                                "transition-all [&>svg]:transition-all [&>svg>path]:transition-all",
                                {
                                    "[&>svg>path]:stroke-white [&>svg>path]:fill-transparent p-3 rounded-full bg-secondary": isActive,
                                    "[&>svg>path]:stroke-primary [&>svg>path]:fill-transparent": !isActive,
                                }
                            )}>
                            {link.icon}
                        </div>
                    </div>
                </Link>
            </li>
        </>
    );
};

export default NavigationLink;