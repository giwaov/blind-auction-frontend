// IDL for the Blind Auction program
// Program ID: EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX

export type BlindAuction = {
  version: "0.1.0";
  name: "blind_auction";
  address: "EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX";
  metadata: {
    name: "blind_auction";
    version: "0.1.0";
    spec: "0.1.0";
  };
  instructions: [
    {
      name: "initAuction";
      discriminator: number[];
    },
    {
      name: "placeBid";
      discriminator: number[];
    },
    {
      name: "closeAuction";
      discriminator: number[];
    }
  ];
  accounts: [
    {
      name: "Auction";
      discriminator: number[];
    }
  ];
  types: [
    {
      name: "Auction";
      type: {
        kind: "struct";
        fields: [
          { name: "auctionId"; type: { array: ["u8", 32] } },
          { name: "authority"; type: "pubkey" },
          { name: "endTime"; type: "i64" },
          { name: "minBid"; type: "u64" },
          { name: "isFinalized"; type: "bool" },
          { name: "bump"; type: "u8" }
        ];
      };
    }
  ];
  events: [
    {
      name: "AuctionCreated";
      discriminator: number[];
    },
    {
      name: "BidPlaced";
      discriminator: number[];
    },
    {
      name: "AuctionFinalized";
      discriminator: number[];
    }
  ];
};

// Auction account size: 8 (discriminator) + 32 + 32 + 8 + 8 + 1 + 1 = 90 bytes
export const AUCTION_SIZE = 90;

// Program ID
export const PROGRAM_ID = "EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX";

// IDL JSON for Anchor
export const IDL = {
  version: "0.1.0",
  name: "blind_auction",
  address: "EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX",
  metadata: {
    name: "blind_auction",
    version: "0.1.0",
    spec: "0.1.0",
  },
  instructions: [
    {
      name: "initAuction",
      docs: ["Initialize a new auction with encrypted bid tracking"],
      accounts: [
        { name: "payer", isMut: true, isSigner: true },
        { name: "auction", isMut: true, isSigner: false },
        { name: "signPdaAccount", isMut: true, isSigner: false },
        { name: "mxeAccount", isMut: false, isSigner: false },
        { name: "mempoolAccount", isMut: true, isSigner: false },
        { name: "executingPool", isMut: true, isSigner: false },
        { name: "computationAccount", isMut: true, isSigner: false },
        { name: "compDefAccount", isMut: false, isSigner: false },
        { name: "clusterAccount", isMut: true, isSigner: false },
        { name: "poolAccount", isMut: true, isSigner: false },
        { name: "clockAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "arciumProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "computationOffset", type: "u64" },
        { name: "auctionId", type: { array: ["u8", 32] } },
        { name: "pubkey", type: { array: ["u8", 32] } },
        { name: "nonce", type: "u128" },
        { name: "endTime", type: "i64" },
        { name: "minBid", type: "u64" },
      ],
    },
    {
      name: "placeBid",
      docs: ["Place an encrypted bid on an auction"],
      accounts: [
        { name: "bidder", isMut: true, isSigner: true },
        { name: "auction", isMut: true, isSigner: false },
        { name: "signPdaAccount", isMut: true, isSigner: false },
        { name: "mxeAccount", isMut: false, isSigner: false },
        { name: "mempoolAccount", isMut: true, isSigner: false },
        { name: "executingPool", isMut: true, isSigner: false },
        { name: "computationAccount", isMut: true, isSigner: false },
        { name: "compDefAccount", isMut: false, isSigner: false },
        { name: "clusterAccount", isMut: true, isSigner: false },
        { name: "poolAccount", isMut: true, isSigner: false },
        { name: "clockAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "arciumProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "computationOffset", type: "u64" },
        { name: "pubkey", type: { array: ["u8", 32] } },
        { name: "nonce", type: "u128" },
        { name: "encryptedBid", type: { array: ["u8", 32] } },
      ],
    },
    {
      name: "closeAuction",
      docs: ["Close the auction and reveal winner"],
      accounts: [
        { name: "authority", isMut: true, isSigner: true },
        { name: "auction", isMut: true, isSigner: false },
        { name: "signPdaAccount", isMut: true, isSigner: false },
        { name: "mxeAccount", isMut: false, isSigner: false },
        { name: "mempoolAccount", isMut: true, isSigner: false },
        { name: "executingPool", isMut: true, isSigner: false },
        { name: "computationAccount", isMut: true, isSigner: false },
        { name: "compDefAccount", isMut: false, isSigner: false },
        { name: "clusterAccount", isMut: true, isSigner: false },
        { name: "poolAccount", isMut: true, isSigner: false },
        { name: "clockAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "arciumProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "computationOffset", type: "u64" },
        { name: "pubkey", type: { array: ["u8", 32] } },
        { name: "nonce", type: "u128" },
      ],
    },
  ],
  accounts: [
    {
      name: "Auction",
      type: {
        kind: "struct",
        fields: [
          { name: "auctionId", type: { array: ["u8", 32] } },
          { name: "authority", type: "pubkey" },
          { name: "endTime", type: "i64" },
          { name: "minBid", type: "u64" },
          { name: "isFinalized", type: "bool" },
          { name: "bump", type: "u8" },
        ],
      },
    },
  ],
  events: [
    {
      name: "AuctionCreated",
      fields: [
        { name: "auctionId", type: { array: ["u8", 32] } },
        { name: "authority", type: "pubkey" },
        { name: "endTime", type: "i64" },
        { name: "minBid", type: "u64" },
      ],
    },
    {
      name: "BidPlaced",
      fields: [
        { name: "auctionId", type: { array: ["u8", 32] } },
        { name: "bidder", type: "pubkey" },
      ],
    },
    {
      name: "AuctionFinalized",
      fields: [],
    },
  ],
  errors: [
    { code: 6000, name: "ComputationFailed", msg: "Computation failed" },
    { code: 6001, name: "ClusterNotSet", msg: "Cluster not set" },
    { code: 6002, name: "AuctionEnded", msg: "Auction has ended" },
    { code: 6003, name: "AuctionNotEnded", msg: "Auction not yet ended" },
    { code: 6004, name: "AuctionAlreadyFinalized", msg: "Auction already finalized" },
    { code: 6005, name: "Unauthorized", msg: "Unauthorized" },
  ],
};
