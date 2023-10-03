import Header from "./Header.js"
import Meme from "./Meme.js"
import Form from "./Form.js"
import Meme_2 from "./Meme_2.js"
import Meme_3 from "./Meme_3.js"
import Meme_4 from "./Meme_4.js"
import { useParams } from 'react-router-dom'

export default function Extra_id() {

    // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                            // which can happen for example when a component has an api call that is fed to a state,
                            // then that component will rerender infinately. managing these side effects is important                      
    const { id } = useParams()
    
    return (
      <div className="container">
        <p>{id}</p>
        <Header />
        {/* <Meme /> */}
        {/* <Meme_2 /> */}
        <Meme_3 />
        {/* <Meme_4 /> */}
        <Form />
      </div>      
    )
  }