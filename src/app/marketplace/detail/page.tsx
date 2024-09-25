"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import ListMoreContent from "./partial/ListMoreContent";


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
      <ListMoreContent />
    </div>
  );
}
