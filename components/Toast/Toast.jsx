import { useEffect, useState } from "react";

export default function Toast({ message, isError }) {
    if (!message || isError === null) return null

    useEffect(() => {
        const toast = document.getElementById("toast")
        
        if (toast) {
            toast.style.opacity = 1
            toast.style.transform = "translateY(0)"
        }

        const closeToast = setTimeout(() => {
            if (toast) {
                toast.style.opacity = 0
                toast.style.transform = "translateY(-15px)"
            }
        }, 3500)

        return () => clearTimeout(closeToast)
    }, [message, isError])
    return (
        <div 
            id="toast" 
            style={{ 
                opacity: "0", 
                transform: "translateY(-15px)",
                transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
            }} 
            className={`pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 ${isError ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between z-40 w-[90%] md:w-auto md:max-w-md`}
        >
            <div className="flex items-center w-full justify-center md:justify-start">
                {isError ? (
                    <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
                <span className="text-sm sm:text-base truncate md:whitespace-normal">{message}</span>
            </div>
        </div>
    );
}