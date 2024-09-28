import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as backendIdlFactory } from './plantify.did.js';
import { NFTData } from '@/types/index.js';
import { IDL } from '@dfinity/candid';
import type {
  Plantify,
  SetNFTItemRequest,
  SetNFTResult,
  TransferArgs,
  TransferResult
} from './plantify.did';

const agent = new HttpAgent({
  host: 'https://icp0.io'
});

if (process.env.NODE_ENV !== 'production') {
  agent
    .fetchRootKey()
    .catch(err => console.error('Failed to fetch root key:', err));
}

const backendActor: ActorSubclass<Plantify> = Actor.createActor<Plantify>(
  backendIdlFactory,
  {
    agent,
    canisterId: 'yikut-daaaa-aaaam-qbdaq-cai'
  }
);

export const fetchData = async (): Promise<any> => {
  try {
    const result = await backendActor.get_all_paginated_tokens([], []);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchProfileNft = async (): Promise<
  ReturnType<any['icrc7_tokens_of']>
> => {
  try {
    const result = await backendActor.icrc7_tokens_of(
      {
        owner: Principal.fromText('yikut-daaaa-aaaam-qbdaq-cai'),
        subaccount: []
      },
      [],
      []
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchDataDetail = async (query: number): Promise<any> => {
  try {
    const result = await backendActor.detail_token(BigInt(query));
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const buyNft = async (
  buyer: Principal,
  tokenId: number
): Promise<([] | [TransferResult])[]> => {
  try {
    const adminPrincipal = Principal.from('yikut-daaaa-aaaam-qbdaq-cai');

    const transferArgs: TransferArgs = {
      to: {
        owner: buyer,
        subaccount: []
      },
      created_at_time: [],
      from_subaccount: [],
      memo: [],
      token_id: BigInt(tokenId)
    };

    const result = await backendActor.buy_nft(
      {
        owner: adminPrincipal,
        subaccount: []
      },
      [transferArgs]
    );

    return result;
  } catch (error) {
    console.error('Error send data:', error);
    throw error;
  }
};

export const claimProfit = async (
  tokenId: number,
  metadata: NFTData,
  owner: Principal
): Promise<SetNFTResult[]> => {
  try {
    const adminPrincipal = Principal.from('yikut-daaaa-aaaam-qbdaq-cai');
    const NFTRequest: SetNFTItemRequest = {
      token_id: BigInt(tokenId),
      owner: [
        {
          owner: owner,
          subaccount: []
        }
      ],
      metadata: {
        Map: [
          ['image', { Text: metadata.images ?? '' }],
          ['name', { Text: metadata.names ?? '' }],
          ['price', { Nat32: metadata.prices ?? 0 }],
          ['description', { Text: metadata.descriptions ?? '' }],
          ['location', { Text: metadata.locations ?? '' }],
          ['harvest_time', { Text: metadata.harvestTimes ?? '' }],
          ['harvest_profit', { Nat32: metadata.harvestProfits ?? 0 }],
          ['size_area', { Nat32: metadata.sizeAreas ?? 0 }],
          ['lat', { Nat32: metadata.lat ?? 0 }],
          ['long', { Nat32: metadata.long ?? 0 }],
          ['is_claimed', { Bool: true }]
        ]
      },
      memo: [],
      override: true,
      created_at_time: []
    };

    const result = await backendActor.claim_profit(adminPrincipal, [
      NFTRequest
    ]);
    return result;
  } catch (error) {
    console.error('Error send data:', error);
    throw error;
  }
};
