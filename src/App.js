import { Link, Route, Routes } from "react-router-dom"
import Home from "./components/Home.js"
import Extra from "./components/Extra.js"
import Extra_id from "./components/Extra_id.js"
import NotFound from "./components/NotFound.js"

export default function App() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                          // which can happen for example when a component has an api call that is fed to a state,
                          // then that component will rerender infinately. managing these side effects is important                      
  
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Link is better than the regular 'a href' tag as it does in internally without refreshing the entire page */}
          </li>
          <li>
            <Link to="/extra">Extra</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/extra" element={<Extra />}/>
        <Route path="/extra/:id" element={<Extra_id />}/> */}
        <Route path="/extra">
          <Route index element={<Extra />}/>
          <Route path=":id" element={<Extra_id />}/>
        </Route>  
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}




