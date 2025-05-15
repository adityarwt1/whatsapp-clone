import ChatList from "@/components/chat-list"
import { EmptyState } from "@/components/empty-state"
import { PrismaClient } from "@/app/generated/prisma"
import { redirect } from "next/navigation"
import { getUser, getUserChat } from "@/actions/my-action"

export default async function ChatsPage() {

  const prisma = new PrismaClient()

  // getting token from the cookies
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }
  const ChatBasedOnuser = await getUserChat()

  console.log("base on user list", ChatBasedOnuser)

  return (


    <div className="flex h-full">
      <ChatList mockChats={ChatBasedOnuser} />
      <EmptyState />
    </div>
  )
}
