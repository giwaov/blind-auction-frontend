import { Connection, PublicKey, GetProgramAccountsFilter } from "@solana/web3.js";
import * as borsh from "borsh";

// Program ID
export const PROGRAM_ID = new PublicKey("EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX");

// Devnet RPC
export const DEVNET_RPC = "https://api.devnet.solana.com";

// Auction interface
export interface AuctionAccount {
  auctionId: Uint8Array;
  authority: PublicKey;
  endTime: bigint;
  minBid: bigint;
  isFinalized: boolean;
  bump: number;
}

// Auction with PDA key
export interface AuctionWithKey {
  publicKey: PublicKey;
  account: AuctionAccount;
}

// Auction for UI display
export interface DisplayAuction {
  id: string;
  publicKey: string;
  title: string;
  description: string;
  endTime: string;
  status: "active" | "ended";
  minBid: number;
  authority: string;
  isFinalized: boolean;
}

// Anchor discriminator for Auction account (first 8 bytes of sha256("account:Auction"))
const AUCTION_DISCRIMINATOR = Buffer.from([
  218, 94, 247, 242, 126, 233, 131, 81
]);

// Borsh schema for deserializing auction accounts
class AuctionSchema {
  auctionId: Uint8Array;
  authority: Uint8Array;
  endTime: bigint;
  minBid: bigint;
  isFinalized: boolean;
  bump: number;

  constructor(props: {
    auctionId: Uint8Array;
    authority: Uint8Array;
    endTime: bigint;
    minBid: bigint;
    isFinalized: boolean;
    bump: number;
  }) {
    this.auctionId = props.auctionId;
    this.authority = props.authority;
    this.endTime = props.endTime;
    this.minBid = props.minBid;
    this.isFinalized = props.isFinalized;
    this.bump = props.bump;
  }
}

// Parse auction account data
function parseAuctionAccount(data: Buffer): AuctionAccount | null {
  try {
    // Check discriminator
    if (!data.slice(0, 8).equals(AUCTION_DISCRIMINATOR)) {
      return null;
    }

    // Skip discriminator (8 bytes)
    const accountData = data.slice(8);

    // Manual parsing based on Rust struct layout
    // [u8; 32] auction_id
    const auctionId = accountData.slice(0, 32);
    // Pubkey (32 bytes) authority
    const authority = new PublicKey(accountData.slice(32, 64));
    // i64 end_time (8 bytes, little-endian)
    const endTime = accountData.readBigInt64LE(64);
    // u64 min_bid (8 bytes, little-endian)
    const minBid = accountData.readBigUInt64LE(72);
    // bool is_finalized (1 byte)
    const isFinalized = accountData[80] === 1;
    // u8 bump (1 byte)
    const bump = accountData[81];

    return {
      auctionId: new Uint8Array(auctionId),
      authority,
      endTime,
      minBid,
      isFinalized,
      bump,
    };
  } catch (error) {
    console.error("Error parsing auction account:", error);
    return null;
  }
}

// Convert auction_id bytes to hex string for display
function auctionIdToString(auctionId: Uint8Array): string {
  return Array.from(auctionId)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16); // Shortened for display
}

// Generate title from auction ID (deterministic based on bytes)
function generateTitle(auctionId: Uint8Array): string {
  const titles = [
    "Rare Digital Artwork",
    "Exclusive NFT Collection",
    "Limited Edition Token",
    "Premium Access Pass",
    "Vintage Collectible",
    "Encrypted Asset Bundle",
    "Private Auction Item",
    "Special Reserve Token",
  ];
  const index = auctionId[0] % titles.length;
  return `${titles[index]} #${auctionIdToString(auctionId).slice(0, 4)}`;
}

// Generate description from auction ID
function generateDescription(auctionId: Uint8Array): string {
  const descriptions = [
    "A unique asset with encrypted provenance secured by Arcium MPC",
    "Exclusive blockchain collectible with private bid history",
    "Premium item with confidential auction process",
    "Limited availability asset with encrypted bidding",
    "Rare digital item protected by multi-party computation",
    "Special offering with privacy-preserving auction mechanics",
  ];
  const index = auctionId[1] % descriptions.length;
  return descriptions[index];
}

// Fetch all auctions from the program
export async function fetchAllAuctions(connection: Connection): Promise<DisplayAuction[]> {
  try {
    // Get all program accounts
    const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
      commitment: "confirmed",
    });

    const auctions: DisplayAuction[] = [];

    for (const { pubkey, account } of accounts) {
      const parsed = parseAuctionAccount(account.data as Buffer);
      if (parsed) {
        const endTimeMs = Number(parsed.endTime) * 1000;
        const now = Date.now();
        const status: "active" | "ended" = 
          endTimeMs > now && !parsed.isFinalized ? "active" : "ended";

        auctions.push({
          id: auctionIdToString(parsed.auctionId),
          publicKey: pubkey.toBase58(),
          title: generateTitle(parsed.auctionId),
          description: generateDescription(parsed.auctionId),
          endTime: new Date(endTimeMs).toISOString(),
          status,
          minBid: Number(parsed.minBid) / 1e9, // Convert lamports to SOL
          authority: parsed.authority.toBase58(),
          isFinalized: parsed.isFinalized,
        });
      }
    }

    // Sort by end time (active first, then by time)
    auctions.sort((a, b) => {
      if (a.status === "active" && b.status === "ended") return -1;
      if (a.status === "ended" && b.status === "active") return 1;
      return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
    });

    return auctions;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
}

// Fetch a specific auction by PDA
export async function fetchAuction(
  connection: Connection,
  auctionId: Uint8Array
): Promise<DisplayAuction | null> {
  try {
    // Derive PDA
    const [auctionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("auction"), Buffer.from(auctionId)],
      PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(auctionPda);
    if (!accountInfo) return null;

    const parsed = parseAuctionAccount(accountInfo.data as Buffer);
    if (!parsed) return null;

    const endTimeMs = Number(parsed.endTime) * 1000;
    const now = Date.now();
    const status: "active" | "ended" =
      endTimeMs > now && !parsed.isFinalized ? "active" : "ended";

    return {
      id: auctionIdToString(parsed.auctionId),
      publicKey: auctionPda.toBase58(),
      title: generateTitle(parsed.auctionId),
      description: generateDescription(parsed.auctionId),
      endTime: new Date(endTimeMs).toISOString(),
      status,
      minBid: Number(parsed.minBid) / 1e9,
      authority: parsed.authority.toBase58(),
      isFinalized: parsed.isFinalized,
    };
  } catch (error) {
    console.error("Error fetching auction:", error);
    return null;
  }
}

// Derive auction PDA from auction ID
export function deriveAuctionPda(auctionId: Uint8Array): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("auction"), Buffer.from(auctionId)],
    PROGRAM_ID
  );
  return pda;
}

// Generate a random auction ID
export function generateAuctionId(): Uint8Array {
  const id = new Uint8Array(32);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(id);
  } else {
    for (let i = 0; i < 32; i++) {
      id[i] = Math.floor(Math.random() * 256);
    }
  }
  return id;
}

// Get connection to devnet
export function getConnection(): Connection {
  return new Connection(DEVNET_RPC, "confirmed");
}
