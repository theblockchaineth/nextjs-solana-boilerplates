import type { Metadata } from "next";
import { Handjet } from 'next/font/google'
import NavBar from "./_components/NavBar"
import WalletProvider from "./_providers/WalletProvider"
import NextAuthProvider from "./_providers/NextAuthProvider"
import { UserDataProvider } from "./_providers/UserDataProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "solana-boilerplate",
  description: "--> send tips to theblockchain.eth",
};

const handjet = Handjet({
  subsets: ['latin'],
  variable: '--font-handjet',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="black">
      <body
        className={`${handjet.className}`}
      >
        <WalletProvider>
          <NextAuthProvider>
            <UserDataProvider>
              <NavBar />
              {children}
            </UserDataProvider>
          </NextAuthProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
