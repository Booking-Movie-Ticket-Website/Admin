import NavItem from "~/components/NavItem";
import { ActivityIc, DashboardIc, MovieIc, SignOutIc, UsersIc } from "~/icons/icons";
import { theme } from "../../tailwind.config";
import Button from "~/components/Button";
import admin from "~/assets/admin.png";
import logo from "~/assets/logo.png";

function Sidebar() {
    return (
        <div className="w-[260px] bg-background fixed top-0 bottom-0 flex flex-col pb-10 pt-6 border-r-[1px] border-r-solid border-r-border pl-[40px] pr-[32px]">
            <div className="flex items-center justify-center">
                <img src={logo} className="w-40 mb-8" alt="logo" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <img src={admin} width={80} alt="admin" className="mb-4" />
                <p className="text-active text-md">Anh Tran</p>
                <p className="text-normal text-sm mb-4">anhtran@gmail.com</p>
                <Button
                    fill={false}
                    children={
                        <div className="flex gap-1 items-center">
                            Log out <SignOutIc width={24} height={24} color={theme.colors.active} />
                        </div>
                    }
                    fontSize="sm"
                />
            </div>
            <div className="flex flex-col py-[32px] gap-2">
                <NavItem
                    icon={<DashboardIc width={24} height={24} color={theme.colors.active} />}
                    title="Dashboard"
                    active={true}
                    href="/"
                />
                <NavItem
                    icon={<ActivityIc width={24} height={24} color={theme.colors.active} />}
                    title="Activity"
                    href="/activity"
                />
                <NavItem
                    icon={<MovieIc width={24} height={24} color={theme.colors.active} />}
                    title="Movies"
                    href="/movies"
                />
                <NavItem
                    icon={<UsersIc width={24} height={24} color={theme.colors.active} />}
                    title="Users"
                    href="/users"
                />
            </div>
        </div>
    );
}

export default Sidebar;
