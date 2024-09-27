import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal'
import { idlFactory as backendIdlFactory } from './plantify.did.js';
import { Principal } from '@dfinity/principal';

const agent = new HttpAgent({
  host: process.env.NEXT_PUBLIC_HOST,
});

if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey().catch(err => console.error("Failed to fetch root key:", err));
}

const backendActor: ActorSubclass<any> = Actor.createActor<any>(backendIdlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID as unknown as Principal,
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