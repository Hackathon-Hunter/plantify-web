import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface Account__1 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Account__2 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export type CandyShared = { 'Int' : bigint } |
  { 'Map' : Array<[string, CandyShared]> } |
  { 'Nat' : bigint } |
  { 'Set' : Array<CandyShared> } |
  { 'Nat16' : number } |
  { 'Nat32' : number } |
  { 'Nat64' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Bool' : boolean } |
  { 'Int8' : number } |
  { 'Ints' : Array<bigint> } |
  { 'Nat8' : number } |
  { 'Nats' : Array<bigint> } |
  { 'Text' : string } |
  { 'Bytes' : Uint8Array | number[] } |
  { 'Int16' : number } |
  { 'Int32' : number } |
  { 'Int64' : bigint } |
  { 'Option' : [] | [CandyShared] } |
  { 'Floats' : Array<number> } |
  { 'Float' : number } |
  { 'Principal' : Principal } |
  { 'Array' : Array<CandyShared> } |
  { 'ValueMap' : Array<[CandyShared, CandyShared]> } |
  { 'Class' : Array<PropertyShared> };
export type NFTInput = { 'Int' : bigint } |
  { 'Map' : Array<[string, CandyShared]> } |
  { 'Nat' : bigint } |
  { 'Set' : Array<CandyShared> } |
  { 'Nat16' : number } |
  { 'Nat32' : number } |
  { 'Nat64' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Bool' : boolean } |
  { 'Int8' : number } |
  { 'Ints' : Array<bigint> } |
  { 'Nat8' : number } |
  { 'Nats' : Array<bigint> } |
  { 'Text' : string } |
  { 'Bytes' : Uint8Array | number[] } |
  { 'Int16' : number } |
  { 'Int32' : number } |
  { 'Int64' : bigint } |
  { 'Option' : [] | [CandyShared] } |
  { 'Floats' : Array<number> } |
  { 'Float' : number } |
  { 'Principal' : Principal } |
  { 'Array' : Array<CandyShared> } |
  { 'ValueMap' : Array<[CandyShared, CandyShared]> } |
  { 'Class' : Array<PropertyShared> };
export type OwnerOfRequest = Array<bigint>;
export type OwnerOfResponse = Array<[] | [Account]>;
export interface Plantify {
  'buy_nft' : ActorMethod<
    [Account__2, Array<TransferArgs>],
    Array<[] | [TransferResult]>
  >,
  'claim_profit' : ActorMethod<[Principal, SetNFTRequest], Array<SetNFTResult>>,
  'detail_token' : ActorMethod<
    [bigint],
    Array<[] | [Array<[string, Value__2]>]>
  >,
  'get_all_paginated_tokens' : ActorMethod<
    [[] | [bigint], [] | [bigint]],
    Array<TokenWithMetadata>
  >,
  'icrc7_tokens_of' : ActorMethod<
    [Account__2, [] | [bigint], [] | [bigint]],
    Array<TokenWithMetadata>
  >,
  'mint' : ActorMethod<[Principal, SetNFTRequest], Array<SetNFTResult>>,
  'tokens_owner' : ActorMethod<[OwnerOfRequest], OwnerOfResponse>,
}
export interface PropertyShared {
  'value' : CandyShared,
  'name' : string,
  'immutable' : boolean,
}
export type SetNFTError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TokenExists' : null } |
  { 'NonExistingTokenId' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export interface SetNFTItemRequest {
  'token_id' : bigint,
  'owner' : [] | [Account__1],
  'metadata' : NFTInput,
  'memo' : [] | [Uint8Array | number[]],
  'override' : boolean,
  'created_at_time' : [] | [bigint],
}
export type SetNFTRequest = Array<SetNFTItemRequest>;
export type SetNFTResult = { 'Ok' : [] | [bigint] } |
  { 'Err' : SetNFTError } |
  { 'GenericError' : { 'message' : string, 'error_code' : bigint } };
export type Subaccount = Uint8Array | number[];
export interface TokenWithMetadata {
  'id' : bigint,
  'metadata' : Array<[] | [Array<[string, Value]>]>,
}
export interface TransferArgs {
  'to' : Account,
  'token_id' : bigint,
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
}
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'NonExistingTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'InvalidRecipient' : null } |
  { 'GenericBatchError' : { 'message' : string, 'error_code' : bigint } } |
  { 'TooOld' : null };
export type TransferResult = { 'Ok' : bigint } |
  { 'Err' : TransferError };
export type Value = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value__1]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value__1> };
export type Value__1 = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value__1]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value__1> };
export type Value__2 = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value__1]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value__1> };
export interface _SERVICE extends Plantify {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
