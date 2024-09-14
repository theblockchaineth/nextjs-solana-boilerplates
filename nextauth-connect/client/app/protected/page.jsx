import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/auth-options"
import Authorized from "./Authorized"

export default async function Page() {
  const session = await getServerSession(authOptions)
  return <Authorized session={session}/>
}