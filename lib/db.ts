// import { PrismaClient } from "@prisma/client"

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   })

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma



import { PrismaClient } from "@/app/generated/prisma";
import { withAccelerate } from '@prisma/extension-accelerate'

const globaForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma = globaForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== "production") {
  globaForPrisma.prisma = prisma
}

export default prisma