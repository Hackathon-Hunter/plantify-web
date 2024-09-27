"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import DetailLocation from "./partial/DetailLocation";

interface DataDetail {
  images: string | undefined;
  names: string | undefined;
  prices: string | undefined;
  descriptions: string | undefined;
  locations: string | undefined;
  harvestTimes: string | undefined;
  harvestProfits: string | undefined;
  sizeAreas: string | undefined;
}

export default function Marketplace() {
  const searchParams = useSearchParams();
  const [dataDetail, setDataDetail] = useState<DataDetail>();

  useEffect(() => {
    const datas: DataDetail = {
      images: searchParams.get('image') ?? undefined,
      names: searchParams.get('name') ?? undefined,
      prices: searchParams.get('price') ?? undefined,
      descriptions: searchParams.get('description') ?? undefined,
      locations: searchParams.get('location') ?? undefined,
      harvestTimes: searchParams.get('harvestTime') ?? undefined,
      harvestProfits: searchParams.get('harvestProfit') ?? undefined,
      sizeAreas: searchParams.get('sizeArea') ?? undefined,
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
