'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/Header';
import DetailContent from './partial/DetailContent';
import DetailLocation from './partial/DetailLocation';
import { claimProfit, fetchDataDetail } from '@/services/icService';
import { NFTData } from '@/types';
import useWallet from '@/hooks/use-wallet'

function Marketplace() {
  const searchParams = useSearchParams();
  const [tokenId, setTokenId] = useState<number>();
  const [dataDetail, setDataDetail] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailData = React.useCallback(async (id: number) => {
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
        prices:
          data[0][0].find(([key]: [string, any]) => key === 'price')?.[1]
            ?.Nat || 0,
        locations:
          data[0][0].find(([key]: [string, any]) => key === 'location')?.[1]
            ?.Text || 0,
        harvestTimes:
          data[0][0].find(([key]: [string, any]) => key === 'harvest_time')?.[1]
            ?.Text || 0,
        harvestProfits:
          data[0][0].find(
            ([key]: [string, any]) => key === 'harvest_profit'
          )?.[1]?.Nat || 0,
        sizeAreas:
          data[0][0].find(([key]: [string, any]) => key === 'size_area')?.[1]
            ?.Nat || 0,
        isClaimed: data[0][0].find(([key]: [string, any]) => key === 'is_claimed')?.[1]?.Blob[0] == 1 ? true : false
      };
      
      setDataDetail(formattedData);      
    } catch (error) {
      console.error('Failed to fetch image data', error);
      setDataDetail(null);
    } finally {
      setLoading(false);
    }
  },[])

  const wallet = useWallet();

  const sendClaimedItem = async () => {
    if (dataDetail && wallet.principalId && tokenId) {
      try {
        await claimProfit(tokenId, dataDetail, wallet.principalId);
        fetchDetailData(tokenId)
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const idParams = searchParams.get('id');
    const numericId = idParams ? parseInt(idParams) : null;

    if (numericId !== null) {
      setLoading(true);
      setTokenId(numericId);
      fetchDetailData(numericId);
    } else {
      console.warn('Invalid ID parameter');
      setLoading(false);
    }
  }, [searchParams, fetchDetailData]);

  return (
    <div>
      <Header />
      {!loading && tokenId && (
        <DetailContent dataDetail={dataDetail} sendClaimedItem={sendClaimedItem} />
      )}
      <DetailLocation />
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
