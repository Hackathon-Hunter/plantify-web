import React, { useState, useEffect } from "react";
import Image from "next/image";


interface DataDetail {
  images?: string;
  names?: string;
  prices?: string;
  descriptions?: string;
  locations?: string;
  harvestTimes?: string;
  harvestProfits?: string;
  sizeAreas?: string;
}

interface DetailContentProps {
  dataDetail?: DataDetail;
}

const DetailContent: React.FC<DetailContentProps> = ({ dataDetail }) => {
  const [loading, setLoading] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailure, setShowModalFailure] = useState(false);

  const ModalSuccess = ({ closeModal }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Success</h2>
        <iframe src="https://lottie.host/embed/4fbef5ad-e560-432b-9a27-5c4d69a5ef68/Xe0JrH7dWt.json"></iframe>
        <p>Your purchase was successful!</p>
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );

  const ModalFailure = ({ closeModal }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Failed</h2>
        <iframe src="https://lottie.host/embed/88bdeed6-7fc5-4a23-9437-61bbd68088d7/xjBVU3dE5M.json"></iframe>
        <p>Your purchase has failed. Please try again.</p>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );

  const handleBuyClick = (params: "success" | "fail") => {
    if (params == "success") {
      setShowModalSuccess(true);
    } else {
      setShowModalFailure(true);
    }

    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  const closeModal = () => {
    setShowModalSuccess(false);
    setShowModalFailure(false);
  };

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
            {dataDetail?.images ? (
              <Image
                src={dataDetail.images}
                alt="Picture of the author"
                width={350}
                height={320}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              <div className="bg-gray-300 animate-pulse w-full h-[320px] rounded-md"></div>
            )}
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
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl md:text-[36px] font-bold">
                      {dataDetail?.names || "Name Not Available"}
                    </span>
                    <small>{dataDetail?.locations || "Location Not Available" }</small>
                  </div>
                  <button
                    className="inline-flex items-center justify-center font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent w-fit bg-gradient-to-r from-blue-800 to-teal-500 py-3 px-10 text-md focus:shadow-outline rounded-lg"
                    onClick={() => handleBuyClick("success")}
                  >
                    BUY
                  </button>
                </div>
                <small className="text-sm md:text-base">Current Price</small>
                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                  <span className="text-2xl md:text-4xl font-semibold">
                    {dataDetail?.prices ? `${dataDetail.prices} ETH` : "Price Not Available"}
                  </span>
                  <small className="text-sm md:text-base pb-1">$315.26/Take Profit <span className="font-semibold text-green-500">
                    {dataDetail?.harvestProfits ? (
                      `$315.26/Take Profit  <span className="font-semibold text-green-500">${dataDetail.harvestProfits} ETH</span>`
                    ) : (
                      "Take Profit Not Available"
                    )}
                  </span> ETH</small>
                </div>
                <span className="text-lg md:text-[28px]">Description</span>
                <p className="text-sm md:text-base">
                  {dataDetail?.descriptions || "Description Not Available"}
                </p>
                <span>Size Area : {dataDetail?.sizeAreas || "Size Area Not Available"}</span>
                <span>Harvest Date : {dataDetail?.harvestTimes || "Harvest Date Not Available"}</span>

              </div>
            </>
          )}

          {showModalSuccess && <ModalSuccess closeModal={closeModal} />}
          {showModalFailure && <ModalFailure closeModal={closeModal} />}
        </div>
      </div>
    </>
  );
};

export default DetailContent;
