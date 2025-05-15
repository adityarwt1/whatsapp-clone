import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    try {

        const searchParams = req.nextUrl.searchParams;

        const imageUrl = await req.json()

        const id = searchParams.get("id")
        const name = searchParams.get("name");
        const status = searchParams.get("status") || ""

        if (!id) {
            return NextResponse.json({ message: "id, name and status must be required" }, { status: 400 })
        }

        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName: name,
                status: status,
                profilePicture: imageUrl
            }
        })

        return NextResponse.json({ user }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "internal server issue" }, { status: 500 })
    }

}