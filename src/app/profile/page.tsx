"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BasicButton } from "@/components/Button";

export default function Profile() {
  const router = useRouter();


  const handleDetail = (image: any, name: any, price: any, description: any) => () => {
    const dataDetail = {
      images: image,
      names: name,
      prices: price,
      descriptions: description
    }

    localStorage.setItem("data_detail", JSON.stringify(dataDetail));
    router.push("./profile/detail");
  }

  return (
    <div>
      <Header />
      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <Image
          src="https://contenthub-static.crypto.com/wp_media/2023/08/TOP-10-NFT-TOKENS-TO-KNOW-IN-2023-.jpg"
          alt="cover"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Profile Section - Side by Side */}
        <div className="relative flex items-center gap-5 -mt-16">
          {/* Profile Image */}
          <Image
            src="/img/teams/nashir.png"
            alt="profile"
            height={100}
            width={100}
            className="rounded-full h-[100px] w-[100px] object-cover border-4 border-white"
          />

          {/* Name and Email - Side by Side */}
          <div className="flex flex-col">
            <span className="text-[24px] font-bold">John Doe</span>
            <span className="text-[16px] text-slate-500">johndoe@gmail.com</span>
          </div>
        </div>

        {/* NFT Purchased Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-52">
          {[...Array(3)].map((_, index) => (
            <div
              className="border rounded-md p-4 flex flex-col items-start"
              key={index}
            >
              {/* NFT Image */}
              <Image
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="nft"
                height={150}
                width={150}
                className="rounded-md object-cover h-[250px] w-[350px]"
              />
              <div className="flex flex-col mt-3 w-full">
                {/* NFT Title */}
                <span className="text-md font-semibold mb-1">
                  NFT #{index + 1}
                </span>
                {/* NFT Price */}
                <small className="text-[#FFD166] mb-3">2.00 ETH</small>
                {/* Detail Button */}
                <BasicButton onclick={handleDetail("", name, 100, "qwejkqjwek")} title="Detail" fullWidth={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
