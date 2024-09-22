"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { fetchData } from "../../../services/icService";

interface ImageData {
  src: string;
  altText?: string;
  title?: string;
  price?: number;
  stock?: number;
}

const Content: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    const loadImageData = async () => {
      try {
        const data: ImageData[] = await fetchData();
        console.log(data, "line 17");
        setImageData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch image data", error);
      }
    };

    loadImageData();
  }, []);

  console.log(imageData[0], "line 27");

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 pt-32 max-w-6xl mx-auto fsac4 md:px-1 px-3 pb-96">
        <div className="w-full md:h-screen md:p-5 md:w-auto">
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search ..."
                className="w-full px-4 py-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="selectType">Select Type</label>
              <select
                id="selectType"
                className="w-full px-4 py-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" className="text-black">
                  Select Type
                </option>
                <option value="" className="text-black">
                  Option 1
                </option>
                <option value="" className="text-black">
                  Option 2
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="h-auto md:h-screen w-full p-5">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[250px] flex flex-col border border-[#393556] animate-pulse"
                >
                  <div className="bg-gray-300 h-[304px] w-full"></div>
                  <div className="p-2 gap-2">
                    <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                    <div className="flex justify-between w-full">
                      <div className="bg-gray-300 h-4 w-1/4"></div>
                      <div className="bg-gray-300 h-4 w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageData.map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[250px] flex flex-col border border-[#393556]"
                >
                  <Image
                    src={image}
                    alt={image.altText || "Image"}
                    width={292}
                    height={304}
                    className="sm:h-max-[300px] h-[300px]"
                  />
                  <div className="p-2 gap-2">
                    <span>{image.title || "Untitled"}</span>
                    <div className="flex justify-between w-full">
                      <small className="text-[#FFD166]">{image.price ? `${image.price} ETH` : "N/A"}</small>
                      <small>in stock: {image.stock ?? "N/A"}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
