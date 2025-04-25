import { useEffect, useState } from "react";

import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

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

export const useAuth = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const connectWallet = async () => {
    const ethereum = window.ethereum;
    if (typeof window === "undefined" || !ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });

      const _provider = new ethers.BrowserProvider(ethereum);
      const _signer = await _provider.getSigner();

      setAccount(accounts[0]);
      setProvider(_provider);
      setSigner(_signer);
      localStorage.setItem("isWalletConnected", "true");
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    localStorage.removeItem("isWalletConnected");
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (localStorage.getItem("isWalletConnected") === "true") {
        await connectWallet();
      }
    };

    autoConnect();

    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", ((accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      }) as (...args: unknown[]) => void); 

      ethereum.on("disconnect", () => {
        disconnectWallet();
      });
    }

    return () => {
      const ethereum = window.ethereum;
      if (ethereum) {
        ethereum.removeAllListeners?.("accountsChanged");
        ethereum.removeAllListeners?.("disconnect");
      }
    };
  }, []);

  return {
    account,
    isConnected: !!account,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
  };
};
