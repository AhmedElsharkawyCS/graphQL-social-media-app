import { Post, User as UserModel } from "@prisma/client"
import { Context } from "../../types"

export const User = {
  posts: async (parent: UserModel, args: any, { prisma, user }: Context): Promise<Post[]> => {
    const conditions: any = {
      userId: parent.id,
    }
    if (user?.userId !== parent.id) {
      conditions.published = true
    }
    return await prisma.post.findMany({
      where: {
        ...conditions,
      },
      orderBy: { createdAt: "desc" },
    })
  },
}
