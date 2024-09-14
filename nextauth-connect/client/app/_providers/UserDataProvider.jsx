"use client"

import { useState, createContext, useEffect } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useSession } from "next-auth/react";

const UserDataContext = createContext({state: {}, actions: {}});
const LAMPORTS_PER_SOL = 1000000000

const UserDataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const { publicKey, connected  } = useWallet();
    const { connection }  = useConnection();
    const { data: session } = useSession();

    useEffect(() => {
    if (publicKey && connected && session) {
          (async function refreshUserData() {

            const newBalance = await connection.getBalance(publicKey);
            const newState = {
                wallet: String(publicKey),
                balance: newBalance / LAMPORTS_PER_SOL,
                connection: connection.rpcEndpoint,
                connected: connected
            }

            setData({...data, state: newState});
            setTimeout(refreshUserData, 60000);
          })();
        } else {
            setData({...data, state: {}})
        }
      }, [publicKey, connection, connected, session]);
  
   return (
     <UserDataContext.Provider value={{ data, setData }}>
       {children}
     </UserDataContext.Provider>
   );
  }

export { UserDataContext, UserDataProvider};