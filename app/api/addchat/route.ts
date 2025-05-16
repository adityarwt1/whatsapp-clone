import { getUser } from "@/actions/my-action";
import { prisma } from "@/lib/prisma"; // Create a shared prisma client instance
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await req.json(); // Just get the userId of the user to chat with

    // Check if a chat already exists between these users
    const existingChat = await prisma.chat.findFirst({
      where: {
        isGroup: false,
        members: {
          every: {
            userId: {
              in: [user.id, userId],
            },
          },
        },
      },
    });

    if (existingChat) {
      return NextResponse.json(
        { message: "Chat already exists", chatId: existingChat.id },
        { status: 200 }
      );
    }

    // Get the user details for the chat name/picture
    const otherUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!otherUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create the chat and add members in a transaction
    const chat = await prisma.$transaction([
      prisma.chat.create({
        data: {
          name: otherUser.firstName || `Chat with ${otherUser.phoneNumber}`,
          isGroup: false,
          createdBy: user.id,
          picture: otherUser.profilePicture,
        },
      }),
      prisma.chatMember.createMany({
        data: [
          { userId: user.id, chatId: chat[0].id },
          { userId: userId, chatId: chat[0].id },
        ],
      }),
    ]);

    return NextResponse.json(
      { message: "Chat created successfully", chatId: chat[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
