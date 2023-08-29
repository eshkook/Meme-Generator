import Header from "./components/Header.js"
import Meme from "./components/Meme.js"
import Form from "./components/Form.js"
import Meme_2 from "./components/Meme_2.js"

export default function App() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                          // which can happen for example when a component has an api call that is fed to a state,
                          // then that component will rerender infinately. managing these side effects is important                      
  
  return (
    <div className="container">
      <Header />
      {/* <Meme /> */}
      <Meme_2 />
      <Form />
    </div>
  )
}




