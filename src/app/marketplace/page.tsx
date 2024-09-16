"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Content from "./partial/Content";

export default function Marketplace() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
