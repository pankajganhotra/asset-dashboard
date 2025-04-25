import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

import { useAssetUI } from "@/context/AssetsContext";
import { fetchAssets } from "@/utils/coingecko";
import { Asset } from "@/types/asset";

export const useAssets = () => {
  const [page, setPage] = useState(1);
  const [allAssets, setAllAssets] = useState<Asset[]>([]);

  const { filters, sortBy, searchQuery } = useAssetUI();

  const { data, error, isLoading } = useSWR<Asset[]>(
    ["assets", page],
    () => fetchAssets(page),
    {
      refreshInterval: page === 1 ? 10000 : 0,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setAllAssets((prev) => {
        const combined = [...prev, ...data];
        const unique = Array.from(
          new Map(combined.map((a) => [a.id, a])).values()
        );
        return unique;
      });
    }
  }, [data]);

  const assets = useMemo(() => {
    let result = [...allAssets];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (asset) =>
          asset.name.toLowerCase().includes(q) ||
          asset.symbol.toLowerCase().includes(q)
      );
    }

    if (filters.price_min) {
      result = result.filter(
        (asset) => asset.current_price >= parseFloat(filters.price_min)
      );
    }

    if (filters.price_max) {
      result = result.filter(
        (asset) => asset.current_price <= parseFloat(filters.price_max)
      );
    }

    switch (sortBy) {
      case "market_cap":
        result.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case "price":
        result.sort((a, b) => b.current_price - a.current_price);
        break;
      case "volume":
        result.sort((a, b) => b.total_volume - a.total_volume);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "symbol":
        result.sort((a, b) => a.symbol.localeCompare(b.symbol));
        break;

      default:
        break;
    }

    return result;
  }, [allAssets, filters, sortBy, searchQuery]);

  const loadMoreAssets = () => {
    if (!isLoading && data && data.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { assets, error, isLoading, loadMoreAssets };
};
