import { ApolloServer } from "apollo-server"
import { PrismaClient } from "@prisma/client"
import typeDefs from "./schema"
import resolvers from "./resolvers"

const prisma = new PrismaClient()

const server = new ApolloServer({ typeDefs, resolvers, context: { prisma } })

server.listen().then(({ url }) => {
  console.log(`🚀 app server ready at ${url}`)
})
