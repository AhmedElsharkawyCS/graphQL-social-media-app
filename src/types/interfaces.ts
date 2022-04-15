import { Prisma, PrismaClient } from "@prisma/client"

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}

export interface UserContext {
  token: string
  email: string
  name: string
}
