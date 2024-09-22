import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as backendIdlFactory } from './basic-nft-backend.did.js';

const backendCanisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

const agent = new HttpAgent({
  host: "http://localhost:4943",
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
    const result = await backendActor.icrc7_logo();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
