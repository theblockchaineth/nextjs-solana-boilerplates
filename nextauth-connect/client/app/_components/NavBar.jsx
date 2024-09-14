"use client"

import { SignInButton } from "./SignInButton"
import { useState, useEffect } from "react";

export default function NavBar() {
    const [ pageLoading, setPageLoading ] = useState(true);
    useEffect(() => {
        setPageLoading(false);
    },[])
    
    return(
    <div className="navbar bg-base-100">
        <div className="navbar-start">
        <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl hover:bg-transparent">solana-boilerplate</a>
  </div>
  <div className="navbar-end">
    {
        pageLoading ? null : <SignInButton />
    }
  </div>
</div>
    )
}