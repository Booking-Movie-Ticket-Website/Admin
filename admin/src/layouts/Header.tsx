import { theme } from "../../tailwind.config";
import Button from "~/components/Button";

function Header() {
    return (
        <header className="bg-background z-10 fixed top-0 left-0 right-0 flex w-full pl-[300px] pr-[40px] py-6 items-center justify-between border-b border-b-border">
            <div className="text-active font-normal text-2xl">Dashboard</div>
            <div className="flex items-center justify-center gap-4">
                <form className="flex items-center justify-center relative">
                    <i className="absolute left-[8px] mr-[8px]"></i>
                    <input
                        className="bg-background text-sm focus:outline-active focus:outline focus:outline-1 outline outline-border outline-1 text-normal pl-[40px] py-[10px] rounded-md w-[280px] placeholder:text-normal"
                        placeholder="Search something..."
                    />
                </form>
                {/* <Button fill={false} children={<BellIc width={24} height={24} color={theme.colors.white} />} /> */}
            </div>
        </header>
    );
}

export default Header;
