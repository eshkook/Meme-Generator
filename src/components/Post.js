import { useQuery } from "@tanstack/react-query"
import { getPost } from "../api/posts.js"
import { getUser } from "../api/users.js"

import { useState, useRef } from "react"

export default function Post() {

  /////////////////////////////////////////////////////////////////////////
  const [id, setId] = useState('')
  const idRef = useRef(null)

  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    enabled: !!id,  // Ensure id is truthy before enabling the query
  })

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  });

  const handleIdSubmit = (e) => {
    e.preventDefault();
    setId(idRef.current.value);
  }
  //////////////////////////////////////////////////////////////////////////////////////
//   const postQuery = useQuery({
//     queryKey: ["posts", id],
//     queryFn: () => getPost(id),
//   })

  if (postQuery.status === "loading") return <h1>Loading...</h1>
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>
  }

  return (
    <>
      <form onSubmit={handleIdSubmit}>
        <label htmlFor="postId">Post ID:</label>
        <input id="postId" type="number" ref={idRef} />
        <button type="submit">Fetch Post</button>
      </form>
      {postQuery.data && (
        <>
          <h1>
            {postQuery.data.title} <br />
            <small>
              {userQuery.isLoading
                ? "Loading User..."
                : userQuery.isError
                ? "Error Loading User"
                : userQuery.data.name}
            </small>
          </h1>
          <p>{postQuery.data.body}</p>
        </>
      )}
    </>

    // <>
    //   <h1>
    //     {postQuery.data.title} <br />
    //     <small>
    //       {userQuery.isLoading
    //         ? "Loading User..."
    //         : userQuery.isError
    //         ? "Error Loading User"
    //         : userQuery.data.name}
    //     </small>
    //   </h1>
    //   <p>{postQuery.data.body}</p>
    // </>
  )
}