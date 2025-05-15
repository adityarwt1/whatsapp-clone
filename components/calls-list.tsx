"use client"

import { useState } from "react"
import { Search, Phone, Video, PhoneOutgoing, PhoneIncoming, PhoneMissed } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type CallItem = {
  id: number
  name: string
  time: string
  type: "outgoing" | "incoming" | "missed"
  callType: "voice" | "video"
  avatar?: string
  isFavorite?: boolean
}

const mockFavorites: CallItem[] = [
  {
    id: 1,
    name: "AMAN BGMI",
    time: "",
    type: "outgoing",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Rage BGMI",
    time: "",
    type: "outgoing",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Codding project",
    time: "",
    type: "outgoing",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
    isFavorite: true,
  },
]

const mockCalls: CallItem[] = [
  {
    id: 4,
    name: "Shivendra Saket",
    time: "08-05-2025",
    type: "outgoing",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Sahil BGMI DELHI",
    time: "19-04-2025",
    type: "missed",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Shivendra Saket",
    time: "18-04-2025",
    type: "outgoing",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Rakesh Rawat",
    time: "11-04-2025",
    type: "incoming",
    callType: "voice",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CallsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCalls = mockCalls.filter((call) => call.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredFavorites = mockFavorites.filter((call) => call.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const CallIcon = ({ type, callType }: { type: string; callType: string }) => {
    if (type === "outgoing") return <PhoneOutgoing className="w-4 h-4 text-[#00a884]" />
    if (type === "incoming") return <PhoneIncoming className="w-4 h-4 text-[#00a884]" />
    if (type === "missed") return <PhoneMissed className="w-4 h-4 text-[#f15c6d]" />
    return null
  }

  return (
    <div className="w-[400px] border-r border-[#313d45] flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Calls</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]">
          <Phone className="w-5 h-5" />
        </Button>
      </div>
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#aebac1] w-4 h-4" />
          <Input
            placeholder="Search or start a new call"
            className="pl-10 bg-[#202c33] border-0 text-white placeholder:text-[#aebac1] focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredFavorites.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs text-[#8696a0] font-medium">Favorites</div>
            {filteredFavorites.map((call) => (
              <div key={call.id} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#202c33]">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={call.avatar || "/placeholder.svg"} alt={call.name} />
                  <AvatarFallback>{call.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{call.name}</p>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="px-4 py-2 text-xs text-[#8696a0] font-medium">Recent</div>
        {filteredCalls.map((call) => (
          <div key={call.id} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#202c33]">
            <Avatar className="w-12 h-12">
              <AvatarImage src={call.avatar || "/placeholder.svg"} alt={call.name} />
              <AvatarFallback>{call.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{call.name}</p>
                <span className="text-xs text-[#8696a0]">{call.time}</span>
              </div>
              <div className="flex items-center text-sm text-[#8696a0]">
                <CallIcon type={call.type} callType={call.callType} />
                <span className="ml-1">
                  {call.type === "outgoing" ? "Outgoing" : call.type === "incoming" ? "Incoming" : "Missed"}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-6 p-8">
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-[#00a884] border-0 text-white hover:bg-[#00a884]/90"
            >
              <Video className="w-6 h-6" />
            </Button>
            <span className="mt-2 text-sm text-[#8696a0]">Start call</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-[#202c33] border-0 text-white hover:bg-[#313d45]"
            >
              <Phone className="w-6 h-6" />
            </Button>
            <span className="mt-2 text-sm text-[#8696a0]">New call link</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-[#202c33] border-0 text-white hover:bg-[#313d45]"
            >
              <Phone className="w-6 h-6" />
            </Button>
            <span className="mt-2 text-sm text-[#8696a0]">Call a number</span>
          </div>
        </div>
      </div>
    </div>
  )
}
