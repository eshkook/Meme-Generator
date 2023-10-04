import TopLayout from './TopLayout'
import BottomLayout from './BottomLayout'
import { Outlet } from "react-router-dom"

export default function LayoutWrapper() {
    return (
        <>
            <TopLayout />
            <Outlet />  {/* This line is important for rendering nested routes */}
            <BottomLayout />
        </>
    )
}
