import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "../api/posts";
import Post from "./Post";

export default function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const userIdRef = useRef();
  const queryClient = useQueryClient();
  
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id_prop={data.id} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const userIdInt = parseInt(userIdRef.current.value, 10)
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      userId: userIdInt,  // include userId in the mutation data
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <div>
          <label htmlFor="userId">User ID</label>  {/* New User ID input field */}
          <input id="userId" ref={userIdRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}


// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { useRef } from "react"
// import { createPost } from "../api/posts"
// import Post from "./Post"

// export default function CreatePost({ setCurrentPage }) {
//   const titleRef = useRef()
//   const bodyRef = useRef()
//   const queryClient = useQueryClient()
//   const createPostMutation = useMutation({
//     mutationFn: createPost,
//     onSuccess: data => {
//       queryClient.setQueryData(["posts", data.id], data)
//       queryClient.invalidateQueries(["posts"], { exact: true })
//       setCurrentPage(<Post id_prop={data.id} />)
//     },
//   })

//   function handleSubmit(e) {
//     e.preventDefault()
//     createPostMutation.mutate({
//       title: titleRef.current.value,
//       body: bodyRef.current.value,
//     })
//   }

//   return (
//     <div>
//       {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
//       <h1>Create Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input id="title" ref={titleRef} />
//         </div>
//         <div>
//           <label htmlFor="body">Body</label>
//           <input id="body" ref={bodyRef} />
//         </div>
//         <button disabled={createPostMutation.isLoading}>
//           {createPostMutation.isLoading ? "Loading..." : "Create"}
//         </button>
//       </form>
//     </div>
//   )
// }