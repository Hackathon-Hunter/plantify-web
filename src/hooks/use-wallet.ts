import { useCallback, useEffect, useState } from 'react';

import { AccountIdentifier } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';
import type { Principal as PrincipalType } from '@dfinity/principal';
import { IUseWallet } from '@/types/hooks';
import { idlFactory } from './service.did';

export const NNS_LEDGER_CID = 'ryjl3-tyaaa-aaaaa-aaaba-cai';

const nnsPartialInterfaceFactory = ({ IDL }: { IDL: any }) => {
  const BlockHeight = IDL.Nat64;
  const Stats = IDL.Record({
    latest_transaction_block_height: BlockHeight,
    seconds_since_last_ledger_sync: IDL.Nat64,
    sub_accounts_count: IDL.Nat64,
    hardware_wallet_accounts_count: IDL.Nat64,
    accounts_count: IDL.Nat64,
    earliest_transaction_block_height: BlockHeight,
    transactions_count: IDL.Nat64,
    block_height_synced_up_to: IDL.Opt(IDL.Nat64),
    latest_transaction_timestamp_nanos: IDL.Nat64,
    earliest_transaction_timestamp_nanos: IDL.Nat64
  });
  return IDL.Service({
    get_stats: IDL.Func([], [Stats], ['query'])
  });
};

export default function useWallet(): IUseWallet {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [walletActor, setWalletActor] = useState<any>();
  const [principalId, setPrincipalId] = useState<PrincipalType>();

  const [walletLoading, setWalletLoading] = useState<boolean>(true); 

  async function getPrincipal() {
    const id = await window.ic.infinityWallet.getPrincipal();
    setPrincipalId(id);
  }

  async function connect() {
    try {
      const nnsCanisterId =
        process.env.CANISTER_ID_APP || 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
      await window.ic.infinityWallet.requestConnect();

      const NNSUiActor = await window.ic.infinityWallet.createActor({
        canisterId: nnsCanisterId,
        interfaceFactory: nnsPartialInterfaceFactory,
        host: undefined
      });

      setWalletActor(NNSUiActor);
      setWalletLoading(false)
      setIsConnected(true);
    } catch (e) {
      throw e;
    }
  }

  const reqBalance = async () => {
    const assets = await window.ic.infinityWallet.getUserAssets();
    // setProfile(assets);
    setWalletLoading(false)
  };

  const verifyConnection = useCallback(async () => {
    const connected: boolean = await window.ic.infinityWallet.isConnected();
    setWalletLoading(false)
    setIsConnected(connected);
  }, []);

  const transfer = async (priceInE8s: bigint) => {
    const TRANSFER_ICP_TX = {
      idl: idlFactory,
      canisterId: NNS_LEDGER_CID,
      methodName: 'send_dfx',
      args: [
        {
          to: 'fc9d25fbae9fb7c3a48c30fdbe172ea6ef0a949a863c2afd7bb3cf96578e2d3c',
          fee: { e8s: BigInt(10000) }, 
          amount: { e8s: BigInt(priceInE8s) },  
          memo: 123,
          from_subaccount: [],
          created_at_time: []
        }
      ],
      onSuccess: async (_res: any) => {
        console.log('transferred icp successfully');
      },
      onFail: (res: any) => {
        console.log('transfer icp error', res);
      }
    };

    try {
      const transfer = await window.ic.infinityWallet.batchTransactions(
        [TRANSFER_ICP_TX],
        { host: undefined }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyConnection();

    if(isConnected) getPrincipal()
  }, [isConnected]);

  return {
    balance: balance,
    isConnected: isConnected,
    connect: connect,
    reqBalance: reqBalance,
    actor: walletActor,
    principalId: principalId,
    transfer,
    walletLoading
  };
}
