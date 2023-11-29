import { BellIc, SearchIc } from "~/icons/icons";
import { theme } from "../../tailwind.config";
function Header() {
    return (
        <header className="bg-background absolute top-0 left-0 right-0 flex w-full pl-[292px] pr-[32px] py-4 items-center justify-between">
            <span className="text-active font-normal text-xl">Dashboard</span>
            <form className="flex">
                <i className="mr-2">
                    <SearchIc width={24} height={24} color={theme.colors.active} />
                </i>
                <input
                    className="bg-background focus:border-active text-sm text-normal"
                    placeholder="Search something..."
                />
            </form>
            <i>
                <BellIc width={24} height={24} color={theme.colors.active} />
            </i>
        </header>
    );
}

export default Header;
