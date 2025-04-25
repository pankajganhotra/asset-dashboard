import axios, { AxiosError } from "axios";

interface FetchAssetsParams {
  vs_currency: string;
  order: string;
  per_page: number;
  page: number;
  sparkline: boolean;
}

const BASE_URL = "https://api.coingecko.com/api/v3";

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  params: FetchAssetsParams,
  retries = 3,
  delayTime = 1000
) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await axios.get(url, { params });
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 429) {
          console.log(`Rate limit exceeded. Retrying in ${delayTime / 1000}s...`);
        } else {
          console.error(`Error fetching data: ${axiosError.message}`);
          throw axiosError;
        }
      } else {
        console.error('Unknown error:', error);
        throw error;  
      }

      attempt++;
      await delay(delayTime);
      delayTime *= 2; 
    }
  }

  throw new Error("Maximum retry attempts reached");
};

export const fetchAssets = async (page = 1) => {
  const params: FetchAssetsParams = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 50,
    page,
    sparkline: true,
  };

  return await fetchWithRetry(`${BASE_URL}/coins/markets`, params);
};
