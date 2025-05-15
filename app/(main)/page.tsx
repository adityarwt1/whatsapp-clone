import { ChatList } from "@/components/chat-list"
import { EmptyState } from "@/components/empty-state"

export default function ChatsPage() {
  return (
    <div className="flex h-full">
      <ChatList />
      <EmptyState />
    </div>
  )
}
