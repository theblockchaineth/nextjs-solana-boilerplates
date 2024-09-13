"use client"

import { UserDataContext } from "@/app/_providers/UserDataProvider"
import { useContext, useState, useEffect } from "react";


export default function UserDetails() {
    const [ pageLoading, setPageLoading ] = useState(true);
    const userData = useContext(UserDataContext);
    
    useEffect(() => {
        setPageLoading(false);
    },[])

    if (pageLoading) return <span className="loading loading-spinner loading-sm p-4"></span>
    if (Object.keys(userData.data.state).length < 1) return <p> NOT CONNECTED</p>
    
    return (
      <div className="stat">
        <div className="stat-title">{userData.data.state.wallet}</div>
        <div className="stat-value">{userData.data.state.balance} SOL</div>
        <div className="stat-title mt-8 text-3xl text-green-700">{userData.data.state.connected && "CONNECTED"}</div>
      </div>
    )
}