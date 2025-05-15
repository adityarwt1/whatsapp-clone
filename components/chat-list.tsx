"use client";

import React, { useState } from "react";
import { Search, Plus, FilterIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";

type ChatItem = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
};

const ChatList = ({ mockChats }: { mockChats: any }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toggle, setToggle] = useState(false);

  const filteredChats = mockChats.filter((chat: any) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddOption = () => {};

  return (
    <div className="w-[400px] border-r border-[#313d45] flex flex-col">
      <div className="flex iltems-center justify-between p-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-2">
          <Link
            href={`/add`}
            onClick={openAddOption}
            className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45] flex items-center justify-center p-2"
          >
            <Plus className="w-5 h-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#aebac1] hover:text-white hover:bg-[#313d45]"
          >
            <FilterIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#aebac1] w-4 h-4" />
          <Input
            placeholder="Search or start a new chat"
            className="pl-10 bg-[#202c33] border-0 text-white placeholder:text-[#aebac1] focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer hover:bg-[#202c33]",
                selectedChat === chat.id && "bg-[#2a3942]"
              )}
              onClick={() => setSelectedChat(chat.id)}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                />
                <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{chat.name}</p>
                  <span className="text-xs text-[#8696a0]">{chat.time}</span>
                </div>
                <p className="text-sm text-[#8696a0] truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center items-center flex w-full justify-center">
            <Link
              href={`/add`}
              className=" text-center m-4 bg-slate-600 p-4 flex rounded-md "
            >
              <Plus className="mx-2" /> Add chat{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatList;
