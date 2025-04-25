# 📈 Crypto Assets Dashboard

A real-time cryptocurrency dashboard powered by the [CoinGecko API](https://www.coingecko.com/en/api/documentation). Supports filtering, sorting, searching, and infinite scrolling of crypto market data.

🔗 **Live Demo**: [https://asset-dashboard.netlify.app/](https://asset-dashboard.netlify.app/)

---

## 🚀 Features

- 🔍 Search by name or symbol
- 📊 Sort by price, market cap, volume, symbol or name
- 🧮 Filter by min/max price
- ♾️ Infinite scrolling with deduplication
- 💹 7-day sparkline charts
- 🔄 Real-time updates every 10 seconds for the first page

---

## 🌐 API Usage

### Endpoint - Coins List

**GET** `https://api.coingecko.com/api/v3/coins/markets`

### Parameters

| Name          | Value             | Description                                 |
|---------------|-------------------|---------------------------------------------|
| `vs_currency` | `usd`             | Return prices in USD                        |
| `order`       | `market_cap_desc` | Default order (client-side sorting used)    |
| `per_page`    | `50`              | Assets per page                             |
| `page`        | `1`, `2`, ...     | Pagination for infinite scroll              |
| `sparkline`   | `true`            | Include 7-day price history                 |


### Endpoint - Coin By ID

**GET** `https://api.coingecko.com/api/v3/coins/[id]`

### Parameters

| Name            | Value  | Description                                      |
|-----------------|--------|--------------------------------------------------|
| `localization`  | `false`| Disables localization data (translations).       |
| `tickers`       | `false`| Disables tickers information.                   |
| `market_data`   | `true` | Includes market data such as prices.            |
| `community_data`| `false`| Disables community data.                        |
| `developer_data`| `false`| Disables developer data.                        |
| `sparkline`     | `true` | Includes 7-day price history.                   |
| `vs_currency`   | `usd`  | Currency to return prices in USD.               |

---
---

## ⚠️ Rate Limiting

CoinGecko API (free tier): **50 requests/minute/IP**

### Mitigation Strategies

- Cached requests using SWR (`stale-while-revalidate`)
- `refreshInterval` set only on page 1 (every 10 seconds)
- Infinite scroll is triggered manually (on user scroll)
- `revalidateOnFocus` disabled to prevent background re-fetching

---

## ❌ Error Handling

- API request failures are exposed through SWR’s `error` return
- Components conditionally render error states and prevent further loading
- Duplicate entries are avoided using `Map` keyed by `asset.id` in `useAssets` hook

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SWR](https://swr.vercel.app/) for data fetching
- [CoinGecko Public API](https://www.coingecko.com/en/api)

---
## 📂 Folder Structure
```txt
├── README.md
├── [symbol]
│   └── page.tsx
├── components
│   ├── AssetDetailModal.tsx
│   ├── AssetFilters.tsx
│   ├── GridView
│   ├── ListView
│   ├── Navbar
│   └── SearchBar.tsx
├── context
│   └── AssetsContext.tsx
├── favicon.ico
├── globals.css
├── hooks
│   ├── useAssetBySymbol.ts
│   ├── useAssets.ts
│   └── useAuth.ts
├── layout.tsx
├── page.tsx
├── screens
│   ├── AssetDetail.tsx
│   └── Home.tsx
├── types
│   ├── asset.ts
│   └── global.d.ts
└── utils
    ├── coingecko.ts
    └── fetchWithRetry.ts
├── dist
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
└── tsconfig.json
```


## 🧑‍💻 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crypto-assets-dashboard.git
cd crypto-assets-dashboard
```

### 2. Install dependencies
```bash
npm install
# or
yarn
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
```


### 4.  Build for production
```bash
npm run build
npm run start
```

## Potential Areas for Future Improvements:

### 1. **Performance Optimization**:
- **Data Preprocessing**: In future versions, we could explore strategies for dynamically fetching token data based on user interaction, reducing the reliance on static data generation for every token ID.
- **Lazy Loading**: Although static data helps with initial render speed, lazy loading of additional data when the user scrolls or interacts with elements can optimize performance for larger datasets.

### 2. **UI Enhancements**:
- **Skeleton Loader/Spinners**: The user interface could benefit from the implementation of skeleton loaders or spinners to indicate that data is being fetched or processed. This would provide a smoother experience for users, especially when the app is waiting for external data.
- **Error Handling UI**: Add more comprehensive error handling UI components for failed data fetches or incorrect token ID lookups to ensure users have clear feedback about any issues.
