import { ChatHeader } from "@/components/chat-header"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {

  const { chatId } = await params
  return (
    <div className="flex flex-col h-full">
      <ChatHeader chatId={params.chatId} />
      <ChatMessages chatId={params.chatId} />
      <ChatInput chatId={params.chatId} />
    </div>
  )
}
