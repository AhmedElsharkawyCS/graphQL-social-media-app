import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    post(id: Int!): Post
    posts: [Post!]!
    me: User
    profile(userId: Int!): Profile
  }

  type Mutation {
    postCreate(post: PostCreateInput!): Post!
    postUpdate(id: Int!, post: PostUpdateInput!): Post!
    postDelete(id: Int!): Boolean!
    postPublish(id: Int!): Post!
    postUnPublish(id: Int!): Boolean!
    login(user: AuthInput): LoginPayload!
    register(user: AuthInput): Boolean!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post!]!
    createdAt: String!
  }

  type Profile {
    id: Int!
    bio: String!
    user: User!
    isMyProfile: Boolean!
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

  type LoginPayload {
    token: String!
    email: String!
    name: String!
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
    name: String
  }
`
export default typeDefs
