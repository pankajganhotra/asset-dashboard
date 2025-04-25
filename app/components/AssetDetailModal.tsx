/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Asset } from "../types/asset";

export default function AssetDetailModal({
  asset,
  onClose,
}: {
  asset: Asset;
  onClose: () => void;
}) {
  const priceChange = asset.price_change_percentage_24h ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl text-gray-700">
        <button
          className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img src={asset.image} alt={asset.name} className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{asset.name}</h2>
              <p className="uppercase text-sm text-gray-500">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-gray-900">
              ${asset.current_price.toLocaleString()}
            </p>
            <p className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {priceChange?.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="my-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{asset.current_price}</span>
            <span>24h Range</span>
            <span>{asset.price_change_24h}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div className="h-full w-1/2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="font-medium">${asset.market_cap?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">24h Trading Volume</p>
            <p className="font-medium">${asset.total_volume?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Circulating Supply</p>
            <p className="font-medium">{asset.circulating_supply?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Supply</p>
            <p className="font-medium">{asset.total_supply?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Max Supply</p>
            <p className="font-medium">{asset.max_supply?.toLocaleString() || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
