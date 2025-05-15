import { getUser } from "@/actions/my-action";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const user = await getUser()

        if (!user) {
            return NextResponse.json({ message: "user not found " }, { status: 404 })
        }

        return NextResponse.json({ user: user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server issue" }, { status: 500 })
    }

}