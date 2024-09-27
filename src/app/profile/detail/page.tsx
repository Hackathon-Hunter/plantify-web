"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";


export default function Marketplace() {
  const [dataDetail, setDataDetail] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data_detail"));
    setDataDetail(data);
  }, [])
  return (
    <div>
      <Header />
      <DetailContent dataDetail={dataDetail} />
    </div>
  );
}
