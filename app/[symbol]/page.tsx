'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AssetDetails from '@/screens/AssetDetail';
import { useFetchAssetBySymbolName } from '@/hooks/useAssetBySymbol';

const AssetPage = () => {
  const { symbol } = useParams();
  const router = useRouter();

  const { asset, error, isLoading } = useFetchAssetBySymbolName(symbol as string);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        if (error.response?.status === 404) {
          router.replace('/404');
        } else if (error.response?.status === 429) {
          console.log('Rate limit exceeded. Please try again later.');
        } else {
          console.log('An error occurred:', error.message);
        }
      }
    }
  }, [asset, error, isLoading, router]);

  if (isLoading) return <p className="p-8">Loading asset...</p>;
  if (!asset) return null;

  return (
    <div className="p-8 overflow-y-auto h-full">
      <AssetDetails asset={asset} />
    </div>
  );
};

export default AssetPage;
