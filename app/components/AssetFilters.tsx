import { useAssetUI } from "@/context/AssetsContext";

export default function AssetFilters() {
  const { sortBy, setSortBy, filters, setFilters } = useAssetUI();

  const handlePriceRangeChange = (type: "min" | "max", value: string) => {
    setFilters({
      ...filters,
      [`price_${type}`]: value,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4 w-full">
      <h1 className="text-2xl font-bold mr-auto">Top Cryptocurrencies</h1>

      <div className="flex flex-col">
        <label
          htmlFor="sortBy"
          className="text-sm font-medium  mb-1"
        >
          Sort By
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="market_cap">Market Cap</option>
          <option value="price">Price</option>
          <option value="volume">24h Volume</option>
          <option value="name">Name</option>
          <option value="symbol">Symbol</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <label
            htmlFor="priceMin"
            className="text-sm font-medium  mb-1"
          >
            Min Price
          </label>
          <input
            id="priceMin"
            type="number"
            placeholder="Min price"
            className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm"
            value={filters.price_min || ""}
            onChange={(e) => handlePriceRangeChange("min", e.target.value)}
          />
        </div>
        <span className="text-sm ">-</span>
        <div className="flex flex-col">
          <label
            htmlFor="priceMax"
            className="text-sm font-medium  mb-1"
          >
            Max Price
          </label>
          <input
            id="priceMax"
            type="number"
            placeholder="Max price"
            className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm"
            value={filters.price_max || ""}
            onChange={(e) => handlePriceRangeChange("max", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
