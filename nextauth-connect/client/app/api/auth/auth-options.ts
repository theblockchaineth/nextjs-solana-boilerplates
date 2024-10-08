import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SigninMessage } from "@/app/_utils/SignInMessage";


export const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
        name: "Solana",
        credentials: {
          message: {
            label: "Message",
            type: "text",
          },
          signature: {
            label: "Signature",
            type: "text",
          },
        },
        async authorize(credentials, req) {
          try {
            const signinMessage = new SigninMessage(
              JSON.parse(credentials?.message || "{}")
            );
            const nextAuthUrl = new URL(String(process.env.NEXTAUTH_URL));
            if (signinMessage.domain !== nextAuthUrl.host) {
              return null;
            }
  
            const csrfToken = await getCsrfToken({ req: { ...req, body: null } });
  
            if (signinMessage.nonce !== csrfToken) {
              return null;
            }
  
            const validationResult = await signinMessage.validate(
              credentials?.signature || ""
            );
  
            if (!validationResult)
              throw new Error("Could not validate the signed message");
  
            return {
              id: signinMessage.publicKey,
            };
          } catch (e) {
            return null;
          }
        },
      }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 15 * 24 * 60 * 60,
      },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
          // @ts-ignore
          session.publicKey = token.sub;
          if (session.user) {
            session.user.name = token.sub;
            session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
          }
          return session;
        },
      },
      pages: {
        signIn: '/',
      }
}