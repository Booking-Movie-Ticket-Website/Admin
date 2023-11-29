import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
    return (
        <div className="flex flex-row">
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Layout;
