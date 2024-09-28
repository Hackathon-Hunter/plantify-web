import { useCallback, useEffect, useState } from 'react';
import { AccountIdentifier } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';
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
  const [principalId, setPrincipalId] = useState<string>();

  async function connect() {
    try {
      const nnsCanisterId =
        process.env.CANISTER_ID_APP || 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
      await window.ic.infinityWallet.requestConnect();

      const NNSUiActor = await window.ic.infinityWallet.createActor({
        canisterId: nnsCanisterId,
        interfaceFactory: nnsPartialInterfaceFactory,
        host: 'http://localhost:4943/'
      });

      setWalletActor(NNSUiActor);
      setIsConnected(true);
    } catch (e) {
      throw e;
    }
  }

  async function getPrincipal() {
    const id = await window.ic.infinityWallet.getPrincipal();
    setPrincipalId(id);
  }

  const requestBalance = async () => {
    const assets = await window.ic.infinityWallet.getUserAssets();
    console.log(`User's list of tokens/assets`, assets);
  };

  const verifyConnection = useCallback(async () => {
    const connected: boolean = await window.ic.infinityWallet.isConnected();
    setIsConnected(connected);
  }, []);

  const transfer = async () => {
    const TRANSFER_ICP_TX = {
      idl: idlFactory,
      canisterId: NNS_LEDGER_CID,
      methodName: 'send_dfx',
      args: [
        {
          to: AccountIdentifier.fromPrincipal({
            principal: Principal.from(
              'defj4-nolus-e5dx5-xkqpd-tf7nx-4j63j-wdv44-p2e47-2jqsb-bxqgi-hqe'
            )
          }).toHex(),
          fee: { e8s: BigInt(10000) },
          amount: { e8s: BigInt(100000) },
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
      console.log(TRANSFER_ICP_TX);
      const transfer = await window.ic.infinityWallet.batchTransactions(
        [TRANSFER_ICP_TX],
        {
          host: undefined
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyConnection();
  }, []);

  return {
    balance: balance,
    isConnected: isConnected,
    connect: connect,
    reqBalance: requestBalance,
    actor: walletActor,
    transfer: transfer,
    principalId: principalId
  };
}
