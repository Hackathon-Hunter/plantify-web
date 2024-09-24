import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { BasicButton } from "@/components/Button";
import Image from "next/image";

const DetailContent = ({dataDetail}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 pt-32 max-w-6xl mx-auto px-3 md:px-1">
        {loading ? (
          <div className="w-full md:w-[600px] flex flex-col items-center">
            <div className="bg-gray-300 w-full h-[320px] md:h-[400px] rounded-md animate-pulse"></div>
          </div>
        ) : (
          <div className="w-full md:w-[600px]">
            <Image
              src={dataDetail.images}
              alt="Picture of the author"
              width={350}
              height={320}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col justify-between h-auto w-full">
          {loading ? (
            <div className="flex flex-col gap-3">
              <div className="bg-gray-300 h-8 w-3/4 rounded-md animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-1/2 rounded-md animate-pulse"></div>
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                <div className="bg-gray-300 h-6 w-1/3 rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-1/4 rounded-md animate-pulse"></div>
              </div>
              <div className="bg-gray-300 h-6 w-1/2 rounded-md animate-pulse mt-3"></div>
              <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <span className="text-2xl md:text-[36px] font-bold">
                  {dataDetail.names}
                </span>
                <small className="text-sm md:text-base">Current Price</small>
                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                  <span className="text-2xl md:text-4xl font-semibold">
                    {dataDetail.prices} ETH
                  </span>
                  <small className="text-sm md:text-base pb-1">$315.26</small>
                </div>
                <span className="text-lg md:text-[28px]">Description</span>
                <p className="text-sm md:text-base">
                  {dataDetail.descriptions}
                </p>
              </div>
              <div className="pt-3">
                <BasicButton link="/" title="BUY" fullWidth={false} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailContent;
