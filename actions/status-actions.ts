"use server"

import { PrismaClient } from "@/app/generated/prisma"
import { getSession } from "./auth-actions"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function createStatusUpdate(content?: string, mediaUrl?: string) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!content && !mediaUrl) {
    return { error: "Content or media is required" }
  }

  try {
    // Status updates expire after 24 hours
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const statusUpdate = await prisma.statusUpdate.create({
      data: {
        userId: session.userId,
        content,
        mediaUrl,
        expiresAt,
      },
    })

    revalidatePath("/status")

    return { statusUpdate }
  } catch (error) {
    console.error("Create status update error:", error)
    return { error: "Failed to create status update" }
  }
}

export async function getStatusUpdates() {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    // Get contacts
    const contacts = await prisma.contact.findMany({
      where: { userId: session.userId },
      select: { contactId: true },
    })

    const contactIds = contacts.map((contact) => contact.contactId)

    // Get status updates from contacts that haven't expired
    const statusUpdates = await prisma.statusUpdate.findMany({
      where: {
        userId: { in: [...contactIds, session.userId] },
        expiresAt: { gt: new Date() },
      },
      include: {
        user: true,
        views: {
          where: { viewerId: session.userId },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return { statusUpdates }
  } catch (error) {
    console.error("Get status updates error:", error)
    return { error: "Failed to fetch status updates" }
  }
}

export async function viewStatusUpdate(statusId: number) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if already viewed
    const existingView = await prisma.statusView.findUnique({
      where: {
        statusId_viewerId: {
          statusId,
          viewerId: session.userId,
        },
      },
    })

    if (!existingView) {
      await prisma.statusView.create({
        data: {
          statusId,
          viewerId: session.userId,
        },
      })
    }

    revalidatePath("/status")

    return { success: true }
  } catch (error) {
    console.error("View status update error:", error)
    return { error: "Failed to mark status as viewed" }
  }
}
