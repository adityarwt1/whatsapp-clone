"use client"

import { useEffect, useRef } from "react"
import { Lock } from "lucide-react"

type Message = {
  id: string
  content: string
  senderId: string
  timestamp: string
  isMe: boolean
}

export function ChatMessages({ chatId }: { chatId: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // In a real app, you would fetch messages from the database
  const messages: Message[] = [
    {
      id: "1",
      content: "Hey there! How's it going?",
      senderId: "2",
      timestamp: "10:30 AM",
      isMe: false,
    },
    {
      id: "2",
      content: "I'm doing well, thanks for asking! How about you?",
      senderId: "1",
      timestamp: "10:32 AM",
      isMe: true,
    },
    {
      id: "3",
      content: "I'm good too. Just working on this WhatsApp clone project.",
      senderId: "2",
      timestamp: "10:33 AM",
      isMe: false,
    },
    {
      id: "4",
      content: "That sounds interesting! How's it coming along?",
      senderId: "1",
      timestamp: "10:35 AM",
      isMe: true,
    },
    {
      id: "5",
      content: "It's going well! I'm using Next.js, Prisma, and PostgreSQL.",
      senderId: "2",
      timestamp: "10:36 AM",
      isMe: false,
    },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a] bg-[url('/whatsapp-bg.png')] bg-repeat">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[65%] p-2 rounded-md ${
                message.isMe ? "bg-[#005c4b] rounded-tr-none" : "bg-[#202c33] rounded-tl-none"
              }`}
            >
              <p className="text-white">{message.content}</p>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-[#8696a0]">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center justify-center mt-4 text-xs text-[#8696a0]">
        <Lock className="w-3 h-3 mr-1" />
        <span>Messages are end-to-end encrypted</span>
      </div>
    </div>
  )
}
