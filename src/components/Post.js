// Post.js
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts.js";
import { getUser } from "../api/users.js";

export default function Post() {
    const [id, setId] = useState("");
    const [submittedId, setSubmittedId] = useState(null);
  
    const postQuery = useQuery(
      ["posts", submittedId],
      () => getPost(submittedId),
      { enabled: !!submittedId }
    );
  
    const userQuery = useQuery(
      ["users", postQuery?.data?.userId],
      () => getUser(postQuery.data.userId),
      { enabled: !!postQuery?.data?.userId }
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmittedId(id);
    };
  
    return (
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Enter Post ID:
            <input
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <button type="submit">Fetch Post</button>
        </form>
        {submittedId ? (
          postQuery.isLoading ? (
            <h1>Loading Post...</h1>
          ) : postQuery.isError ? (
            <h1>{postQuery.error.message}</h1>  // Display the error message 
          ) : postQuery.data ? (
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
          ) : null
        ) : null}
      </div>
    );
}


// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getPost } from "../api/posts.js";
// import { getUser } from "../api/users.js";

// export default function Post() {
//     const [id, setId] = useState("");
//     const [submittedId, setSubmittedId] = useState(null);
  
//     const postQuery = useQuery(
//       ["posts", submittedId],
//       () => getPost(submittedId),
//       { enabled: !!submittedId }
//     );
  
//     const userQuery = useQuery(
//       ["users", postQuery?.data?.userId],
//       () => getUser(postQuery.data.userId),
//       { enabled: !!postQuery?.data?.userId }
//     );
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setSubmittedId(id);
//     };
  
//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Enter Post ID:
//             <input
//               type="number"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//             />
//           </label>
//           <button type="submit">Fetch Post</button>
//         </form>
//         {submittedId ? (
//           postQuery.isLoading ? (
//             <h1>Loading...</h1>
//           ) : postQuery.isError ? (
//             <h1>{JSON.stringify(postQuery.error)}</h1>
//           ) : postQuery.data ? (
//             <>
//               <h1>
//                 {postQuery.data.title} <br />
//                 <small>
//                   {userQuery.isLoading
//                     ? "Loading User..."
//                     : userQuery.isError
//                     ? "Error Loading User"
//                     : userQuery.data.name}
//                 </small>
//               </h1>
//               <p>{postQuery.data.body}</p>
//             </>
//           ) : null
//         ) : null}
//       </div>
//     );
//   }
  



// import { useQuery } from "@tanstack/react-query"
// import { getPost } from "../api/posts.js"
// import { getUser } from "../api/users.js"

// export default function Post({ id }) {
//   const postQuery = useQuery({
//     queryKey: ["posts", id],
//     queryFn: () => getPost(id),
//   })

//   const userQuery = useQuery({
//     queryKey: ["users", postQuery?.data?.userId],
//     enabled: postQuery?.data?.userId != null,
//     queryFn: () => getUser(postQuery.data.userId),
//   })

//   if (postQuery.status === "loading") return <h1>Loading Post...</h1>
//   if (postQuery.status === "error") {
//     return <h1>{JSON.stringify(postQuery.error)}</h1>
//   }

//   return (
//     <>
//       <h1>
//         {postQuery.data.title} <br />
//         {userQuery.isLoading
//             ? "Loading User..."
//             : userQuery.isError
//             ? "Error Loading User"
//             : userQuery.data.name}
//       </h1>
//       <h1>{postQuery.data.body}</h1>
//     </>
//   )
// }

