"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import DetailLocation from "./partial/DetailLocation";
import ListMoreContent from "./partial/ListMoreContent";
import { useSearchParams } from 'next/navigation';

interface DataDetail {
  images: string | null;
  names: string | null;
  prices: string | null;
  descriptions: string | null;
  locations: string | null;
  harvestTimes: string | null;
  harvestProfits: string | null;
  sizeAreas: string | null;
}

export default function Marketplace() {
  const searchParams = useSearchParams();
  const [dataDetail, setDataDetail] = useState<DataDetail | null>(null);


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
      <ListMoreContent />
    </div>
  );
}
