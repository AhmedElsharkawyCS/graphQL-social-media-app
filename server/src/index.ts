import { ApolloServer } from "apollo-server"
import { PrismaClient } from "@prisma/client"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import { getTokenFromHeader, getUserFromToken } from "./utils/jwt"

const prisma = new PrismaClient({
  log: ["query"],
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = getTokenFromHeader(req)
    const user = getUserFromToken(token)
    return { prisma, user }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 app server ready at ${url}`)
})
