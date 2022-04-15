import { Post, User } from "@prisma/client"
import { hashSync, compareSync } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { Context, UserContext } from "../types"

interface PostCreateArgs {
  post: Pick<Post, "content" | "title">
}

interface PostUpdatedArgs {
  id: number
  post: Pick<Post, "content" | "title" | "published">
}

interface AuthArgs {
  user: Pick<User, "password" | "email">
}

export const Mutation = {
  postCreate: async (parent: any, { post }: PostCreateArgs, { prisma }: Context): Promise<Post> => {
    const userId = 1
    const postCreated = await prisma.post.create({ data: { ...post, userId }, include: { user: true } })
    return postCreated
  },

  postUpdate: async (parent: any, { id, post }: PostUpdatedArgs, { prisma }: Context): Promise<Post> => {
    const postUpdated = await prisma.post.update({
      where: { id },
      data: { ...post },
      include: { user: true },
    })
    return postUpdated
  },

  postDelete: async (parent: any, { id }: { id: number }, { prisma }: Context): Promise<boolean> => {
    const postDeleted = await prisma.post.delete({ where: { id } })
    return !!postDeleted
  },

  login: async (parent: any, { user }: AuthArgs, { prisma }: Context): Promise<UserContext | null> => {
    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (!findUser) return null
    const isValidPass = compareSync(user.password, findUser.password)
    if (!isValidPass) return null
    const token = sign({ userId: findUser.id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })
    return { token, name: findUser.name, email: findUser.email }
  },

  register: async (parent: any, { user }: AuthArgs, { prisma }: Context): Promise<boolean> => {
    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (findUser) return false
    const hashedPassword = hashSync(user.password, 10)
    const userObject = {
      email: user.email,
      password: hashedPassword,
      name: user.email,
    }
    await prisma.user.create({ data: { ...userObject, profile: { create: { bio: "" } } } })
    return true
  },
}
