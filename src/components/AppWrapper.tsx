"use client";

import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import wallet provider to avoid SSR issues
const WalletContextProvider = dynamic(
  () =>
    import("@/components/WalletContextProvider").then(
      (mod) => mod.WalletContextProvider
    ),
  { ssr: false }
);

interface Props {
  children: ReactNode;
}

export const AppWrapper: FC<Props> = ({ children }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};
