'use client';

import { useEffect, useRef } from "react";

import AssetFilters from "@/components/AssetFilters";
import GridView from "@/components/GridView/GridView";
import ListView from "@/components/ListView/ListView";

import { useAssetUI } from "@/context/AssetsContext";

import { useAssets } from "@/hooks/useAssets";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { viewType } = useAssetUI();
  const { assets, isLoading, loadMoreAssets } = useAssets();

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;
      const threshold = 200;
      const bottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + threshold;
      if (bottom && !isLoading) loadMoreAssets();
    };

    const container = scrollRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [isLoading, loadMoreAssets]);

  return (
    <div ref={scrollRef} className="p-8 overflow-y-auto h-full">
      <AssetFilters />
      {viewType === "grid" && <GridView assets={assets} />}
      {viewType === "list" && <ListView assets={assets} />}
      {isLoading && (
        <div className="text-center py-4">
          <span>Loading more assets...</span>
        </div>
      )}
    </div>
  );
};

export default HomePage;
