'use client';

import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamMembers } from "./data";

const About = () => {

    return (
        <div className="text-black bg-black">
            <Head>
                <title>About Us | MetaFarm</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header />
            <section className="text-gray-600 body-font bg-landing-bg bg-cover">
                {/* Introduction Section */}
                <h2 className="pt-64 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
                    Welcome to MetaFarm
                </h2>
                <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed lg:w-2/3">
                    MetaFarm is transforming how people invest in agriculture. Through NFTs, investors can support real-world agricultural projects, ensuring sustainability and profitability for everyone involved.
                </p>

                {/* Mission Section */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 pt-52 items-center">
                    {/* Left Side - Mission Text */}
                    <div className="">
                        <h2 className="mb-12 font-semibold tracking-tighter text-left text-gray-200 text-5xl">
                            Our Mission
                        </h2>
                        <p className="text-md text-gray-200">
                            MetaFarm’s mission is to empower farmers and investors alike by bridging the gap between agriculture and the blockchain. We aim to create a transparent and sustainable farming ecosystem, where investors can contribute to real-world projects and share in the profits.
                        </p>
                    </div>

                    {/* Right Side - Mission Image */}
                    <div className="flex justify-center items-center">
                        <img
                            className="object-cover object-center rounded-lg shadow-lg"
                            src="/img/orange-farmer.png" // replace with your image path
                            alt="Our Mission"
                        />
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 pt-52 items-center">
                    <div className="flex justify-center items-center">
                        <img
                            className="object-cover object-center rounded-lg shadow-lg"
                            src="/img/farmer.png" // replace with your image path
                            alt="Our Mission"
                        />
                    </div>
                    <div className="">
                        <h2 className="mb-4 font-semibold tracking-tighter text-left text-gray-200 text-5xl">
                            Core Values
                        </h2>
                        <div className="pt-4">
                            <h3 className="font-semibold text-lg text-white">Transparency</h3>
                            <p className="pt-2 text-md text-gray-200">
                                Blockchain ensures transparency in all operations, giving investors confidence in their contributions.
                            </p>
                        </div>
                        <div className="pt-4">
                            <h3 className="font-semibold text-lg text-white">Sustainability</h3>
                            <p className="pt-2 text-md text-gray-200">
                                We support environmentally friendly farming methods that are both profitable for investors and sustainable for farmers.
                            </p>
                        </div>
                        <div className="pt-4">
                            <h3 className="font-semibold text-lg text-white">Innovation</h3>
                            <p className="pt-2 text-md text-gray-200">
                                By integrating NFTs and blockchain, we’re driving innovation in the agricultural sector, providing new opportunities for investment and growth.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Features Section */}
                <div className="max-w-7xl mx-auto mb-36 mt-16">
                    <h2 className="pt-24 mb-4 font-semibold tracking-tighter text-center text-gray-200 text-5xl">
                        Meet Our Teams
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                                <img
                                    className="object-cover object-center w-40 h-40 rounded-full shadow-lg mb-4"
                                    src={member.image}
                                    alt={`${member.name}`}
                                />
                                <h3 className="text-xl font-semibold text-gray-100">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default About;
