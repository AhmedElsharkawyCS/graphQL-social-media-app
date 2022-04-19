import { Profile as ProfileModel, User as UserModel } from "@prisma/client"
import { Context } from "../../types"

export const Profile = {
  user: async (parent: ProfileModel, args: any, { prisma }: Context): Promise<UserModel | null> => {
    return await prisma.user.findUnique({
      where: { id: parent.userId },
    })
  },
}
