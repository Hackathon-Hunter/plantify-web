'use client';

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BasicButton } from "@/components/Button";
import { fetchProfileNft } from "../../services/icService";
import useWallet from '@/hooks/use-wallet';

export default function Profile() {
  const router = useRouter();
  const [dataContent, setDataContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const wallet = useWallet()

  const handleDetail = (id?: string) => {
    return () => {
      router.push(`/profile/detail?id=${id}`);
    };
  };

  const filteredContent = dataContent.filter(
    (token: { metadata: any[][][] }) => {
      const name =
        token.metadata[0][0].find(([key]) => key === 'name')?.[1]?.Text ||
        'Untitled';
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  useEffect(() => {
    const responseData = async () => {
      try {
        const data: any = await fetchProfileNft();
        setDataContent(data);
        setLoading(false);
        console.log('dataaaaaa', data);
      } catch (error) {
        console.error('Failed to fetch image data', error);
      }
    };

    responseData();
  }, []);

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

        <span className="text-[24px] text-white">
          Profile Page
        </span>

        {/* NFT Purchased Grid */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-52">
              {filteredContent.map(
                (
                  token: { id: string; metadata: any[][][] },
                  index: React.Key | null | undefined
                ) => {
                  const image =
                    token.metadata[0][0].find(([key]) => key === 'image')?.[1]
                      ?.Text || '';
                  const name =
                    token.metadata[0][0].find(([key]) => key === 'name')?.[1]
                      ?.Text || 'Untitled';
                  const price =
                    token.metadata[0][0]
                      .find(([key]) => key === 'price')?.[1]
                      ?.Nat.toString() || 'N/A';
                  const description =
                    token.metadata[0][0].find(
                      ([key]) => key === 'description'
                    )?.[1]?.Text || 'N/A';
                  const location =
                    token.metadata[0][0].find(
                      ([key]) => key === 'location'
                    )?.[1]?.Text || 'N/A';
                  const harvestTime =
                    token.metadata[0][0].find(
                      ([key]) => key === 'harvest_time'
                    )?.[1]?.Text || 'N/A';
                  const harvestProfit =
                    token.metadata[0][0]
                      .find(([key]) => key === 'harvest_profit')?.[1]
                      ?.Nat.toString() || 'N/A';
                  const sizeArea =
                    token.metadata[0][0]
                      .find(([key]) => key === 'size_area')?.[1]
                      ?.Nat.toString() || 'N/A';
                  const id =
                    token.id !== undefined && token.id !== null
                      ? token.id.toString()
                      : 'N/A';

                  return (
                    <div
                      key={index}
                      className="w-full sm:w-[250px] flex flex-col rounded-lg border border-[#393556]"
                      onClick={handleDetail(id)}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={name}
                          height={150}
                          width={150}
                          className="rounded-md object-cover h-[250px] w-[350px]"
                        />
                      ) : (
                        <div className="bg-gray-300 animate-pulse w-full h-[200px] rounded-md"></div>
                      )}
                      <div className="flex flex-col mt-3 w-full">
                        {/* NFT Title */}
                        <span className="text-md font-semibold mb-1">
                          {name || 'Name Not Available'}
                        </span>
                        {/* NFT Price */}
                        <small className="text-[#FFD166] mb-3">
                          {price !== 'Price Not Available'
                            ? `${price} ETH`
                            : 'Price Not Available'}
                        </small>
                        {/* Detail Button */}
                        <BasicButton
                          onclick={handleDetail(id)}
                          title="Detail"
                          fullWidth={true}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
