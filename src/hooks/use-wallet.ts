import { IUseWallet } from "@/types/hooks";
import { useCallback, useEffect, useState } from "react";

export default function useWallet(): IUseWallet {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  async function requestBalance() {
    (async () => {
      const result = await window.ic?.plug?.requestBalance();
      console.log(result);
    })();

    // setBalance(balance);
  }

  const verifyConnection = useCallback(async () => {
    const connected: boolean = await window.ic.plug.isConnected();
    setIsConnected(connected);
    if (connected) {
      await requestBalance();
    }
  }, []);

  useEffect(() => {
    verifyConnection();
  });

  async function connect() {
    try {
      await window.ic.plug.requestConnect();
      setIsConnected(true);
      await requestBalance();
    } catch (e) {
      console.error("Failed to connect to wallet");
      console.error(e);
    }
  }

  return {
    balance: balance,
    isConnected: isConnected,
    connect: connect,
  };
}
