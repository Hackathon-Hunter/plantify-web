"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header
      className={`fixed top-0 w-full text-white z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 flex justify-between items-center">
        <div className="text-3xl font-medium">
          <img src="/img/plantify.png" alt="Local Image" className="h-8" />
        </div>

        <nav className="hidden md:flex space-x-8">
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/")}
          >
            Home
          </a>
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
          >
            About
          </a>
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/marketplace")}
          >
            Marketplace
          </a>
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
          >
            How It Works
          </a>
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
