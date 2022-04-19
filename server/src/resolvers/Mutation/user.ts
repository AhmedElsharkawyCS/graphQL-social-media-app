import { UserInputError, AuthenticationError } from "apollo-server"
import { User } from "@prisma/client"
import { hashSync, compareSync } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { Context } from "../../types"

interface RegisterArgs {
  user: Pick<User, "password" | "email" | "name">
}
interface LoginArgs {
  user: Pick<User, "password" | "email">
}
interface LoginPayload {
  token: string
  email: string
  name: string
}

export const userMutation = {
  login: async (parent: any, { user }: LoginArgs, { prisma }: Context): Promise<LoginPayload> => {
    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (!findUser) throw new AuthenticationError("Invalid user credentials")
    const isValidPass = compareSync(user.password, findUser.password)
    if (!isValidPass) throw new AuthenticationError("Invalid user credentials")
    const token = sign({ userId: findUser.id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" })
    return { token, email: findUser.email, name: findUser.name }
  },

  register: async (parent: any, { user }: RegisterArgs, { prisma }: Context): Promise<boolean> => {
    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (findUser) throw new UserInputError("User already exists")
    const hashedPassword = hashSync(user.password, 10)
    const userObject = {
      email: user.email,
      password: hashedPassword,
      name: user.name || user.email,
    }
    await prisma.user.create({ data: { ...userObject, profile: { create: { bio: "" } } } })
    return true
  },
}
