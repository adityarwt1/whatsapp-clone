"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Phone, CircleUser, Star, Archive, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      icon: MessageSquare,
      href: "/",
      active: pathname === "/",
      label: "Chats",
    },
    {
      icon: Phone,
      href: "/calls",
      active: pathname === "/calls",
      label: "Calls",
    },
    {
      icon: CircleUser,
      href: "/status",
      active: pathname === "/status",
      label: "Status",
    },
    {
      icon: Star,
      href: "/starred",
      active: pathname === "/starred",
      label: "Starred messages",
    },
    {
      icon: Archive,
      href: "/archived",
      active: pathname === "/archived",
      label: "Archived chats",
    },
    {
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
      label: "Settings",
    },
  ]

  return (
    <div className="flex flex-col w-[78px] bg-[#202c33] border-r border-[#313d45]">
      <div className="p-4 flex justify-center">
        <WhatsAppIcon className="w-8 h-8" />
      </div>
      <div className="flex-1 flex flex-col items-center pt-4 gap-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors",
              route.active ? "text-[#00a884]" : "text-[#aebac1] hover:text-white",
            )}
            title={route.label}
          >
            <route.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
      <div className="p-4 flex justify-center">
        <Link href="/profile" className="text-[#aebac1] hover:text-white">
          <CircleUser className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
