import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
    return (
        <div className="flex flex-row">
            <Header />
            <Sidebar />
            <div className="bg-background w-full pl-[240px] pt-[74px] pb-[90px]">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
