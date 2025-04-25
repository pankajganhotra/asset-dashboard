import { useAuth } from "@/hooks/useAuth";

export default function ConnectWallet() {
  const { connectWallet, disconnectWallet, account } = useAuth();

  return (
    <div className="ml-6 flex items-center space-x-4">
      {account ? (
        <>
          <span className="text-sm font-mono text-gray-700">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
