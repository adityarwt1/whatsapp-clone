import { PrismaClient } from "@/app/generated/prisma";
import { getSession } from "./auth-actions";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function getUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("user not found or code syntax error ", error);
    return null;
  }
}

export async function updateProfile(id: number, name: string, status: string) {
  try {
    const user = await getUser();

    const updateduser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        firstName: name,
        status: status,
      },
    });

    if (!updateduser) {
      return null;
    }

    return updateProfile;
  } catch {
    console.log("this is the updated user");
    return null;
  }
}

export async function getUserChat() {
  try {
    const user = await getUser();

    if (!user) {
      redirect("/login");
    }

    const ChatBasedOnuser = await prisma.chat.findMany({
      where: {
        id: user?.userId,
      },
    });

    if (!ChatBasedOnuser) {
      return null;
    }

    return ChatBasedOnuser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
