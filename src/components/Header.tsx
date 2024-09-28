"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import useWallet from '@/hooks/use-wallet';

import { BasicButton } from "./Button";

export default function Header() {
  const wallet = useWallet();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);
  console.log(wallet.walletLoading, 'lin e32')

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full text-white z-50 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 flex justify-between items-center">
        <div className="text-3xl font-medium">
          <img src="/img/plantify.png" alt="Local Image" className="h-8" />
        </div>

        <nav className="hidden md:flex space-x-8 items-center">
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/")}
          >
            Home
          </a>
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/about")}
          >
            About
          </a>
          <a
            className="cursor-pointer text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/marketplace")}
          >
            Marketplace
          </a>
          <BasicButton
            onclick={wallet.connect}
            title={wallet.isConnected ? "Wallet Connected" : "Connect Wallet"}
            size="small"
            loading={wallet.walletLoading}
            isDisable={wallet.isConnected}
            fullWidth={false} />
        </nav>

        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
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

      {isMenuOpen && (
        <nav className="md:hidden bg-black text-white space-y-4 px-5 py-4">
          <a
            className="block text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/")}
          >
            Home
          </a>
          <a
            className="block text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/about")}
          >
            About
          </a>
          <a
            className="block text-gray-300 hover:text-white font-semibold"
            onClick={() => handleNavigation("/marketplace")}
          >
            Marketplace
          </a>
          <BasicButton
            onclick={() => router.push("/login")}
            title="Connect Wallet"
            size="small"
            fullWidth={true}
          />
        </nav>
      )}
    </header>
  );
}
