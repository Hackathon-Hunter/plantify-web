'use client';

import useWallet from '@/hooks/use-wallet';

export default function PlugWallet() {
  const wallet = useWallet();

  return (
    <div className="w-screen h-screen px-12 py-8">
      <div className="flex flex-row gap-4">
        {/* Connect */}
        <div className="relative px-20 pt-8 pb-4 border-2 border-white rounded-xl">
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <h1 className="bg-black px-1 text-3xl font-bold">Plug Wallet</h1>
          </div>
          {wallet.isConnected ? (
            <div>Balance: </div>
          ) : (
            <button
              className="px-8 py-2 bg-blue-500 rounded-lg"
              onClick={wallet.connect}
            >
              connect
            </button>
          )}
        </div>

        <button
          className="px-8 py-2 bg-blue-500 rounded-lg"
          onClick={wallet.reqBalance}
        >
          reqBalance
        </button>

        <button
          className="px-8 py-2 bg-blue-500 rounded-lg"
          onClick={wallet.transfer}
        >
          transfer
        </button>

        {/* Coffee shop */}
      </div>
    </div>
  );
}
