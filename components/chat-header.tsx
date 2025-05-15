import { Search, MoreVertical, Phone, Video } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function ChatHeader({ chatId }: { chatId: string }) {
  // In a real app, you would fetch the chat details from the database
  const chatName = "Full Stack Developer"
  const lastSeen = "last seen today at 12:45"

  return (
    <div className="flex items-center justify-between p-3 border-b border-[#313d45] bg-[#202c33]">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={chatName} />
          <AvatarFallback>{chatName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{chatName}</p>
          <p className="text-xs text-[#8696a0]">{lastSeen}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
