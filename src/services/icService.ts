import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { idlFactory as backendIdlFactory } from './plantify.did.js';

const backendCanisterId: String = 'yikut-daaaa-aaaam-qbdaq-cai';

const agent = new HttpAgent({
  host: "https://icp0.io",
});

// Fetch the root key only in development mode
if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey().catch(err => console.error("Failed to fetch root key:", err));
}

// Create the actor for interacting with the canister
const backendActor: ActorSubclass<_SERVICE> = Actor.createActor<_SERVICE>(backendIdlFactory, {
  agent,
  canisterId: backendCanisterId,
});

// Function to fetch data from the canister
export const fetchData = async (): Promise<ReturnType<_SERVICE['get_all_paginated_tokens']>> => {
  try {
    // Call the method to fetch all paginated tokens
    const result = await backendActor.get_all_paginated_tokens([], []);
    console.log('Data fetched:', result); // Log the result for debugging
    return result;
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error for debugging
    throw error;
  }
};