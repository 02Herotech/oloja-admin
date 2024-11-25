import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    children: string;
    size?: "sm" | "md" | "lg"
}

export const SectionHeader = ({
    children,
    size = "md"
}: SectionHeaderProps) => {

    return (
        <h2 className={cn("font-bold font-satoshiBold text-2xl lg:text-5xl text-tc-dark", {
            "": size,
        })}
        >
            {children}
        </h2>
    )
}