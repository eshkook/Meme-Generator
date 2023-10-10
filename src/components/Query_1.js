import { useQuery, useEffect } from "@tanstack/react-query"

const POSTS = [
  {id: 1, title: "post 1"},
  {id: 2, title: "post 2"}
]

export default function Query_1() {
  useQuery({
    queryKey: ["posts"], // a unique identifier for youe query
  })

  return (
    <h1>
      Tanstack Query
    </h1>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}