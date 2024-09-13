"use client";

import React, { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";


// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const devmode = parseInt(String(process.env.NEXT_PUBLIC_DEV_MODE) || "0")

    const network = devmode > 0 ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;
    const endpoint = String(process.env.NEXT_PUBLIC_RPC);
    const wallets = useMemo(
        () => [

        ],
        [network],
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}