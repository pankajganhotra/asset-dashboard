interface EthereumProvider {
  isMetaMask?: boolean;
  request: <T>(args: {
    method: string;
    params?: unknown[];
  }) => Promise<T>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (
    event: string,
    handler: (...args: unknown[]) => void
  ) => void;
  removeAllListeners?: (event: string) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
