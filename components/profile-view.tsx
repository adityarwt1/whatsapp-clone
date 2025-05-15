"use client"
import { ArrowLeft, Camera, Edit } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { getSession, logout } from "@/actions/auth-actions"
import { PrismaClient } from "@/app/generated/prisma"
import React, { useEffect, useState } from "react"
import { getUser } from "@/actions/my-action"


export function ProfileView() {

  const [userInfo, setUserInfo] = useState({})

  const fetchUserInfo = async () => {
    const userInfo = await getUser()
    console.log(userInfo)

    if (userInfo) {
      setUserInfo(userInfo)
    }


  }

  useEffect(() => {
    fetchUserInfo()
  }, [userInfo])

  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      <div className="flex items-center p-4 border-b border-[#313d45]">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45] mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-40 h-40">
                <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-[#00a884] border-0 text-white hover:bg-[#00a884]/90 w-10 h-10"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#8696a0] font-medium">Your name</label>

              </div>
              <Input

                defaultValue="John Doe"
                className="bg-[#2a3942] border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div>
              <p className="text-xs text-[#8696a0] mb-1">
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8696a0] font-medium">About</label>
              <div className="flex items-center">
                <Textarea
                  defaultValue={userInfo?.status}
                  className="bg-[#2a3942] border-0 text-white resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />

              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8696a0] font-medium">Phone number</label>
              <Input
                defaultValue={userInfo?.phoneNumber}
                disabled
                className="bg-[#2a3942] border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 opacity-70"
              />
            </div>
          </div>

          <div className="pt-4 flex ">
            <Button onClick={logout} variant="destructive" className="w-full mx-1 bg-red-600 hover:bg-red-700 text-white">
              Log out
            </Button>
            <Button variant="destructive" className="w-full mx-1 bg-[#00A884]  hover:bg-[#00a884]/90  text-white">
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
