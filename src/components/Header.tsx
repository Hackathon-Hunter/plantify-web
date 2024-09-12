'use client';

import React, { useState } from "react";
import { BasicButton, BorderButton } from "./Button";

export default function Header() {

  return (
    <header className="fixed top-0 w-full text-white z-50">
      <div className="max-w-7xl mx-auto px-20 py-5 flex justify-between items-center">
        {/* Left Section (Logo) */}
        <div className="text-3xl font-medium">
          <img src="/img/plantify.png" alt="Local Image" className="h-8" />

        </div>

        {/* Right Section (Nav Links) */}
        <div className="flex space-x-8">
          <a className="cursor-pointer text-gray-300 hover:text-white font-semibold">Home</a>
          <a className="cursor-pointer text-gray-300 hover:text-white font-semibold">About</a>
          <a className="cursor-pointer text-gray-300 hover:text-white font-semibold">How It Works</a>
        </div>
      </div>
    </header>
  );
}
