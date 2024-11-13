'use client'

import { ReactNode, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"
import ReactModal from "react-modal"
import ProgressBar from "../ProgressBar"

type ModalProps = {
    children?: ReactNode
    allowClose?: boolean
    shouldCloseOnOverlayClick?: boolean
    onRequestClose?: () => void
    show: boolean
    title?: string
    description?: string
    padding?: boolean
    width?: string
    loading?: boolean
    closeButtonStyle?: string
    showHeaderBorder?: boolean
}

export default function Component({
    children,
    show = false,
    shouldCloseOnOverlayClick = true,
    allowClose = true,
    onRequestClose = () => { },
    title,
    padding = true,
    width = "",
    loading = false,
    showHeaderBorder = false,
    description,
}: ModalProps) {

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [show])

    return (
        <ReactModal
            isOpen={show}
            shouldCloseOnOverlayClick={allowClose && shouldCloseOnOverlayClick}
            onRequestClose={onRequestClose}
            className={cn("flex h-fit w-full relative font-sans", width)}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            ariaHideApp={false}
            closeTimeoutMS={200}
        >
            <motion.section
                layout
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl mx-auto"
            >
                <section
                    className={cn(
                        "bg-white relative rounded-xl overflow-hidden max-h-[90vh] w-full",
                        "sm:max-h-[85vh]"
                    )}
                >
                    {loading && (
                        <div className="absolute overflow-hidden left-0 right-0 top-0">
                            <ProgressBar value={70} />
                        </div>
                    )}
                    <div
                        className={cn("px-4 py-3 sm:px-6 sm:py-4", {
                            "border-b border-gray-200": showHeaderBorder,
                        })}
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1 flex-1">
                                {title && (
                                    <h2 className="text-lg font-medium sm:text-2xl font-clashMedium">{title}</h2>
                                )}
                                {description && (
                                    <p className="text-sm text-gray-500 sm:text-base font-satoshiMedium">
                                        {description}
                                    </p>
                                )}
                            </div>
                            {allowClose && (
                                <button
                                    className="flex justify-center items-center bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                                    aria-label="close"
                                    onClick={onRequestClose}
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                    <section
                        className={cn(
                            "max-h-[calc(90vh-4rem)] sm:max-h-[calc(85vh-5rem)] overflow-y-auto",
                            { "px-4 py-4 sm:px-6 sm:py-6": padding }
                        )}
                    >
                        {children}
                    </section>
                </section>
            </motion.section>
        </ReactModal>
    )
}