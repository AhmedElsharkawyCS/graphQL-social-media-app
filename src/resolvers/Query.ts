import { Post, User } from "@prisma/client"
import { Context } from "../types"

interface PostArgs {
  id: number
}
export const Query = {
  post: async (parent: any, args: PostArgs, { prisma }: Context): Promise<Post | null> => {
    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    })
    return post
  },
  posts: async (parent: any, args: any, { prisma }: Context): Promise<Post[]> => {
    const userId = 1
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        userId,
      },
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    })
    return posts
  },
  me: async (parent: any, args: any, { prisma }: Context): Promise<User | null> => {
    const userId = 1
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    })
    return user
  },
}
