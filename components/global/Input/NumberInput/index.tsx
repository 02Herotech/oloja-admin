import React from "react";
import { useFormContext } from "react-hook-form";
import Icons from "@/components/icons";

interface NumberInputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    prefixSign?: string;
    suffixSign?: string;
}

export const NumberInputField = ({
                                     id,
                                     label,
                                     placeholder,
                                 }: NumberInputFieldProps) => {
    const { register, setValue, watch } = useFormContext();
    const value = watch(id);

    const incrementValue = () => {
        setValue(id, (value || 0) + 1);
    };

    const decrementValue = () => {
        setValue(id, Math.max(0, (value || 0) - 1));
    };

    return (
        <div className="max-w-[400px] w-full">
            <label htmlFor={id} className="block text-sm font-medium text-primary mb-1">
                {label}
            </label>
            <div className="relative flex items-center">
                <input
                    id={id}
                    {...register(id, { valueAsNumber: true })}
                    placeholder={placeholder}
                    type="number"
                    className="border border-[#DFE3EA] w-full p-2 text-center rounded-xl focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center">
                    <button type="button" onClick={incrementValue} className="w-8 h-4 flex items-center justify-center rounded-tr-md transition">
                        <Icons.NumberPlus />
                    </button>
                    <button type="button" onClick={decrementValue} className="w-4 h-2 flex items-center justify-center rounded-br-md transition">
                        <Icons.NumberMinus />
                    </button>
                </div>
            </div>
        </div>
    );
};