import useSWR from 'swr';
import { CoinDetails } from '@/types/asset'; 
import { fetchWithRetry } from '@/utils/fetchWithRetry';

const BASE_URL = "https://api.coingecko.com/api/v3";


const fetchAssetBySymbolName = async (symbol: string) => {
  const url = `${BASE_URL}/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true&vs_currency=usd`;

  return await fetchWithRetry(url); 
};

export const useFetchAssetBySymbolName = (symbol: string) => {
  const { data, error, isLoading } = useSWR<CoinDetails>(
    symbol || null,
    () => fetchAssetBySymbolName(symbol), 
    {
      revalidateOnFocus: false, 
      refreshInterval: 0, 
    }
  );

  return { asset: data || null, error, isLoading };
};
