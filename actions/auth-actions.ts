"use server"

import { PrismaClient } from "@/app/generated/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()



export async function login(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber") as string

  if (!phoneNumber) {
    return {
      error: "Phone number is required",
    }
  }

  try {
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber,
          firstName: "User",
          lastName: String(Math.floor(Math.random() * 1000)),
        },
      })
    }

    // Create session
    const token = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days from now

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        deviceInfo: "Web Browser",
        ipAddress: "127.0.0.1",
        expiresAt,
        isActive: true,
      },
    })

    // Set cookie
    cookies().set("session_token", token, {
      httpOnly: true,
      expires: expiresAt,
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "Failed to login. Please try again.",
    }
  }
}

export async function logout() {
  const sessionToken = cookies().get("session_token")?.value

  if (sessionToken) {
    try {
      await prisma.session.updateMany({
        where: { token: sessionToken },
        data: { isActive: false },
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  cookies().delete("session_token")
  redirect("/login")
}

export async function getSession() {
  const sessionToken = cookies().get("session_token")?.value

  if (!sessionToken) {
    return null
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    })

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      cookies().delete("session_token")
      return null
    }

    return session
  } catch (error) {
    console.error("Get session error:", error)
    return null
  }
}
