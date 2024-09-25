import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as backendIdlFactory } from './plantify.did.js';

const backendCanisterId = '2zhk5-gaaaa-aaaag-amewa-cai';

const agent = new HttpAgent({
  host: "https://icp0.io",
});

if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey();
}

const backendActor = Actor.createActor(backendIdlFactory, {
  agent,
  canisterId: backendCanisterId,
});

export const fetchData = async () => {
  try {
    const result = await backendActor.get_all_paginated_tokens([], []);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
