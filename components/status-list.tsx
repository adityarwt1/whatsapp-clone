"use client"

import { Camera, Plus } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type StatusItem = {
  id: number
  name: string
  time: string
  avatar?: string
}

const mockStatuses: StatusItem[] = [
  {
    id: 1,
    name: "Mahendra",
    time: "Yesterday, 12:45",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function StatusList() {
  return (
    <div className="w-[400px] border-r border-[#313d45] flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Status</h1>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="My status" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-[#00a884] rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#111b21]">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-medium">My status</p>
            <p className="text-sm text-[#8696a0]">No updates</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-[#00a884]">
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-2 text-xs text-[#8696a0] font-medium">Viewed updates</div>

      <div className="flex-1 overflow-y-auto">
        {mockStatuses.map((status) => (
          <div key={status.id} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#202c33]">
            <Avatar className="w-12 h-12 ring-2 ring-[#8696a0] ring-offset-2 ring-offset-[#111b21]">
              <AvatarImage src={status.avatar || "/placeholder.svg"} alt={status.name} />
              <AvatarFallback>{status.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{status.name}</p>
              <p className="text-sm text-[#8696a0]">{status.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center p-6 text-center text-[#8696a0] text-sm">
        <p>Click on a contact to view their status updates</p>
      </div>

      <div className="mt-auto p-4 text-center text-xs text-[#8696a0] flex items-center justify-center">
        <span>Status updates are end-to-end encrypted</span>
      </div>
    </div>
  )
}
