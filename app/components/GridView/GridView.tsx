
import { Asset } from "@/types/asset";

import AssetCard from "./AssetCard";

export default function GridView({ assets }: { assets: Asset[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {assets?.map((asset) => (
        <AssetCard key={asset.id} asset={asset} /> 
      ))}
    </ul>
  );
}
