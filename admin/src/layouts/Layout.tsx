import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
    return (
        <div className="flex flex-row">
            <Header />
            <Sidebar />
            <div className="absolute bg-background bottom-0 top-[90px]">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
