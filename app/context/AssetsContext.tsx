import React, { createContext, useContext, useState } from "react";

type ViewType = "grid" | "list";

interface AssetUIContextType {
  searchQuery: string;
  sortBy: string;
  filters: Record<string, string>;
  viewType: ViewType;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setViewType: (viewType: ViewType) => void;
}

const AssetUIContext = createContext<AssetUIContextType | undefined>(undefined);

export const AssetUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [viewType, setViewType] = useState<ViewType>("list");

  return (
    <AssetUIContext.Provider value={{ searchQuery, setSearchQuery, sortBy, setSortBy, filters, setFilters, viewType, setViewType }}>
      {children}
    </AssetUIContext.Provider>
  );
};

export const useAssetUI = () => {
  const context = useContext(AssetUIContext);
  if (!context) {
    throw new Error("useAssetUI must be used within an AssetUIProvider");
  }
  return context;
};
