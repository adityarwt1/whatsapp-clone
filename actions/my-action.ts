import { PrismaClient } from "@/app/generated/prisma"
import { getSession } from "./auth-actions"

const prisma = new PrismaClient()

export async function getUser() {

    const session = await getSession()

    if (!session) {
        return null
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session?.userId
            }
        })

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        console.log("user not found or code syntax error ", error)
        return null
    }

}
