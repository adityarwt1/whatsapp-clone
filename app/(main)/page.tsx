import ChatList from "@/components/chat-list"
import { EmptyState } from "@/components/empty-state"
import { PrismaClient } from "@/app/generated/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ChatsPage() {

  const prisma = new PrismaClient()

  // getting token from the cookies
  const token = (await cookies()).get("session_token")?.value
  console.log("token", token)

  if (!token) {
    redirect("/login")
  }

  /// finding the user from the session
  const user = await prisma.session.findUnique({
    where: {
      token
    }
  })

  const isActive = await prisma.session.update({
    where: { token },
    data: {
      isActive:
        true
    }
  })


  console.log("session of the user", user)

  const ChatBasedOnuser = await prisma.chat.findMany({
    where: {
      id: user?.userId
    }
  })

  console.log("base on user list", ChatBasedOnuser)





  return (


    <div className="flex h-full">
      <ChatList mockChats={ChatBasedOnuser} />
      <EmptyState />
    </div>
  )
}
