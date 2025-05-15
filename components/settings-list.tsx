"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type SettingsItem = {
  id: string
  name: string
}

const settingsItems: SettingsItem[] = [
  { id: "general", name: "General" },
  { id: "account", name: "Account" },
  { id: "chats", name: "Chats" },
  { id: "notifications", name: "Notifications" },
  { id: "storage", name: "Storage" },
  { id: "shortcuts", name: "Shortcuts" },
  { id: "help", name: "Help" },
]

export function SettingsList() {
  const [activeItem, setActiveItem] = useState("general")

  return (
    <div className="w-[250px] border-r border-[#313d45] flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {settingsItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "px-4 py-3 rounded-md cursor-pointer",
              activeItem === item.id ? "text-[#00a884] font-semibold" : "text-[#d1d7db] hover:bg-[#202c33]",
            )}
            onClick={() => setActiveItem(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
