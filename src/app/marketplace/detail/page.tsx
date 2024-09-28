'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  buyNft,
  fetchDataDetail,
  tokenOwner
} from '../../../services/icService';

import Header from '@/components/Header';
import DetailContent from './partial/DetailContent';
import DetailLocation from './partial/DetailLocation';
import ListMoreContent from './partial/ListMoreContent';
import { NFTData } from '@/types';
import useWallet from '@/hooks/use-wallet';
import { Principal } from '@dfinity/principal';

function Marketplace() {
  const searchParams = useSearchParams();
  const [dataDetail, setDataDetail] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenId, setTokenId] = useState<number>();
  const [isOwned, setIsOwned] = useState(false);
  const [isMyToken, setIsMyToken] = useState(false);

  const fetchDetailData = async (id: number) => {
    try {
      const data: any = await fetchDataDetail(id);
      const formattedData: NFTData = {
        images:
          data[0][0].find(([key]: [string, any]) => key === 'image')?.[1]
            ?.Text || '',
        names:
          data[0][0].find(([key]: [string, any]) => key === 'name')?.[1]
            ?.Text || 'Untitled',
        descriptions:
          data[0][0].find(([key]: [string, any]) => key === 'description')?.[1]
            ?.Text || 'Untitled',
        prices: data[0][0].find(([key]: [string, any]) => key === 'price')?.[1]
          ?.Nat
          ? Number(
              data[0][0].find(([key]: [string, any]) => key === 'price')?.[1]
                ?.Nat
            )
          : 0,
        locations:
          data[0][0].find(([key]: [string, any]) => key === 'location')?.[1]
            ?.Text || 'N/A',
        harvestTimes:
          data[0][0].find(([key]: [string, any]) => key === 'harvest_time')?.[1]
            ?.Text || 'N/A',
        harvestProfits: data[0][0].find(
          ([key]: [string, any]) => key === 'harvest_profit'
        )?.[1]?.Nat
          ? Number(
              data[0][0].find(
                ([key]: [string, any]) => key === 'harvest_profit'
              )?.[1]?.Nat
            )
          : 0,
        sizeAreas: data[0][0].find(
          ([key]: [string, any]) => key === 'size_area'
        )?.[1]?.Nat
          ? Number(
              data[0][0].find(
                ([key]: [string, any]) => key === 'size_area'
              )?.[1]?.Nat
            )
          : 0,
        lat: data[0][0].find(([key]: [string, any]) => key === 'lat')?.[1]?.Nat
          ? Number(
              data[0][0].find(([key]: [string, any]) => key === 'lat')?.[1]?.Nat
            )
          : 0,
        long: data[0][0].find(([key]: [string, any]) => key === 'long')?.[1]
          ?.Nat
          ? Number(
              data[0][0].find(([key]: [string, any]) => key === 'long')?.[1]
                ?.Nat
            )
          : 0
      };

      setDataDetail(formattedData);
    } catch (error) {
      console.error('Failed to fetch image data', error);
      setDataDetail(null);
    } finally {
      setLoading(false);
    }
  };

  const wallet = useWallet();

  const sendBuyNft = async () => {
    if (dataDetail && wallet.principalId && tokenId) {
      try {
        await buyNft(wallet.principalId, tokenId);
        fetchDetailData(tokenId);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  const fetchTokenOwner = async (id: number) => {
    const adminOnwer = Principal.from('yikut-daaaa-aaaam-qbdaq-cai');
    
    if (id) {
      const owner = await tokenOwner(id);

      if (owner[0][0]?.owner !== adminOnwer) {
        setIsOwned(true);
      }
      console.log("wallet.principalId", wallet.principalId);
      

      if (wallet.principalId === owner[0][0]?.owner.toString) {
        setIsMyToken(true);
      }
    }
  };

  useEffect(() => {
    const idParams = searchParams.get('id');
    const numericId = idParams ? parseInt(idParams) : null;

    if (numericId !== null) {
      setLoading(true);
      setTokenId(numericId);
      fetchTokenOwner(numericId);
      fetchDetailData(numericId);
    } else {
      console.warn('Invalid ID parameter');
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div>
      <Header />
      <DetailContent
        dataDetail={dataDetail}
        sendBuyNft={sendBuyNft}
        isMyToken={isMyToken}
        isOwned={isOwned}
      />
      <DetailLocation lat={dataDetail?.lat} long={dataDetail?.long} />
      <ListMoreContent />
    </div>
  );
}

export default function MarketplaceSuspend() {
  return (
    <Suspense>
      <Marketplace />
    </Suspense>
  );
}
