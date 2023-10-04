import { Link, Outlet } from "react-router-dom"

export default function ExtraLayout() {              
    
    return (
      <>
        <h1>extras list:</h1>
        <nav>
          <ul>
            <li>
                <Link to="/extra/1">Extra 1</Link> 
            </li>
            <li>
                <Link to="/extra/2">Extra 2</Link>
            </li>
            <li>
                <Link to="/extra/3">Extra 3</Link> 
            </li>
          </ul>
        </nav>
        <Outlet context={{a: 1, b:2}} />  {/* This line is important for rendering nested routes */}
      </>      
    )
  }