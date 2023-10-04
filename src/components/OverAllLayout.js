import { Outlet } from "react-router-dom"

export default function OverAllLayouts() {
    return (
        <>
          <h1>All Pages</h1>
          <Outlet />  {/* This line is important for rendering nested routes */}
        </>
    )
}
