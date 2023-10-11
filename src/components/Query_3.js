import { useState } from "react"
import PostsList1 from "./PostsList1.js"
import PostsList2 from "./PostsList2.js"
import Post from "./Post.js"
import CreatePost from "./CreatePost.js"

export default function Query_3() {
    const [currentPage, setCurrentPage] = useState(<PostsList1 />)

    return (
        <div>
            <button onClick={() => setCurrentPage(<PostsList1 />)}>
                Posts List 1
            </button>
            <button onClick={() => setCurrentPage(<PostsList2 />)}>
                Posts List 2
            </button>
            <button onClick={() => setCurrentPage(<Post />)}>
                Post
            </button>
            <button onClick={() => setCurrentPage(<CreatePost />)}>
                Create Post
            </button>
            <br />
            {currentPage}
        </div>
    )
  }
  