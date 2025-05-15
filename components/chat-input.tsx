"use client"

import type React from "react"

import { useState } from "react"
import { Smile, Paperclip, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatInput({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the database
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-3 bg-[#202c33] flex items-end gap-2">
      <Button variant="ghost" size="icon" className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45]">
        <Smile className="w-6 h-6" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45]">
        <Paperclip className="w-6 h-6" />
      </Button>
      <div className="flex-1 relative">
        <Textarea
          placeholder="Type a message"
          className="resize-none min-h-[40px] max-h-[120px] py-2 px-3 bg-[#2a3942] border-0 text-white placeholder:text-[#8696a0] focus-visible:ring-0 focus-visible:ring-offset-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {message.trim() ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45]"
          onClick={handleSendMessage}
        >
          <Send className="w-6 h-6" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45]">
          <Mic className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
