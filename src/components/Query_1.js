import { useQuery, useMutation } from "@tanstack/react-query"

const POSTS = [
  {id: 1, title: "post 1"},
  {id: 2, title: "post 2"}
]

export default function Query_1() {
  const postsQuery = useQuery({
    queryKey: ["posts"], // a unique identifier for youe query
    // queryFn: () => Promise.reject("Error Message"),
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <h1>
      Tanstack Query
    </h1>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}