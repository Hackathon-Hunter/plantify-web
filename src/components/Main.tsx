'use client';

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import useWallet from '@/hooks/use-wallet';

import { fetchData } from "../services/icService";

import { BasicButton, SecondaryButton } from "./Button";
import { reviews } from "./data"

export default function Main() {
	const wallet = useWallet();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [dataContent, setDataContent] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const responseData = async () => {
			try {
				const data: any = await fetchData();
				setDataContent(data);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch image data', error);
			}
		};

		responseData();
	}, []);

	const filteredContent = dataContent.filter(
		(token: { metadata: any[][][] }) => {
			const name =
				token.metadata[0][0].find(([key]: any[]) => key === 'name')?.[1]
					?.Text || 'Untitled';
			return name.toLowerCase().includes(searchTerm.toLowerCase());
		}
	);

	const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

	const handlePrev = () => {
		setCurrentReviewIndex(prevIndex =>
			prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentReviewIndex(prevIndex =>
			prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleDetail = (id?: string) => {
		return () => {
			router.push(`/marketplace/detail?id=${id}`);
		};
	};

	return (
		<section className="text-gray-600 body-font">
			<div
				className="bg-center text-gray-600 body-font"
				style={{
					backgroundImage: `linear-gradient(rgba(5, 33, 146, 0.9), rgba(0, 0, 0, 0.8)), url('https://res.cloudinary.com/dfys4n31f/image/upload/v1727527611/Nashir_Jamali_background_with_a_theme_combining_plant__simple__t_651d9d91-f609-4a0c-9d1b-f8bd829b0beb_klzokx.jpg')`
				}}
			>
				<div className="max-w-5xl pt-96 pb-96 mx-auto">
					<h1 className="text-6xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
						Bridging Farmers and Investors Through NFTs
					</h1>
					<h2 className="text-1xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-400 text-center">
						Empowering Agriculture through NFT-driven farming, invest,
						collaborate, and cultivate the future of farming with innovative,
						decentralized projects.
					</h2>
					{!wallet.isConnected && !wallet.walletLoading && (
						<div className="ml-6 text-center">
							<BasicButton
								onclick={wallet.connect}
								title="Connect Wallet"
								fullWidth={false} />
						</div>
					)}
				</div>
			</div>
			<section className="text-gray-600 body-font bg-cover bg-center py-24">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-5xl font-bold text-gray-200 text-center mb-12">
						How It Works
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
						{/* Step 1 */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold text-gray-100 mb-4">
								Step 1: Choose a Project
							</h3>
							<p className="text-gray-400">
								Browse available agricultural projects like apple orchards or
								organic farms. Each project is tokenized as an NFT, representing
								a stake in that farm.
							</p>
						</div>

						{/* Step 2 */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold text-gray-100 mb-4">
								Step 2: Purchase an NFT
							</h3>
							<p className="text-gray-400">
								Buy an NFT on our platform. Your NFT represents your investment
								in the operational costs (seeds, labor, etc.) of a specific
								farm, providing you with a share of the harvest profits.
							</p>
						</div>

						{/* Step 3 */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold text-gray-100 mb-4">
								Step 3: Earn & Trade
							</h3>
							<p className="text-gray-400">
								As the farm yields profits, NFT holders share in the income
								based on their stake. You can also trade your NFT on our
								marketplace to exit or expand your investment.
							</p>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center pt-12">
						<BasicButton
							onclick={() => router.push('/marketplace')}
							title="Start Investing"
							size="large"
							fullWidth={false}
						/>
					</div>
				</div>
			</section>
			<h2 className="pt-28 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
				Available NFTs for Purchase
			</h2>
			<br></br>
			<div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{[...Array(3)].map((_, index) => (
							<div
								key={index}
								className="w-full sm:w-[250px] flex flex-col border border-[#393556] animate-pulse"
							>
								<div className="bg-gray-300 h-[304px] w-full"></div>
								<div className="p-2 gap-2">
									<div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
									<div className="flex justify-between w-full">
										<div className="bg-gray-300 h-4 w-1/4"></div>
										<div className="bg-gray-300 h-4 w-1/4"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
						{filteredContent.map(
							(
								token: { id: string; metadata: any[][][] },
								index: React.Key | null | undefined
							) => {
								const id =
									token.id !== undefined && token.id !== null
										? token.id.toString()
										: 'N/A';
								const image =
									token.metadata[0][0].find(([key]) => key === 'image')?.[1]
										?.Text || '';
								const name =
									token.metadata[0][0].find(([key]) => key === 'name')?.[1]
										?.Text || 'Untitled';
								const price =
									token.metadata[0][0]
										.find(([key]) => key === 'price')?.[1]
										?.Nat.toString() || 'N/A';
								const location =
									token.metadata[0][0].find(([key]) => key === 'location')?.[1]
										?.Text || 'N/A';

								return (
									<div
										key={index}
										className="w-full sm:w-[250px] flex flex-col rounded-lg border border-[#393556]"
										onClick={handleDetail(id)}
									>
										{image ? (
											<Image
												src={image}
												alt={name}
												width={200}
												height={200}
												className="sm:h-max-[200px] h-[200px] h-min-[200px] w-full rounded-t-lg object-cover"
											/>
										) : (
											<div className="bg-gray-300 animate-pulse w-full h-[200px] rounded-md"></div>
										)}
										<div className="p-2 gap-2 flex flex-col h-full">
											<span className="text-lg font-semibold text-white">
												{name || 'Name Not Available'}
											</span>
											<div className="flex-grow"></div>
											<div className="flex flex-col gap-1 w-full">
												<small className="text-[#FFD166]">
													{price !== 'Price Not Available'
														? `${price / 10000000} ICP`
														: 'Price Not Available'}
												</small>
												<span className='text-white'>{location || 'Location Not Available'}</span>
											</div>
											<BasicButton
												onclick={handleDetail(id)}
												title="Detail"
												fullWidth={true}
											/>
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
			</div>
			<section className="bg-gray-800 py-16 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl font-semibold mb-8">
						What Our Customers Are Saying
					</h2>

					{/* Review Card */}
					<div className="relative flex items-center justify-center">
						<div className="w-2/3 lg:w-1/3 h-[350px] flex flex-col justify-center">
							<Image
								src={reviews[currentReviewIndex].image}
								alt={reviews[currentReviewIndex].name}
								width={150}
								height={150}
								className="w-[150px] h-[150px] rounded-full object-cover object-center mx-auto mb-4"
							/>
							<h3 className="text-2xl font-bold mb-2">
								{reviews[currentReviewIndex].name}
							</h3>
							<p className="text-lg italic overflow-hidden text-ellipsis">
								"{reviews[currentReviewIndex].review}"
							</p>
						</div>

						{/* Navigation Buttons */}
						<button
							onClick={handlePrev}
							className="absolute left-0 px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
						>
							&#9664;
						</button>
						<button
							onClick={handleNext}
							className="absolute right-0 px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
						>
							&#9654;
						</button>
					</div>

					{/* Carousel Dots */}
					<div className="flex justify-center mt-6">
						{reviews.map((_, index) => (
							<div
								key={index}
								className={`h-3 w-3 rounded-full mx-1 ${index === currentReviewIndex ? 'bg-yellow-500' : 'bg-gray-500'
									}`}
							></div>
						))}
					</div>
				</div>
			</section>
			<section className="relative pb-24">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
					<div className="py-24 md:py-36">
						<h1 className="mb-5 text-6xl font-bold text-white">
							Subscribe to our newsletter
						</h1>
						<h1 className="mb-9 text-2xl font-semibold text-gray-200">
							Enter your email address and get our newsletters straight away.
						</h1>
						<input
							type="email"
							placeholder="jack@example.com"
							name="email"
							autoComplete="email"
							className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
						/>{' '}
						<a
							className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
							href="/"
						>
							<span className="justify-center">Subscribe</span>
						</a>
					</div>
				</div>
			</section>
		</section>
	);
}
