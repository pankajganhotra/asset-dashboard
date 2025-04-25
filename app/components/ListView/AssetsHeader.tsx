export default function AssetsHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
          #
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
          Coin
        </th>
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
          Price
        </th>
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
          24h %
        </th>
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
          24h Volume
        </th>
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
          Market Cap
        </th>
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
          Last 7 Days
        </th>
      </tr>
    </thead>
  );
}
