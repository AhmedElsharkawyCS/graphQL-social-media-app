import { AuthenticationError, UserInputError } from "apollo-server"
import { Post, Profile, User } from "@prisma/client"
import { Context } from "../../types"

export const Query = {
  profile: async (parent: any, { userId }: { userId: number }, { prisma }: Context): Promise<Profile | null> => {
    return await prisma.profile.findUnique({
      where: {
        userId: userId!,
      },
    })
  },

  me: async (parent: any, args: any, { prisma, user }: Context): Promise<User | null> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    return await prisma.user.findUnique({
      where: {
        id: user.userId!,
      },
    })
  },
  post: async (parent: any, args: { id: number }, { prisma, user }: Context): Promise<Post | null> => {
    const post = await prisma.post.findFirst({
      where: {
        id: args.id,
      },
    })
    return post
  },
  posts: async (parent: any, args: any, { prisma }: Context): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return posts
  },
}
