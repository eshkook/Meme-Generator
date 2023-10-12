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
      e.preventDefault(); // prevents a page reload when submitting the form
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
              value={id} // single source of truth
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

