import React from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function Home() {
  const history = useHistory()
  const redirect = (path) => history.push(path)

  return (
    <div style={{ width: "100%", textAlign: "center", fontWeight: "bolder" }}>
      <p>Welcome to social media application</p>
      <Button variant='link' size='lg' style={{ paddingInlineEnd: 20 }} onClick={() => redirect("/signup")}>
        Sign Up
      </Button>
      <Button variant='link' size='lg' style={{ paddingInlineEnd: 20 }} onClick={() => redirect("/signin")}>
        Sign In
      </Button>
      <Button variant='link' size='lg' style={{ paddingInlineEnd: 20 }} onClick={() => redirect("/posts")}>
        Go to posts
      </Button>
    </div>
  )
}
