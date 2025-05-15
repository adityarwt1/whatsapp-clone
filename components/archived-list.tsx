"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ArchivedList() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-[400px] border-r border-[#313d45] flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Archived</h1>
      </div>
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#aebac1] w-4 h-4" />
          <Input
            placeholder="Search archived chats"
            className="pl-10 bg-[#202c33] border-0 text-white placeholder:text-[#aebac1] focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 text-center text-[#8696a0]">
        <p>No archived chats</p>
      </div>
    </div>
  )
}
