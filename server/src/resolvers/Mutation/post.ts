import { AuthenticationError, UserInputError } from "apollo-server"
import { Post } from "@prisma/client"
import { Context } from "../../types"

interface PostCreateArgs {
  post: Pick<Post, "content" | "title">
}

interface PostUpdatedArgs {
  id: number
  post: Pick<Post, "content" | "title" | "published">
}

export const postMutation = {
  postCreate: async (parent: any, { post }: PostCreateArgs, { prisma, user }: Context): Promise<Post> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    const postCreated = await prisma.post.create({ data: { ...post, userId: user.userId! } })
    return postCreated
  },

  postUpdate: async (parent: any, { id, post }: PostUpdatedArgs, { prisma, user }: Context): Promise<Post> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    const findPost = await prisma.post.findFirst({ where: { id, userId: user.userId! } })
    if (!findPost) throw new UserInputError("Post not found")
    const postUpdated = await prisma.post.update({
      where: { id: findPost.id },
      data: { ...post },
    })
    return postUpdated
  },

  postDelete: async (parent: any, { id }: { id: number }, { prisma, user }: Context): Promise<boolean> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    const findPost = await prisma.post.findFirst({ where: { id, userId: user.userId! } })
    if (!findPost) throw new UserInputError("Post not found")
    await prisma.post.delete({ where: { id: findPost.id } })
    return true
  },
  postPublish: async (parent: any, { id }: { id: number }, { prisma, user }: Context): Promise<Post> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    const findPost = await prisma.post.findFirst({ where: { id, userId: user.userId! } })
    if (!findPost) throw new UserInputError("Post not found")
    const postUpdated = await prisma.post.update({
      where: { id: findPost.id },
      data: { published: true },
    })
    return postUpdated
  },

  postUnPublish: async (parent: any, { id }: { id: number }, { prisma, user }: Context): Promise<boolean> => {
    if (!user) throw new AuthenticationError("unauthenticated access")
    const findPost = await prisma.post.findFirst({ where: { id, userId: user.userId! } })
    if (!findPost) throw new UserInputError("Post not found")
    await prisma.post.update({
      where: { id: findPost.id },
      data: { published: false },
    })
    return true
  },
}
