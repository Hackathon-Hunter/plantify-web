import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal'
import { idlFactory as backendIdlFactory } from './plantify.did.js';

const agent = new HttpAgent({
  host: "https://icp0.io",
});

if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey().catch(err => console.error("Failed to fetch root key:", err));
}

const backendActor: ActorSubclass<any> = Actor.createActor<any>(backendIdlFactory, {
  agent,
  canisterId: 'yikut-daaaa-aaaam-qbdaq-cai',
});

export const fetchData = async (): Promise<any> => {
  try {
    const result = await backendActor.get_all_paginated_tokens([], []);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const account = {
  owner: Principal.fromText('yikut-daaaa-aaaam-qbdaq-cai'),
  subaccount: [], // or provide a subaccount if you have one
};

export const fetchProfileNft = async (): Promise<ReturnType<any['icrc7_tokens_of']>> => {
  try {
    const result = await backendActor.icrc7_tokens_of(account, [], [])
    console.log("abjjg",result);
    return result
  } catch (error) {
    throw error
  }
}
export const fetchDataDetail = async (query: number): Promise<any> => {
  try {
    const result = await backendActor.detail_token(BigInt(query));
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};