"use server"

import { prisma } from "@/lib/db"
import { getSession } from "./auth-actions"
import { revalidatePath } from "next/cache"
import type { CallType } from "@prisma/client"

export async function initiateCall(chatId: number, type: CallType = "VOICE") {
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

    // Get all members of the chat
    const chatMembers = await prisma.chatMember.findMany({
      where: { chatId },
    })

    // Create the call
    const call = await prisma.call.create({
      data: {
        chatId,
        callerId: session.userId,
        type,
        participants: {
          create: chatMembers.map((member) => ({
            userId: member.userId,
            status: member.userId === session.userId ? "JOINED" : "MISSED",
          })),
        },
      },
    })

    revalidatePath("/calls")

    return { call }
  } catch (error) {
    console.error("Initiate call error:", error)
    return { error: "Failed to initiate call" }
  }
}

export async function endCall(callId: number) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user is a participant in this call
    const participant = await prisma.callParticipant.findFirst({
      where: {
        callId,
        userId: session.userId,
      },
    })

    if (!participant) {
      return { error: "You are not a participant in this call" }
    }

    // Update the call
    const call = await prisma.call.update({
      where: { id: callId },
      data: {
        status: "COMPLETED",
        endedAt: new Date(),
      },
    })

    // Update the participant
    await prisma.callParticipant.update({
      where: { id: participant.id },
      data: {
        leftAt: new Date(),
      },
    })

    revalidatePath("/calls")

    return { call }
  } catch (error) {
    console.error("End call error:", error)
    return { error: "Failed to end call" }
  }
}

export async function getRecentCalls() {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const calls = await prisma.call.findMany({
      where: {
        participants: {
          some: {
            userId: session.userId,
          },
        },
      },
      include: {
        chat: true,
        caller: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 20,
    })

    return { calls }
  } catch (error) {
    console.error("Get recent calls error:", error)
    return { error: "Failed to fetch recent calls" }
  }
}
