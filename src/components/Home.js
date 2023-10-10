import Header from "./Header.js"
import Meme from "./Meme.js"
import Form from "./Form.js"
import Meme_2 from "./Meme_2.js"
import Meme_3 from "./Meme_3.js"
import Meme_4 from "./Meme_4.js"
import Query_1 from "./Query_1.js"
import Query_2 from "./Query_2.js"
import Query_3 from "./Query_3.js"

export default function Home() {

    // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                            // which can happen for example when a component has an api call that is fed to a state,
                            // then that component will rerender infinately. managing these side effects is important                      
    
    return (
      <div className="container">
        <Header />
        {/* <Meme /> */}
        {/* <Meme_2 /> */}
        {/* <Meme_3 /> */}
        {/* <Meme_4 /> */}
        {/* <Form /> */}
        {/* <Query_1 /> */}
        {/* <Query_2 /> */}
        <Query_3 />
      </div>      
    )
  }