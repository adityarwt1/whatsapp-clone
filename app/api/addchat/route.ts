import { getUser } from "@/actions/my-action";
import { PrismaClient } from "@/app/generated/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      redirect("/login");
    }
    const { users } = await req.json();
    console.log(users);

    const chat = await prisma.chat.create({
      data: {
        name: users?.firstName,
        isGroup: false,
        createdAt: new Date(),
        createdBy: user?.id,
        picture: users?.profilePicture,
      },
    });

    if (!chat) {
      console.log("unable to make the chat");
      return NextResponse.json(
        { message: "unable to make the user" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "SuccessFully chat created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server issue" },
      { status: 500 }
    );
  }
}
