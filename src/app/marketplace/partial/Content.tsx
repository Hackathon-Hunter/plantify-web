"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { fetchData } from "../../../services/icService";

const Content: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const responseData = async () => {
      try {
        const data: any = await fetchData();
        setDataContent(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch image data", error);
      }
    };

    responseData();
  }, []);

  const filteredContent = dataContent.filter((token) => {
    const name = token.metadata[0][0].find(([key]) => key === "name")?.[1]?.Text || "Untitled";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDetail = (
    image?: string,
    name?: string,
    price?: string,
    description?: string,
    location?: string,
    harvestTime?: string,
    harvestProfit?: string,
    sizeArea?: string
  ) => () => {
    router.push(
      `/marketplace/detail?image=${encodeURIComponent(image)}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&harvestTime=${encodeURIComponent(harvestTime)}&harvestProfit=${encodeURIComponent(harvestProfit)}&sizeArea=${encodeURIComponent(sizeArea)}`
    );

  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 pt-32 max-w-6xl mx-auto fsac4 md:px-1 px-3 pb-96">
        <div className="w-full md:h-screen md:p-5 md:w-auto">
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search ..."
                className="w-full px-4 py-2 w-full bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Location</label>
              <select className="w-full px-4 py-2 w-full bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="" className="text-black">
                  Select Type
                </option>
                <option value="" className="text-black">
                  haha
                </option>
                <option value="" className="text-black">
                  haha
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
              {filteredContent.map((token, index) => {
                const image = token.metadata[0][0].find(([key]) => key === "image")?.[1]?.Text || "";
                const name = token.metadata[0][0].find(([key]) => key === "name")?.[1]?.Text || "Untitled";
                const price = token.metadata[0][0].find(([key]) => key === "price")?.[1]?.Nat.toString() || "N/A";
                const description = token.metadata[0][0].find(([key]) => key === "description")?.[1]?.Text || "N/A";
                const location = token.metadata[0][0].find(([key]) => key === "location")?.[1]?.Text || "N/A";
                const harvestTime = token.metadata[0][0].find(([key]) => key === "harvest_date")?.[1]?.Text || "N/A";
                const harvestProfit = token.metadata[0][0].find(([key]) => key === "harvest_profits")?.[1]?.Nat.toString() || "N/A";
                const sizeArea = token.metadata[0][0].find(([key]) => key === "size_area")?.[1]?.Nat.toString() || "N/A";

                return (
                  <div
                    key={index}
                    className="w-full sm:w-[250px] flex flex-col rounded-lg border border-[#393556]"
                    onClick={handleDetail(image, name, price, description, location, harvestTime, harvestProfit, sizeArea)}
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt={name}
                        width={200}
                        height={200}
                        className="sm:h-max-[200px] h-[200px] h-min-[200px] w-full rounded-t-lg object-cover" />

                    ) : (
                      <div className="bg-gray-300 animate-pulse w-full h-[200px] rounded-md"></div>
                    )}
                    <div className="p-2 gap-2 flex flex-col h-full">
                      <span className="text-lg font-semibold">{name || "Name Not Available"}</span>
                      <div className="flex-grow"></div>
                      <div className="flex flex-col gap-1 w-full">
                        <small className="text-[#FFD166]">{price !== "Price Not Available" ? `${price} ETH` : "Price Not Available"}</small>
                        <span>{location || "Location Not Available"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
