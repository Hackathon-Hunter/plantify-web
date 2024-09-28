import type { Principal } from "@dfinity/principal"

export interface IUseWallet {
  balance: number,
  isConnected: boolean,
  connect: () => void,
  reqBalance: () => void,
  actor: any,
  transfer: (priceInE8s: number) => Promise<void>,
  walletLoading: boolean,
  principalId?: Principal;
}
