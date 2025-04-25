/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import clsx from "clsx";

import { Asset } from "@/types/asset";

type AssetCardProps = {
  asset: Asset;
};

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link href={`/${asset.id}`} key={asset.id}>
      <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                {asset.name}
              </h3>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300 uppercase">
                {asset.symbol}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Price:{" "}
              <span className="font-medium text-gray-900">
                ${asset.current_price.toLocaleString()}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              24h Change:{" "}
              <span
                className={clsx(
                  "font-medium",
                  asset.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {asset.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Market Cap: ${asset.market_cap.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Circulating Supply: {asset.circulating_supply.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              24h Volume: ${asset.total_volume.toLocaleString()}
            </p>
          </div>
          <img
            alt={`${asset.name} logo`}
            src={asset.image}
            className="size-12 shrink-0 rounded-full bg-gray-300"
          />
        </div>
      </li>
    </Link>
  );
}
