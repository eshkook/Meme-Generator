import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom"
import Home from "./components/Home.js"
import Extra from "./components/Extra.js"
import Extra_id from "./components/Extra_id.js"
import ExtraLayout from "./components/ExtraLayout.js"
import NotFound from "./components/NotFound.js"
import LayoutWrapper from "./components/LayoutWrapper.js"
import Ultra from "./components/Ultra.js"
import OverAllLayout from "./components/OverAllLayout.js"
import MoreContent from "./components/MoreContent.js"
import ZebraRoutes from "./components/ZebraRoutes.js"
import "./styles/index.css" // relevant for the NavLinks in this code

export default function App() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
                          // which can happen for example when a component has an api call that is fed to a state,
                          // then that component will rerender infinately. managing these side effects is important  
                          
  const location = useLocation()            
  console.log(location)            
  
  return (
    <>
      <Routes>
        <Route path="/ultra" element={<MoreContent />} />
      </Routes>

      {/* the location makes every page to be is if it if ultra: ????????????????????????????? weird */}
      {/* <Routes location="/ultra">
        <Route path="/ultra" element={<MoreContent />} />
      </Routes> */}
      <nav>
        <ul>
          <li>
            {/* Link is better than the regular 'a href' tag as it does in internally without refreshing the entire page. if you add the reloadDocument property, it becomes like href */}
            <Link to="/" replace>Home</Link> {/* replace makes it such that clicking back in this page will take you 2 pages back. good for example to keep logged in users logged in */} 
          </li>
          <li>
            {/* the 'end' next line makes the css properties stick to this 'extra' url only when being exactly on it, and not also its children */}
            <NavLink end
            style={({ isActive }) => {
              return isActive ? { color: 'red'} : {}
            }}
            to="/extra">
              {({isActive}) => {
                return isActive ? 'extra active' : 'extra'
              }}
              </NavLink>  {/* now the link will be red and say 'extra active' if we are in this extra route */}
          </li>
          <li>
            {/* the state is stored in the useLocation hook: */}
            <NavLink to="/ultra" state="Hi state">Ultra</NavLink>
          </li>
          <li>
            <Link to="/zebra">Zebra</Link>
          </li>
        </ul>
      </nav>
      {location.state}
      {/* without 'path' makes it relevant to all the paths children */}
      <Routes>
        <Route element={<OverAllLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/extra" element={<ExtraLayout />}>
            <Route index element={<Extra />}/>
            <Route path=":id" element={<Extra_id />}/>
          </Route>
          <Route path="/ultra" element={<LayoutWrapper />}>
            <Route index element={<Ultra />}/>
          </Route>
          {/* routes themselves are imported: */}
          <Route path="/zebra/*" element={<ZebraRoutes />} />    
          <Route path="*" element={<NotFound />} />
        </Route> 
      </Routes>
    </>
  )
}




