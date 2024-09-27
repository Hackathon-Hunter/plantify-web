"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import { fetchDataDetail } from "../../../services/icService";

import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import DetailLocation from "./partial/DetailLocation";
import ListMoreContent from "./partial/ListMoreContent";

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
  const [dataDetail, setDataDetail] = useState<DataDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailData = async (id: number) => {
    try {
      const data: any = await fetchDataDetail(id);
      const formattedData: DataDetail = {
        images: data[0][0].find(([key]: [string, any]) => key === "image")?.[1]?.Text || "",
        names: data[0][0].find(([key]: [string, any]) => key === "name")?.[1]?.Text || "Untitled",
        descriptions: data[0][0].find(([key]: [string, any]) => key === "description")?.[1]?.Text || "Untitled",
        prices: data[0][0].find(([key]: [string, any]) => key === "price")?.[1]?.Nat.toString() || "N/A",
        locations: data[0][0].find(([key]: [string, any]) => key === "location")?.[1]?.Text || "N/A",
        harvestTimes: data[0][0].find(([key]: [string, any]) => key === "harvest_date")?.[1]?.Text || "N/A",
        harvestProfits: data[0][0].find(([key]: [string, any]) => key === "harvest_profits")?.[1]?.Nat.toString() || "N/A",
        sizeAreas: data[0][0].find(([key]: [string, any]) => key === "size_area")?.[1]?.Nat.toString() || "N/A"
      };

      setDataDetail(formattedData);
    } catch (error) {
      console.error("Failed to fetch image data", error);
      setDataDetail(null);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    const idParams = searchParams.get("id");
    const numericId = idParams ? parseInt(idParams) : null;

    if (numericId !== null) {
      setLoading(true);
      fetchDetailData(numericId);
    } else {
      console.warn("Invalid ID parameter");
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div>
      <Header />
      <DetailContent dataDetail={dataDetail} />
      {/* <DetailLocation /> */}
      <ListMoreContent  />
    </div>
  );
}