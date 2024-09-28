export const idlFactory = ({ IDL }) => {
  const CandyShared = IDL.Rec();
  const Value__1 = IDL.Rec();
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account__2 = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
  });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
  });
  const TransferArgs = IDL.Record({
    to: Account,
    token_id: IDL.Nat,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64)
  });
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat
    }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    NonExistingTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    InvalidRecipient: IDL.Null,
    GenericBatchError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat
    }),
    TooOld: IDL.Null
  });
  const TransferResult = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
  const Account__1 = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
  });
  const PropertyShared = IDL.Record({
    value: CandyShared,
    name: IDL.Text,
    immutable: IDL.Bool
  });
  CandyShared.fill(
    IDL.Variant({
      Int: IDL.Int,
      Map: IDL.Vec(IDL.Tuple(IDL.Text, CandyShared)),
      Nat: IDL.Nat,
      Set: IDL.Vec(CandyShared),
      Nat16: IDL.Nat16,
      Nat32: IDL.Nat32,
      Nat64: IDL.Nat64,
      Blob: IDL.Vec(IDL.Nat8),
      Bool: IDL.Bool,
      Int8: IDL.Int8,
      Ints: IDL.Vec(IDL.Int),
      Nat8: IDL.Nat8,
      Nats: IDL.Vec(IDL.Nat),
      Text: IDL.Text,
      Bytes: IDL.Vec(IDL.Nat8),
      Int16: IDL.Int16,
      Int32: IDL.Int32,
      Int64: IDL.Int64,
      Option: IDL.Opt(CandyShared),
      Floats: IDL.Vec(IDL.Float64),
      Float: IDL.Float64,
      Principal: IDL.Principal,
      Array: IDL.Vec(CandyShared),
      ValueMap: IDL.Vec(IDL.Tuple(CandyShared, CandyShared)),
      Class: IDL.Vec(PropertyShared)
    })
  );
  const NFTInput = IDL.Variant({
    Int: IDL.Int,
    Map: IDL.Vec(IDL.Tuple(IDL.Text, CandyShared)),
    Nat: IDL.Nat,
    Set: IDL.Vec(CandyShared),
    Nat16: IDL.Nat16,
    Nat32: IDL.Nat32,
    Nat64: IDL.Nat64,
    Blob: IDL.Vec(IDL.Nat8),
    Bool: IDL.Bool,
    Int8: IDL.Int8,
    Ints: IDL.Vec(IDL.Int),
    Nat8: IDL.Nat8,
    Nats: IDL.Vec(IDL.Nat),
    Text: IDL.Text,
    Bytes: IDL.Vec(IDL.Nat8),
    Int16: IDL.Int16,
    Int32: IDL.Int32,
    Int64: IDL.Int64,
    Option: IDL.Opt(CandyShared),
    Floats: IDL.Vec(IDL.Float64),
    Float: IDL.Float64,
    Principal: IDL.Principal,
    Array: IDL.Vec(CandyShared),
    ValueMap: IDL.Vec(IDL.Tuple(CandyShared, CandyShared)),
    Class: IDL.Vec(PropertyShared)
  });
  const SetNFTItemRequest = IDL.Record({
    token_id: IDL.Nat,
    owner: IDL.Opt(Account__1),
    metadata: NFTInput,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    override: IDL.Bool,
    created_at_time: IDL.Opt(IDL.Nat64)
  });
  const SetNFTRequest = IDL.Vec(SetNFTItemRequest);
  const SetNFTError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat
    }),
    TokenExists: IDL.Null,
    NonExistingTokenId: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null
  });
  const SetNFTResult = IDL.Variant({
    Ok: IDL.Opt(IDL.Nat),
    Err: SetNFTError,
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat
    })
  });
  Value__1.fill(
    IDL.Variant({
      Int: IDL.Int,
      Map: IDL.Vec(IDL.Tuple(IDL.Text, Value__1)),
      Nat: IDL.Nat,
      Blob: IDL.Vec(IDL.Nat8),
      Text: IDL.Text,
      Array: IDL.Vec(Value__1)
    })
  );
  const Value__2 = IDL.Variant({
    Int: IDL.Int,
    Map: IDL.Vec(IDL.Tuple(IDL.Text, Value__1)),
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
    Array: IDL.Vec(Value__1)
  });
  const Value = IDL.Variant({
    Int: IDL.Int,
    Map: IDL.Vec(IDL.Tuple(IDL.Text, Value__1)),
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
    Array: IDL.Vec(Value__1)
  });
  const TokenWithMetadata = IDL.Record({
    id: IDL.Nat,
    metadata: IDL.Vec(IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, Value))))
  });
  const OwnerOfRequest = IDL.Vec(IDL.Nat);
  const OwnerOfResponse = IDL.Vec(IDL.Opt(Account));
  const Plantify = IDL.Service({
    buy_nft: IDL.Func(
      [Account__2, IDL.Vec(TransferArgs)],
      [IDL.Vec(IDL.Opt(TransferResult))],
      []
    ),
    claim_profit: IDL.Func(
      [IDL.Principal, SetNFTRequest],
      [IDL.Vec(SetNFTResult)],
      []
    ),
    detail_token: IDL.Func(
      [IDL.Nat],
      [IDL.Vec(IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, Value__2))))],
      ['query']
    ),
    get_all_paginated_tokens: IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(TokenWithMetadata)],
      ['query']
    ),
    icrc7_tokens_of: IDL.Func(
      [Account__2, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(TokenWithMetadata)],
      ['query']
    ),
    mint: IDL.Func([IDL.Principal, SetNFTRequest], [IDL.Vec(SetNFTResult)], []),
    tokens_owner: IDL.Func([OwnerOfRequest], [OwnerOfResponse], ['query'])
  });
  return Plantify;
};
export const init = ({ IDL }) => {
  return [];
};
