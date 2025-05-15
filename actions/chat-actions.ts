"use server"

import { prisma } from "@/lib/db"
import { getSession } from "./auth-actions"
import { revalidatePath } from "next/cache"

export async function getChats() {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const chatMembers = await prisma.chatMember.findMany({
      where: { userId: session.userId },
      include: {
        chat: {
          include: {
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
              include: {
                sender: true,
              },
            },
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        chat: {
          updatedAt: "desc",
        },
      },
    })

    return { chats: chatMembers.map((member) => member.chat) }
  } catch (error) {
    console.error("Get chats error:", error)
    return { error: "Failed to fetch chats" }
  }
}

export async function getChatById(chatId: number) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: true,
            readBy: true,
            reactions: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    if (!chat) {
      return { error: "Chat not found" }
    }

    // Check if user is a member of this chat
    const isMember = chat.members.some((member) => member.userId === session.userId)

    if (!isMember) {
      return { error: "Unauthorized" }
    }

    return { chat }
  } catch (error) {
    console.error("Get chat error:", error)
    return { error: "Failed to fetch chat" }
  }
}

export async function sendMessage(
  chatId: number,
  content: string,
  mediaUrl?: string,
  mediaType?: string,
  replyToId?: number,
) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user is a member of this chat
    const chatMember = await prisma.chatMember.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId: session.userId,
        },
      },
    })

    if (!chatMember) {
      return { error: "You are not a member of this chat" }
    }

    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: session.userId,
        content,
        mediaUrl,
        mediaType,
        replyToId,
      },
    })

    // Update chat's updatedAt
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    })

    revalidatePath(`/chat/${chatId}`)

    return { message }
  } catch (error) {
    console.error("Send message error:", error)
    return { error: "Failed to send message" }
  }
}

export async function createChat(userIds: number[], name?: string, isGroup = false) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    // Make sure the current user is included in the chat
    if (!userIds.includes(session.userId)) {
      userIds.push(session.userId)
    }

    // Create the chat
    const chat = await prisma.chat.create({
      data: {
        name,
        isGroup,
        createdBy: session.userId,
        members: {
          create: userIds.map((userId) => ({
            userId,
            role: userId === session.userId ? "OWNER" : "MEMBER",
          })),
        },
      },
    })

    revalidatePath("/")

    return { chat }
  } catch (error) {
    console.error("Create chat error:", error)
    return { error: "Failed to create chat" }
  }
}
