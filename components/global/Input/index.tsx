/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { InputProps } from "@/types/global/InputTypes";

type ValidationResult = boolean | string;

export type ValidationRules = {
    email: (value: string, label?: string) => ValidationResult;
    required: (value: string, label?: string) => ValidationResult;
    phone: (value: string, label?: string) => ValidationResult;
    altPhone: (value: string, label?: string) => ValidationResult;
    password: (value: string, label?: string) => ValidationResult;
    otp: (value: string, label?: string) => ValidationResult;
    bvn: (value: string, label?: string) => ValidationResult;
    confirmPassword: (value: string, label?: string) => ValidationResult;
    noSpaces: (value: string, label?: string) => ValidationResult;
    NGNBankAccountNumber: (value: string, label?: string) => ValidationResult;
    textOnly: (value: string, label?: string) => ValidationResult;
};

const Input = ({
                   label,
                   placeholder,
                   type = "text",
                   id,
                   onChange = () => { },
                   max,
                   min,
                   pattern,
                   rules = [],
                   name,
                   autoComplete = "off",
                   disabled = false,
                   theme = "outline",
                   focused = false,
                   optional = false,
                   className = "",
                   showPassword: _showPassword = false,
                   left,
                   right,
                   paddingLeft = "",
                   paddingRight = "",
                   customError,
                   customMessage,
                   characters = 50,
                   hint,
                   info = {},
                   tag = "input",
                   isLoading = false,
                   ...rest
               }: InputProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(_showPassword);
    const [passwordCheck, setPasswordCheck] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        length: false,
    });
    const [passwordIsDirty, setPasswordIsDirty] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const methods = useFormContext();

    const {
        watch,
        formState: { isDirty },
    } = methods;

    const validationRules: ValidationRules = {
        required: (value, label = "") => {
            if (value !== null && value !== undefined && value !== "") return true;
            else return `The ${label} field is required`;
        },
        email: (value, label = "") => {
            const match = value
                .toString()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            return match ? true : `Please enter a valid email`;
        },
        password: (value, label = "") => {
            const messages: string[] = [];

            if (!/[A-Z]/g.test(value)) {
                messages.push("an uppercase letter");
            }
            if (!/[a-z]/g.test(value)) {
                messages.push("a lowercase letter");
            }
            if (!/[0-9]/g.test(value)) {
                messages.push("a number");
            }
            if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g.test(value)) {
                messages.push("a special character");
            }
            if (value.length < 8) {
                messages.push("at least 8 digits");
            }

            const message =
                messages.length > 1
                    ? `${messages.slice(0, -1).join(", ")} and ${messages.slice(-1)}`
                    : `${messages.join(", ")}`;
            return messages.length > 0
                ? `The ${label} field must have ${message}`
                : true;
        },
        otp: (value, label = "") => {
            return value.length === 6
                ? true
                : `The ${label} field must be of length 6`;
        },
        bvn: (value, label = "") => {
            return value?.length === 11
                ? true
                : `The ${label} field must be of length 11`;
        },
        phone: (value, label = "") => {
            return value.length <= 10
                ? true
                : `The ${label} field must be less than or equal to 12 digits`;
        },
        altPhone: (value, label = "") => {
            return value.length <= 12
                ? true
                : `The ${label} field must be less than or equal to 12 digits`;
        },
        confirmPassword: (value, label = "") => {
            return value === watch("password") || value === watch("new_password")
                ? true
                : `The ${label} field must be equal to the Password field`;
        },
        noSpaces: (value, label = "") => {
            return !value.includes(" ")
                ? true
                : `The ${label} field is not allowed to contain spaces`;
        },
        NGNBankAccountNumber: (value, label = "") => {
            return value.length === 10
                ? true
                : `The ${label} field must be equal to 10 digits`;
        },
        textOnly: (value, label = "") => {
            return /^[a-zA-Z\s]*$/.test(value)
                ? true
                : `The ${label} field must contain only alphabets`;
        }
    };

    const computedRules = rules.reduce<{
        [index: string]: (param: string) => ValidationResult;
    }>((map, key) => {
        map[key] = (value) => validationRules[key](value, label || name);
        return map;
    }, {});

    const { error } = methods.getFieldState(name);

    const register = methods.register(name, {
        validate: computedRules,

        pattern: pattern
            ? {
                value: new RegExp(pattern),
                message:
                    errorMessage ||
                    `The ${label} field doesn't satisfy the regex ${pattern}`,
            }
            : undefined,
        min: min
            ? {
                value: min,
                message: `The ${label} field must be greater than or equal to ${min}`,
            }
            : undefined,
        max: max
            ? {
                value: max,
                message: `The ${label} field must be less than or equal to ${max}`,
            }
            : undefined,
    });

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const watchPassword = watch("password") || watch("new_password") || "";

    const value = watch(name);

    useEffect(() => {
        setPasswordCheck({
            ...passwordCheck,
            uppercase: /[A-Z]/g.test(watchPassword),
            lowercase: /[a-z]/g.test(watchPassword),
            number: /[0-9]/g.test(watchPassword),
            special: /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g.test(watchPassword),
            length: watchPassword?.length >= 8,
        });
    }, [watchPassword]);

    const inputTheme = (theme: string) => {
        switch (theme) {
            case "outline":
                return `p-4 bg-white text-tc-secondary border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] ${error
                    ? "border-[#E98282] focus:border-[#E98282]"
                    : "border-[#5B5B66] focus:border-primary"
                }`;
            case "plain":
                return "p-4 bg-transparent border-[1.5px] border-transparent";
            default:
                return "bg-white border-[1.5px] border-[#5B5B66]";
        }
    };

    if (tag === "textarea")
        return (
            <label htmlFor={id} className='flex flex-col relative'>
                <span className='w-full flex items-center space-x-2 text-base text-left leading-5 mb-2'>
                    <span className='capitalize text-[#333236] font-satoshiMedium text-sm'>{label}</span>
                </span>
                <textarea
                    {...register}
                    className={cn(
                        "w-full active:border-primary text-tc-main focus:bg-pc-02",
                        inputTheme(theme),
                        "text-sm overflow-hidden font-normal rounded-[10px] outline-none",
                        className
                    )}
                    rows={10}
                    placeholder={placeholder}
                    id={id}
                    onChange={(event) => {
                        register.onChange(event);
                        onChange(event as any);
                    }}
                    ref={(e) => {
                        register.ref(e);
                    }}
                    disabled={disabled}
                />

                {/* <span
					className={cn(
						"text-sm text-primary font-medium absolute right-0 -bottom-6",
						{ "text-[#E98282]": value.length > characters - 25 }
					)}>
					{value.length}/{characters}
				</span> */}

                {!rules.includes("password") && (error || customError) && (
                    <span className='text-[18px] text-left mt-2 text-[#E98282]'>
                        *{customError || error?.message}
                    </span>
                )}
            </label>
        );

    return (
        <div>
            <span className='w-full flex items-center space-x-2 text-base mb-[6px] text-left leading-5'>
                <span className='capitalize text-[#333236] font-satoshiMedium text-sm'>{label}</span>
            </span>
            <label htmlFor={id} className='flex flex-col relative'>

                <input
                    onFocus={() => setPasswordIsDirty(true)}
                    {...register}
                    className={`w-full active:border-primary text-dark ${inputTheme(
                        theme
                    )} text-base h-12 overflow-hidden font-normal rounded-[10px] outline-none ${className} ${type === "password" ? "pr-16" : ""
                    } ${left ? paddingLeft : ""} ${right ? paddingRight : ""}`}
                    type={showPassword ? "text" : type}
                    placeholder={placeholder}
                    id={id}
                    onChange={(event) => {
                        register.onChange(event);
                        onChange(event);
                    }}
                    ref={(e) => {
                        register.ref(e);
                        inputRef.current = e;
                    }}
                    disabled={disabled}
                    {...rest}
                />
                {type === "password" && (
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute focus:border-primary focus:outline-primary flex items-center justify-center w-12 right-[2px] top-2 cursor-pointer'>
                        {!showPassword ? <IoMdEye className="w-7 h-7" /> : <IoMdEyeOff className="w-7 h-7" />}
                    </button>
                )}

                {right && (
                    <div className='absolute flex items-center justify-center h-[44px] right-[2px] top-[30px]'>
                        {right}
                    </div>
                )}

                {left && (
                    <div className='absolute flex items-center justify-center h-[44px] left-[2px] top-[30px]'>
                        {left}
                    </div>
                )}

                {!rules.includes("password") && (error || customError) && (
                    <span className='text-sm flex items-center space-x-1 mt-2 text-status-error-100'>
                        <MdErrorOutline className="text-status-error-100 h-5 w-5" />
                        <h6>{customError || error?.message}</h6>
                    </span>
                )}

                {passwordIsDirty && rules.includes("password") && (
                    <div className='text-sm mt-3 space-y-2'>
                        <div className="flex items-start text-[12px]">
                            {(!passwordCheck.lowercase || !passwordCheck.uppercase) && (
                                <MdErrorOutline className="mr-4 text-status-error-100 h-5 w-5" />
                            )}
                            {!passwordCheck.lowercase && (
                                <span className="text-status-error-100 mr-1">
                                    A lowercase
                                    {!passwordCheck.uppercase && <span> and uppercase letter</span>}
                                </span>
                            )}
                            {!passwordCheck.uppercase && passwordCheck.lowercase && (
                                <span className="text-status-error-100">
                                    An uppercase letter
                                </span>
                            )}
                        </div>

                        <div
                            className={
                                passwordCheck.length
                                    ? "hidden"
                                    : "text-status-error-100 text-[12px] flex items-center space-x-4"
                            }>
                            <MdErrorOutline className="w-5 h-5" />
                            <span className=''>At least 8 characters</span>
                        </div>

                        <div className="flex items-start text-[12px]">
                            {(!passwordCheck.special || !passwordCheck.number) && (
                                <MdErrorOutline className="mr-4 text-status-error-100 h-5 w-5" />
                            )}
                            {!passwordCheck.special && (
                                <span className="text-status-error-100 mr-1">
                                    1 special character
                                    {!passwordCheck.number && <span> and 1 number</span>}
                                </span>
                            )}
                            {!passwordCheck.number && passwordCheck.special && (
                                <span className="text-status-error-100">
                                    1 number
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {customMessage && (
                    <span className='text-sm text-left mt-2 text-status-success-100'>
                        {customMessage}
                    </span>
                )}

                {hint && !customError && !error && !customMessage && (
                    <span className='text-sm text-left mt-2 text-tc-03'>{hint}</span>
                )}
            </label>
        </div>
    );
};

export default Input;