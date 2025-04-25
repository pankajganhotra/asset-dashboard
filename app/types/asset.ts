export interface Asset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  high_24h: number;
  low_24h: number;
  last_updated: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  sparkline_in_7d: {
    price: number[];
  };
}

export type CoinDetails = {
  id: string;
  symbol: string;
  name: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    market_cap_rank: number;
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    market_cap_change_percentage_24h: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    ath: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_date: { usd: string };
    circulating_supply: number;
    sparkline_7d: { price: number[] };
  };
};
