import Header from "./Header.js"
import Meme from "./Meme.js"
import Form from "./Form.js"
import Meme_2 from "./Meme_2.js"
import Meme_3 from "./Meme_3.js"
import Meme_4 from "./Meme_4.js"
import Query_1 from "./Query_1.js"
import Query_2 from "./Query_2.js"
import Query_3 from "./Query_3.js"
import { useState } from "react"

export default function Home() {

    // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                            // which can happen for example when a component has an api call that is fed to a state,
                            // then that component will rerender infinately. managing these side effects is important
                            
    const [currentPage, setCurrentPage] = useState(<Meme_3 />)                        
    
    return (
      <div className="container">
        <Header />
        <br />
        <br />
        <button onClick={() => setCurrentPage(<Meme />)}> {/* not the correct way, better with Link */}
            Meme 1
        </button>
        <button onClick={() => setCurrentPage(<Meme_2 />)}>
            Meme 2
        </button>
        <button onClick={() => setCurrentPage(<Meme_3 />)}>
            Meme 3
        </button>
        <button onClick={() => setCurrentPage(<Meme_4 />)}>
            Meme 4
        </button>
        <br />
        <button onClick={() => setCurrentPage(<Form />)}>
            Form 
        </button>
        <br />
        <button onClick={() => setCurrentPage(<Query_1 />)}>
            Query 1
        </button>
        <button onClick={() => setCurrentPage(<Query_2 />)}>
            Query 2
        </button>
        <button onClick={() => setCurrentPage(<Query_3 />)}>
            Query 3
        </button>
        {currentPage}
      </div>      
    )
  }