import type { Principal } from "@dfinity/principal"

export interface IUseWallet {
  balance: number;
  isConnected: boolean;
  connect: () => void;
  reqBalance: () => void;
  actor: any;
  transfer: () => void;
  principalId?: Principal;
}
