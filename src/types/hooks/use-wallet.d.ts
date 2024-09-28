import type { Principal } from "@dfinity/principal"

export interface IUseWallet {
  balance: number,
  isConnected: boolean,
  connect: () => void,
  reqBalance: () => void,
  actor: any,
  transfer: (priceInE8s: bigint) => Promise<void>,
  walletLoading: boolean,
  principalId?: Principal,
  isInstall: boolean,
  isSuccessTransfer: boolean,
  isFailTransfer: boolean;
}
