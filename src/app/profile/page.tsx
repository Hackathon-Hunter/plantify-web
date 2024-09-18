"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { BasicButton } from "@/components/Button";

export default function Profile() {
  return (
    <div>
      <Header />
      <div className="h-screen md:h-screen w-full p-5 md:flex-row gap-6 pt-32 max-w-6xl mx-auto px-3 md:px-1">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
            height={50}
            width={50}
            className="rounded-full h-[50px] h-max[50px] w-max-[50px] w-[50px] object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[18px]">John Doe</span>
            <span className="text-[14px] text-slate-300">
              johndoe@gmail.com
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-10">
          <span className="text-[24px] font-semibold">
            List Plant Purchased
          </span>

          {[...Array(3)].map((_, index) => (
            <div
              className="border rounded-md p-4 flex justify-between"
              key={index}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="profile"
                  height={50}
                  width={50}
                  className="rounded-md h-[50px] h-max[50px] w-max-[50px] w-[50px] object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-md font-semibold block mb-1">
                    Lonely as always
                  </span>
                  <small className="text-[#FFD166]">2.00 ETH</small>
                </div>
              </div>
              <BasicButton link="/" title="Detail" fullWidth={false} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
