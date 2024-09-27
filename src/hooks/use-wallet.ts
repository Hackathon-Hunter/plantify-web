import { IUseWallet } from '@/types/hooks';
import { useCallback, useEffect, useState } from 'react';

export default function useWallet(): IUseWallet {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  const requestBalance = async () => {
    const assets = await window.ic.infinityWallet.getUserAssets();
    console.log(`User's list of tokens/assets`, assets);
  };

  const verifyConnection = useCallback(async () => {
    const connected: boolean = await window.ic.infinityWallet.isConnected();
    setIsConnected(connected);
  }, []);

  useEffect(() => {
    verifyConnection();
  }, []);

  useEffect(() => {}, [isConnected]);

  async function connect() {
    try {
      const publicKey = await window.ic.infinityWallet.requestConnect();
      setIsConnected(true);
    } catch (e) {
      throw e;
    }
  }

  return {
    balance: balance,
    isConnected: isConnected,
    connect: connect,
    reqBalance: requestBalance
  };
}
