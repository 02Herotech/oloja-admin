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
        <h2 className={cn("transition-all text-primary", {
            "text-white": size,
        })}
        >
            {children}
        </h2>
    )
}