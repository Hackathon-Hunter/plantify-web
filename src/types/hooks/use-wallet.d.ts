export interface IUseWallet {
  balance: number;
  isConnected: boolean;
  connect: () => void;
}
