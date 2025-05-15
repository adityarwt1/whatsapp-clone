import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Prevent searching with invalid queries
    if (query.includes("[native code]")) {
      return NextResponse.json(
        { error: "Invalid search query" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        phoneNumber: {
          contains: query,
          mode: "insensitive", // case insensitive search
        },
      },
      take: 10, // limit results
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
