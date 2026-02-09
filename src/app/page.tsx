"use client";

import { useState } from "react";

// Arcium brand colors
const colors = {
  primary: "#8B5CF6",
  primaryDark: "#7C3AED",
  secondary: "#06B6D4",
  accent: "#F472B6",
  dark: "#0F0F23",
  darker: "#070714",
  surface: "#1A1A2E",
  surfaceLight: "#252542",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
};

// Lock icon component
function LockIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 1C8.676 1 6 3.676 6 7v2H4a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V10a1 1 0 00-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10a2 2 0 011 3.732V19a1 1 0 11-2 0v-2.268A2 2 0 0112 13z"/>
    </svg>
  );
}

// Shield icon component  
function ShieldIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  );
}

interface Auction {
  id: string;
  title: string;
  description: string;
  endTime: string;
  bidCount: number;
  status: "active" | "ended";
  minBid: number;
}

const mockAuctions: Auction[] = [
  {
    id: "1",
    title: "Rare Digital Artwork #001",
    description: "A unique piece of generative art with encrypted provenance",
    endTime: "2026-02-15T18:00:00Z",
    bidCount: 12,
    status: "active",
    minBid: 0.5,
  },
  {
    id: "2", 
    title: "Vintage NFT Collection",
    description: "Early blockchain collectibles with private bid history",
    endTime: "2026-02-12T12:00:00Z",
    bidCount: 8,
    status: "active",
    minBid: 1.2,
  },
  {
    id: "3",
    title: "Exclusive Access Token",
    description: "VIP membership with confidential auction process",
    endTime: "2026-02-10T00:00:00Z",
    bidCount: 25,
    status: "ended",
    minBid: 2.0,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"browse" | "create" | "mybids">("browse");
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const formatTimeLeft = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className="min-h-screen" style={{ background: colors.darker }}>
      {/* Header */}
      <header className="border-b" style={{ 
        borderColor: `${colors.primary}33`,
        background: `${colors.dark}cc`,
        backdropFilter: "blur(10px)"
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-gradient">
              <LockIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>
                Blind Auctions
              </h1>
              <p className="text-xs" style={{ color: colors.textMuted }}>
                Powered by Arcium MPC
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ 
                background: `${colors.primary}15`,
                border: `1px solid ${colors.primary}40`,
                color: colors.primary
              }}>
              <ShieldIcon className="w-4 h-4" />
              <span>Privacy Protected</span>
            </div>
            
            <button
              onClick={() => setWalletConnected(!walletConnected)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: walletConnected 
                  ? colors.surface 
                  : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: colors.text,
                border: walletConnected ? `1px solid ${colors.primary}40` : "none"
              }}
            >
              {walletConnected ? "Fx4G...jUc" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl"
            style={{ background: colors.primary }} />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: colors.secondary }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              background: `${colors.primary}15`,
              border: `1px solid ${colors.primary}30`
            }}>
            <LockIcon className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-sm" style={{ color: colors.primary }}>
              Encrypted Bids via Multi-Party Computation
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: colors.text }}>
            Private Auctions on{" "}
            <span className="bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
              }}>
              Solana
            </span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: colors.textMuted }}>
            Place confidential bids that remain encrypted until auction close. 
            Powered by Arcium&apos;s multi-party computation for true bid privacy.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("browse")}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: colors.text
              }}
            >
              Browse Auctions
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.primary}40`
              }}
            >
              Create Auction
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-2 p-1 rounded-xl w-fit" style={{ background: colors.surface }}>
          {[
            { id: "browse", label: "Browse Auctions" },
            { id: "create", label: "Create Auction" },
            { id: "mybids", label: "My Bids" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
              style={{
                background: activeTab === tab.id 
                  ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                  : "transparent",
                color: activeTab === tab.id ? colors.text : colors.textMuted
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Browse Auctions Tab */}
        {activeTab === "browse" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAuctions.map((auction) => (
              <div
                key={auction.id}
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: colors.surface,
                  border: `1px solid ${colors.primary}20`
                }}
                onClick={() => setSelectedAuction(auction)}
              >
                {/* Auction Image Placeholder */}
                <div className="h-40 rounded-xl mb-4 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}30 0%, ${colors.secondary}30 100%)`
                  }}>
                  <LockIcon className="w-12 h-12" style={{ color: colors.primary }} />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: auction.status === "active" 
                        ? `${colors.success}20` 
                        : `${colors.textMuted}20`,
                      color: auction.status === "active" ? colors.success : colors.textMuted
                    }}>
                    {auction.status === "active" ? "Live" : "Ended"}
                  </span>
                  <span className="text-xs" style={{ color: colors.textMuted }}>
                    {formatTimeLeft(auction.endTime)}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-1" style={{ color: colors.text }}>
                  {auction.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: colors.textMuted }}>
                  {auction.description}
                </p>
                
                <div className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid ${colors.primary}20` }}>
                  <div>
                    <p className="text-xs" style={{ color: colors.textMuted }}>Min Bid</p>
                    <p className="font-bold" style={{ color: colors.primary }}>
                      {auction.minBid} SOL
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: colors.textMuted }}>Bids</p>
                    <p className="font-bold flex items-center gap-1" style={{ color: colors.text }}>
                      <LockIcon className="w-3 h-3" style={{ color: colors.primary }} />
                      {auction.bidCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Auction Tab */}
        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto rounded-2xl p-8"
            style={{ 
              background: colors.surface,
              border: `1px solid ${colors.primary}20`
            }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${colors.primary}20` }}>
                <LockIcon style={{ color: colors.primary }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  Create New Auction
                </h2>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  All bids will be encrypted via Arcium MPC
                </p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Auction Title
                </label>
                <input
                  type="text"
                  placeholder="Enter auction title..."
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                  style={{
                    background: colors.darker,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe your auction item..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                  style={{
                    background: colors.darker,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text
                  }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Minimum Bid (SOL)
                  </label>
                  <input
                    type="number"
                    placeholder="0.5"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: colors.darker,
                      border: `1px solid ${colors.primary}30`,
                      color: colors.text
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    placeholder="24"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: colors.darker,
                      border: `1px solid ${colors.primary}30`,
                      color: colors.text
                    }}
                  />
                </div>
              </div>
              
              <div className="p-4 rounded-xl" style={{ background: `${colors.primary}10` }}>
                <div className="flex items-start gap-3">
                  <ShieldIcon className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: colors.primary }}>
                      Privacy Notice
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                      All bids will be encrypted using Arcium&apos;s MPC technology. 
                      Bid amounts remain hidden until the auction ends.
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  color: colors.text
                }}
                disabled={!walletConnected}
              >
                {walletConnected ? "Create Encrypted Auction" : "Connect Wallet to Create"}
              </button>
            </div>
          </div>
        )}

        {/* My Bids Tab */}
        {activeTab === "mybids" && (
          <div className="max-w-3xl mx-auto">
            {!walletConnected ? (
              <div className="text-center py-16 rounded-2xl"
                style={{ 
                  background: colors.surface,
                  border: `1px solid ${colors.primary}20`
                }}>
                <LockIcon className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                  Connect Your Wallet
                </h3>
                <p className="mb-6" style={{ color: colors.textMuted }}>
                  Connect your wallet to view your encrypted bids
                </p>
                <button
                  onClick={() => setWalletConnected(true)}
                  className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: colors.text
                  }}
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-5 rounded-xl flex items-center justify-between"
                  style={{ 
                    background: colors.surface,
                    border: `1px solid ${colors.primary}20`
                  }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${colors.primary}20` }}>
                      <LockIcon style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <h4 className="font-bold" style={{ color: colors.text }}>
                        Rare Digital Artwork #001
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${colors.warning}20`, color: colors.warning }}>
                          Pending
                        </span>
                        <span className="text-xs" style={{ color: colors.textMuted }}>
                          Ends in 6d 4h
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: colors.textMuted }}>Your Bid</p>
                    <p className="font-bold flex items-center gap-1" style={{ color: colors.primary }}>
                      <LockIcon className="w-3 h-3" />
                      Encrypted
                    </p>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl flex items-center justify-between"
                  style={{ 
                    background: colors.surface,
                    border: `1px solid ${colors.success}30`
                  }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${colors.success}20` }}>
                      <ShieldIcon style={{ color: colors.success }} />
                    </div>
                    <div>
                      <h4 className="font-bold" style={{ color: colors.text }}>
                        Exclusive Access Token
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${colors.success}20`, color: colors.success }}>
                          Won
                        </span>
                        <span className="text-xs" style={{ color: colors.textMuted }}>
                          Ended 2 days ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: colors.textMuted }}>Winning Bid</p>
                    <p className="font-bold" style={{ color: colors.success }}>
                      2.5 SOL
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bid Modal */}
      {selectedAuction && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedAuction(null)}
        >
          <div 
            className="w-full max-w-md rounded-2xl p-6"
            style={{ 
              background: colors.surface,
              border: `1px solid ${colors.primary}30`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                Place Encrypted Bid
              </h3>
              <button 
                onClick={() => setSelectedAuction(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: colors.darker }}
              >
                <span style={{ color: colors.textMuted }}>×</span>
              </button>
            </div>
            
            <div className="mb-4 p-4 rounded-xl" style={{ background: colors.darker }}>
              <h4 className="font-bold mb-1" style={{ color: colors.text }}>
                {selectedAuction.title}
              </h4>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                {selectedAuction.description}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Your Bid Amount (SOL)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Min: ${selectedAuction.minBid} SOL`}
                step="0.1"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: colors.darker,
                  border: `1px solid ${colors.primary}30`,
                  color: colors.text
                }}
              />
            </div>
            
            <div className="p-3 rounded-xl mb-4 flex items-center gap-2"
              style={{ background: `${colors.primary}10` }}>
              <LockIcon className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-xs" style={{ color: colors.primary }}>
                Your bid will be encrypted and hidden until auction ends
              </span>
            </div>
            
            <button
              className="w-full py-3 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: colors.text
              }}
              disabled={!walletConnected || !bidAmount}
            >
              {walletConnected ? "Submit Encrypted Bid" : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: `${colors.primary}20` }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span style={{ color: colors.textMuted }}>Built with</span>
            <span className="font-bold" style={{ color: colors.primary }}>Arcium MPC</span>
            <span style={{ color: colors.textMuted }}>on</span>
            <span className="font-bold" style={{ color: colors.secondary }}>Solana</span>
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: colors.textMuted }}>
            <a href="https://github.com/giwaov/arcium-blind-auction" 
              target="_blank" rel="noopener noreferrer"
              className="hover:underline">GitHub</a>
            <a href="https://arcium.com" target="_blank" rel="noopener noreferrer"
              className="hover:underline">Arcium</a>
            <a href="https://explorer.solana.com/address/EGePzFcrUy9d9uxQk7eutiAjUK1kbXHs8FydhMTZWJXX?cluster=devnet" 
              target="_blank" rel="noopener noreferrer"
              className="hover:underline">Program</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
