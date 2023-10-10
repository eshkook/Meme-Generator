import { useQuery, useMutation } from "@tanstack/react-query"

const POSTS = [
  {id: 1, title: "post 1"},
  {id: 2, title: "post 2"}
]

export default function Query_1() {
  console.log(POSTS)
  const postsQuery = useQuery({
    queryKey: ["posts"], // a unique identifier for youe query
    // queryFn: () => Promise.reject("Error Message"),
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })

  const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(1000).then(() =>
      POSTS.push({ id: crypto.randomUUID(), title })
      )
    }
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
      <div style={{ marginTop: 20 }}>
        {postsQuery.data.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
        <button onClick={() => newPostMutation.mutate("New Post")}>
          Add New Post
        </button>
      </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}