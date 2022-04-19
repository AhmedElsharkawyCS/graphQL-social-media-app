import { Post as PostModel, User as UserModel } from "@prisma/client"
import { Context } from "../../types"

export const Post = {
  user: async (parent: PostModel, args: any, { prisma }: Context): Promise<UserModel | null> => {
    return await prisma.user.findUnique({
      where: { id: parent.userId },
    })
  },
}
