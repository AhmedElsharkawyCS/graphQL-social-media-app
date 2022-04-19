import { postMutation } from "./post"
import { userMutation } from "./user"

export const Mutation = { ...postMutation, ...userMutation }
