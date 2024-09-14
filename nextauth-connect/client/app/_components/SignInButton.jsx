"use client"

import bs58 from "bs58";
import { SigninMessage } from "../_utils/SignInMessage";

import { useEffect } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const wallet = useWallet();
    const walletModal = useWalletModal();

    const handleSignIn = async () => {
        try {
          if (!wallet.connected) {
            walletModal.setVisible(true);
          }
    
          const csrf = await getCsrfToken();
          if (!wallet.publicKey || !csrf || !wallet.signMessage) return;
    
          const message = new SigninMessage({
            domain: window.location.host,
            publicKey: wallet.publicKey?.toBase58(),
            statement: `Sign this message to sign in to the app: `,
            nonce: csrf,
          });
    
          const data = new TextEncoder().encode(message.prepare());
          const signature = await wallet.signMessage(data);
          const serializedSignature = bs58.encode(signature);
    
          signIn("credentials", {
            message: JSON.stringify(message),
            redirect: false,
            signature: serializedSignature,
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
          handleSignIn();
        }
      }, [wallet.connected]);

      useEffect(() => {
        // Invalidate session and signout if connected wallet not matching
        const walletkey = String(wallet.publicKey?.toBase58() || "")
        const sessionkey = String(session?.user.name || "")
        if(walletkey.length > 1 && sessionkey.length > 1) {
            if(walletkey !== sessionkey) {
                signOut();
            }
        }
      }, [wallet, session])

    return(
        <div>
            {!session ? (
              <button className="btn" onClick={handleSignIn}>
                Sign In
              </button>
          ):(
            <button className="btn" onClick={signOut}>
                Sign Out
            </button>
          )}
        </div>
    )
}