import { Asset } from "@/types/asset";
import AssetsHeader from "./AssetsHeader";
import AssetRow from "./AssetRow";

export default function ListView({ assets }: { assets: Asset[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black/5">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <AssetsHeader />
          <tbody className="divide-y divide-gray-100">
            {assets.map((asset, index) => (
              <AssetRow key={asset.id} asset={asset} index={index} /> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
