import { useState } from "react"
import PostLists1 from "./PostLists1.js"
import PostLists2 from "./PostLists2.js"

export default function Query_3() {
    const [currentPage, setCurrentPage] = useState(<PostLists1 />)

  
    return (
        <div>
            <button onClick={() => setCurrentPage(<PostLists1 />)}>
                Posts List 1
            </button>
            <button onClick={() => setCurrentPage(<PostLists2 />)}>
                Posts List 2
            </button>
            <br />
            {currentPage}
        </div>
    )
  }
  