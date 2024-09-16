"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import DetailContent from "./partial/DetailContent";
import ListMoreContent from "./partial/ListMoreContent";

export default function Marketplace() {
  return (
    <div>
      <Header />
      <DetailContent />
      <ListMoreContent />
    </div>
  );
}
