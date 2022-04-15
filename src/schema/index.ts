import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    post(id: Int!): Post
    posts: [Post!]!
    me: User!
  }

  type Mutation {
    postCreate(post: PostCreateInput!): Post!
    postUpdate(id: Int!, post: PostUpdateInput!): Post!
    postDelete(id: Int!): Boolean!
    login(user: AuthInput): UserContext!
    register(user: AuthInput): Boolean!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post!]!
    profile: Profile!
    createdAt: String!
  }

  type Profile {
    id: Int!
    bio: String!
    user: User!
    createdAt: String!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
    user: User!
    createdAt: String!
  }

  type UserContext {
    token: String!
    name: String!
    email: String!
  }

  input PostCreateInput {
    title: String!
    content: String!
  }

  input PostUpdateInput {
    title: String
    content: String
  }

  input AuthInput {
    password: String!
    email: String!
  }
`
export default typeDefs
