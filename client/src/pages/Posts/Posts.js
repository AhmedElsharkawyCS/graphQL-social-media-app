import React from "react"
import { gql, useQuery } from "@apollo/client"
import { Spinner, Alert } from "react-bootstrap"
import Post from "../../components/Post/Post"

const Get_Posts_Query = gql`
  query GET_POSTS {
    posts {
      id
      title
      content
      published
      user {
        id
        name
      }
      createdAt
    }
  }
`
export default function Posts() {
  const { loading, error, data, refetch } = useQuery(Get_Posts_Query)
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner animation='border' />
      </div>
    )
  if (error)
    return (
      <div style={{ textAlign: "center" }}>
        <Alert variant='danger' onClose={() => refetch()} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </div>
    )
  return (
    <div>
      {data.posts.map((post) => {
        return (
          <Post
            key={post.id}
            content={post.content}
            published={post.published}
            date={post.createdAt}
            id={post.id}
            title={post.title}
            user={post.user.name}
          />
        )
      })}
    </div>
  )
}
