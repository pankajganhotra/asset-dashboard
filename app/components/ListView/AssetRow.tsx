/* eslint-disable @next/next/no-img-element */
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import clsx from "clsx";
import Link from "next/link";

import { Asset } from "@/types/asset";

type TableRowProps = {
  asset: Asset;
  index: number;
};

export default function AssetRow({ asset, index }: TableRowProps) {
  return (
    <tr key={asset.id} className="hover:bg-gray-50 cursor-pointer">
      <td className="px-4 py-4 text-sm text-gray-600">{index + 1}</td>
      <td className="px-4 py-4 flex items-center gap-2">
        <Link href={`/${asset.id}`}>
          <img
            src={asset.image}
            alt={asset.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        </Link>
        <Link href={`/${asset.id}`}>
          <div className="font-medium text-gray-900">{asset.name}</div>
          <div className="text-xs text-gray-500 uppercase">{asset.symbol}</div>
        </Link>
      </td>
      <td className="px-4 py-4 text-sm text-right text-gray-900">
        ${asset.current_price.toLocaleString()}
      </td>
      <td
        className={clsx(
          "px-4 py-4 text-sm text-right font-medium",
          asset.price_change_percentage_24h >= 0
            ? "text-green-600"
            : "text-red-600"
        )}
      >
        {asset.price_change_percentage_24h?.toFixed(2)}%
      </td>
      <td className="px-4 py-4 text-sm text-right text-gray-600">
        ${asset.total_volume.toLocaleString()}
      </td>
      <td className="px-4 py-4 text-sm text-right text-gray-600">
        ${asset.market_cap.toLocaleString()}
      </td>
      <td className="px-4 py-4 text-sm text-right">
        <ResponsiveContainer width={100} height={40}>
          <LineChart
            data={asset.sparkline_in_7d.price.map((price, i) => ({ i, price }))}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke={
                asset.price_change_percentage_24h >= 0 ? "#16a34a" : "#dc2626"
              }
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              contentStyle={{ display: "none" }}
              wrapperStyle={{ display: "none" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </td>
    </tr>
  );
}
