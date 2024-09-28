import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    onclick: () => void;
    title: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth: boolean;
    isDisable?: boolean;
}

export const BasicButton: React.FC<ButtonProps> = ({ onclick, title, size = 'medium', fullWidth = false, isDisable = false, }) => {
    const sizeClasses = {
        small: 'py-2 px-6 text-sm',
        medium: 'py-3 px-10 text-md',
        large: 'py-4 px-14 text-lg',
    };
    return (
        <button
            onClick={onclick}
            disabled={isDisable}
            className={`inline-flex items-center justify-center font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform ${fullWidth ? 'w-full' : 'w-auto'} ${sizeClasses[size]} focus:shadow-outline rounded-lg ${isDisable
                ? 'bg-gray-400 cursor-not-allowed' // Apply gray color and disable interaction
                : 'bg-gradient-to-r from-blue-800 to-teal-500'
                }`}
        >
            <span className="flex items-center justify-center">{title}</span>
        </button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ onclick, title, size = 'medium', isDisable = false, }) => {
    const sizeClasses = {
        small: 'py-2 px-6 text-sm',
        medium: 'py-3 px-10 text-md',
        large: 'py-4 px-14 text-lg',
    };
    return (
        <button onClick={onclick} className={`inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white ${sizeClasses[size]} md:mt-0 hover:text-black hover:bg-white focus:shadow-outline rounded-full ${isDisable
            ? 'bg-gray-400 cursor-not-allowed' // Apply gray color and disable interaction
            : 'bg-gradient-to-r from-blue-800 to-teal-500'
            }`}>
            <div className="flex">
                <span className="justify-center">{title}</span>
            </div>
        </button>
    );
}

export const BorderButton: React.FC<ButtonProps> = ({ onclick, title, size = 'medium', isDisable = false, }) => {
    const sizeClasses = {
        small: 'py-2 px-6 text-sm',
        medium: 'py-3 px-10 text-md',
        large: 'py-4 px-14 text-lg',
    };
    return (
        <button onClick={onclick} className={`inline-flex items-center font-semibold tracking-tighter text-white transition duration-500 ease-in-out ${sizeClasses[size]} transform bg-transparent border border-white rounded-full focus:shadow-outline ${isDisable
            ? 'bg-gray-400 cursor-not-allowed' // Apply gray color and disable interaction
            : 'bg-gradient-to-r from-blue-800 to-teal-500'
            }`}>
            <div className="flex">
                <span className="justify-center">{title}</span>
            </div>
        </button>
    );
}