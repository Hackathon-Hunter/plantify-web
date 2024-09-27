"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import DetailLocation from "./partial/DetailLocation";

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

export default function Marketplace() {
  const searchParams = useSearchParams();
  const [dataDetail, setDataDetail] = useState<DataDetail>();

  useEffect(() => {
    const datas: DataDetail = {
      images: searchParams.get('image'),
      names: searchParams.get('name'),
      prices: searchParams.get('price'),
      descriptions: searchParams.get('description'),
      locations: searchParams.get('location'),
      harvestTimes: searchParams.get('harvestTime'),
      harvestProfits: searchParams.get('harvestProfit'),
      sizeAreas: searchParams.get('sizeArea')
    };

    setDataDetail(datas);
  }, [searchParams]);

  return (
    <div>
      <Header />
      <DetailContent dataDetail={dataDetail} />
      <DetailLocation />
    </div>
  );
}
