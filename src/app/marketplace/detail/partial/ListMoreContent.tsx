import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { fetchData } from "../../../../services/icService";

const ListMoreContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);

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

  const handleDetail = (id?: string) => {
    return () => {
      router.push(`/marketplace/detail?id=${id}`);
    };
  };

  return (
    <>
      <div className="h-auto md:h-screen w-full p-5 md:flex-row gap-6 pt-32 max-w-6xl mx-auto px-3 md:px-1">
        {loading ? (
          <div>
            <span className="bg-gray-300 h-4 w-3/4 mb-2"></span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        ) : (
          <div className="pb-32">
            <span className="text-lg md:text-[28px] font-bold">
              Description
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {dataContent.map((token: { id: string; metadata: any[][][] }, index: React.Key | null | undefined) => {
                const id = token.id !== undefined && token.id !== null ? token.id.toString() : "N/A";
                const image = token.metadata[0][0].find(([key]) => key === "image")?.[1]?.Text || "";
                const name = token.metadata[0][0].find(([key]) => key === "name")?.[1]?.Text || "Untitled";
                const price = token.metadata[0][0].find(([key]) => key === "price")?.[1]?.Nat.toString() || "N/A";
                const location = token.metadata[0][0].find(([key]) => key === "location")?.[1]?.Text || "N/A";

                return (
                  <div
                    key={index}
                    className="w-full flex flex-col border border-[#393556] rounded-md overflow-hidden"
                    onClick={handleDetail(id)}
                  >
                    <div className="relative w-full h-[300px]">
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
                    </div>
                    <div className="p-2 gap-2 flex flex-col h-full">
                      <span className="text-lg font-semibold">{name || "Name Not Available"}</span>
                      <div className="flex-grow"></div>
                      <div className="flex flex-col gap-1 w-full">
                        <small className="text-[#FFD166]">{price !== "Price Not Available" ? `${price} ETH` : "Price Not Available"}</small>
                        <span>{location || "Location Not Available"}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListMoreContent;
