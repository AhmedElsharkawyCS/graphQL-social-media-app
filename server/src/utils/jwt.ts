import { verify } from "jsonwebtoken"

export const getTokenFromHeader = (req: any) => {
  const token = req.get("Authorization")
  if (token) {
    return token
  }
  return null
}

export const getUserFromToken = (token: string) => {
  if (token) {
    try {
      const user = verify(token, process.env.JWT_SECRET_KEY!)
      return user
    } catch (err) {
      return null
    }
  }
  return null
}
