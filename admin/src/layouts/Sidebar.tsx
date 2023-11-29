import logo from "~/assets/logo.png";
import user from "~/assets/user.png";
import NavItem from "~/components/NavItem";
import { ActivityIc, DashboardIc, MovieIc, UsersIc } from "~/icons/icons";
import { theme } from "../../tailwind.config";

function Sidebar() {
    return (
        <div className="w-[260px] bg-background absolute top-0 bottom-0 flex flex-col py-10">
            <div className="flex items-center justify-center mb-8">
                <img src={logo} className="w-40" alt="logo" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <img src={user} className="w-12 mb-2" />
                <p className="text-active text-sm mb-2">Anh Tran</p>
                <button className="border-border text-active text-xs border py-1 px-3 rounded-2xl">Sign out</button>
            </div>
            <div className="flex flex-col p-[32px] gap-2">
                <NavItem
                    icon={<DashboardIc width={24} height={24} color={theme.colors.active} />}
                    title="Dashboard"
                    active={true}
                />
                <NavItem icon={<ActivityIc width={24} height={24} color={theme.colors.active} />} title="Activity" />
                <NavItem icon={<MovieIc width={24} height={24} color={theme.colors.active} />} title="Movies" />
                <NavItem icon={<UsersIc width={24} height={24} color={theme.colors.active} />} title="Users" />
            </div>
        </div>
    );
}

export default Sidebar;
