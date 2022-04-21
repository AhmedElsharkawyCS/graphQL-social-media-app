import React from "react"
import { useParams } from "react-router"
import AddPostModal from "../../components/AddPostModal/AddPostModal"
import { gql, useQuery } from "@apollo/client"
import { Spinner, Alert } from "react-bootstrap"
import Post from "../../components/Post/Post"

const Get_Profile_Query = gql`
  query Profile($userId: Int!) {
    profile(userId: $userId) {
      id
      bio
      isMyProfile
      user {
        id
        name
        posts {
          content
          createdAt
          id
          published
          title
        }
      }
      createdAt
    }
  }
`

export default function Profile() {
  const { id } = useParams()
  console.log(id)
  const { loading, error, data, refetch } = useQuery(Get_Profile_Query, { variables: { userId: Number(id) } })
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
    data.profile && (
      <div>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex ",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>{data.profile.user.name}</h1>
            <p>{data.profile.bio}</p>
          </div>
          <div>{data.profile.isMyProfile ? <AddPostModal /> : null}</div>
        </div>
        <div>
          {data.profile.user.posts.map((post) => {
            return (
              <Post
                key={post.id}
                content={post.content}
                published={post.published}
                date={post.createdAt}
                id={post.id}
                title={post.title}
                user={data.profile.user.name}
              />
            )
          })}
        </div>
      </div>
    )
  )
}
