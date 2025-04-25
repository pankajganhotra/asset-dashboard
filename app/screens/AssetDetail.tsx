/* eslint-disable @next/next/no-img-element */
import { CoinDetails } from "@/types/asset";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AssetDetails = ({ asset }: { asset: CoinDetails }) => {
  const { market_data: data } = asset;

  const chartData =
    data.sparkline_7d?.price.map((price, index) => ({
      timestamp: index,
      price,
    })) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={asset.image.large}
          alt={asset.name}
          className="w-16 h-16 mr-4"
        />
        <div>
          <h2 className="text-3xl font-semibold">
            {asset.name} ({asset.symbol.toUpperCase()})
          </h2>
          <p className="text-gray-500">Asset Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Current Price</h3>
          <p className="text-xl text-gray-900">${data.current_price.usd.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Market Cap</h3>
          <p className="text-xl text-gray-900">${data.market_cap.usd.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Total Volume</h3>
          <p className="text-xl text-gray-900">${data.total_volume.usd.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Market Cap Rank</h3>
          <p className="text-xl text-gray-900">{data.market_cap_rank}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">24h Price Change</h3>
          <p className="text-xl text-gray-900">
            {data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">24h Market Cap Change</h3>
          <p className="text-xl text-gray-900">
            {data.market_cap_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">High 24h</h3>
          <p className="text-xl text-gray-900">${data.high_24h.usd.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Low 24h</h3>
          <p className="text-xl text-gray-900">${data.low_24h.usd.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2">All-Time High (ATH)</h3>
        <p className="text-xl text-gray-900">
          ${data.ath.usd.toLocaleString()} on{" "}
          {new Date(data.ath_date.usd).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2">All-Time Low (ATL)</h3>
        <p className="text-xl text-gray-900">
          ${data.atl.usd.toLocaleString()} on{" "}
          {new Date(data.atl_date.usd).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2">Circulating Supply</h3>
        <p className="text-xl text-gray-900">{data.circulating_supply.toLocaleString()}</p>
      </div>

      {/* Sparkline Chart */}
      <h3 className="text-xl font-semibold mb-4">7-Day Price History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f7931a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetDetails;
