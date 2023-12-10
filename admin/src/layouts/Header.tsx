import adminLogo from "~/assets/admin_logo.jpg";
import { useState, useEffect } from "react";

function Header() {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`bg-background_80 ${
                scrollTop > 0 ? "shadow-lg" : ""
            } h-[74px] backdrop-blur-3xl z-10 fixed top-0 left-[240px] right-0 flex px-8 py-4 items-center justify-between`}
        >
            <div className="flex items-center gap-6">
                <div className="font-medium text-[22px] mr-2">Dashboard</div>
                <i className="group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="calendar">
                        <g
                            fill="none"
                            fillRule="evenodd"
                            className="stroke-disabled group-hover:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            transform="translate(3 2)"
                        >
                            <line x1=".093" x2="17.917" y1="7.404" y2="7.404"></line>
                            <line x1="13.442" x2="13.451" y1="11.31" y2="11.31"></line>
                            <line x1="9.005" x2="9.014" y1="11.31" y2="11.31"></line>
                            <line x1="4.558" x2="4.567" y1="11.31" y2="11.31"></line>
                            <line x1="13.442" x2="13.451" y1="15.196" y2="15.196"></line>
                            <line x1="9.005" x2="9.014" y1="15.196" y2="15.196"></line>
                            <line x1="4.558" x2="4.567" y1="15.196" y2="15.196"></line>
                            <line x1="13.044" x2="13.044" y2="3.291"></line>
                            <line x1="4.966" x2="4.966" y2="3.291"></line>
                            <path d="M13.2382655,1.57919622 L4.77096342,1.57919622 C1.83427331,1.57919622 0,3.21513002 0,6.22222222 L0,15.2718676 C0,18.3262411 1.83427331,20 4.77096342,20 L13.2290015,20 C16.1749556,20 18,18.3546099 18,15.3475177 L18,6.22222222 C18.0092289,3.21513002 16.1842196,1.57919622 13.2382655,1.57919622 Z"></path>
                        </g>
                    </svg>
                </i>
                <i className="group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        width={26}
                        height={26}
                        className="fill-disabled group-hover:fill-white"
                        id="question"
                    >
                        <rect width="256" height="256" fill="none"></rect>
                        <circle
                            cx="128"
                            cy="128"
                            r="96"
                            fill="none"
                            className="stroke-disabled group-hover:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></circle>
                        <circle cx="128" cy="180" r="12"></circle>
                        <path
                            fill="none"
                            className="stroke-disabled group-hover:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                            d="M127.9995,144.0045v-8a28,28,0,1,0-28-28"
                        ></path>
                    </svg>
                </i>
            </div>
            <form className="flex items-center justify-center relative">
                <i className="absolute left-[8px] mr-[8px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} id="search">
                        <g data-name="Layer 2">
                            <path
                                className="fill-disabled"
                                d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                                data-name="search"
                            ></path>
                        </g>
                    </svg>
                </i>
                <input
                    className="bg-[rgba(141,124,221,0.1)] text-[13px] focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white pl-[40px] py-[10px] rounded-3xl w-[360px] placeholder:text-disabled"
                    placeholder="Search for anything . . ."
                />
            </form>
            <div className="flex items-center gap-6">
                <i className="group relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={26} height={26} id="bell">
                        <rect width="256" height="256" fill="none"></rect>
                        <path
                            fill="none"
                            className="stroke-disabled group-hover:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                            d="M56.20305 104A71.899 71.899 0 0 1 128.5484 32.002c39.58967.29432 71.25651 33.20133 71.25651 72.90185V112c0 35.81563 7.49325 56.59893 14.093 67.95814A7.999 7.999 0 0 1 207.01628 192H48.98365A7.99908 7.99908 0 0 1 42.103 179.95641c6.60328-11.35959 14.1-32.1426 14.1-67.95641zM96 192v8a32 32 0 0 0 64 0v-8"
                        ></path>
                    </svg>
                    <span className="absolute top-[-3px] left-4 p-1 w-4 h-4 rounded-full bg-red text-[10px] flex items-center justify-center not-italic">
                        2
                    </span>
                </i>
                <i className="group relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" id="message">
                        <g
                            fill="none"
                            fillRule="evenodd"
                            className="stroke-disabled group-hover:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            transform="translate(2 3.5)"
                        >
                            <path d="M15.2677346,5.56112535 L11.0022884,8.99539646 C10.1950744,9.62826732 9.06350694,9.62826732 8.25629295,8.99539646 L3.95423343,5.56112535"></path>
                            <path d="M4.88787188,4.13786652e-14 L14.3157895,4.13786652e-14 C15.6751779,0.015246851 16.9690267,0.589927916 17.8960035,1.59020219 C18.8229802,2.59047647 19.3021688,3.92902958 19.2219681,5.29411767 L19.2219681,11.8219949 C19.3021688,13.187083 18.8229802,14.5256361 17.8960035,15.5259104 C16.9690267,16.5261847 15.6751779,17.1008658 14.3157895,17.1161126 L4.88787188,17.1161126 C1.9679634,17.1161126 -2.4308041e-14,14.740665 -2.4308041e-14,11.8219949 L-2.4308041e-14,5.29411767 C-2.4308041e-14,2.37544758 1.9679634,4.13786652e-14 4.88787188,4.13786652e-14 Z"></path>
                        </g>
                    </svg>
                    <span className="absolute top-[-3px] left-4 p-1 w-4 h-4 rounded-full bg-red text-[10px] flex items-center justify-center not-italic">
                        3
                    </span>
                </i>
                <div className="ml-2 rounded-full">
                    <img src={adminLogo} alt="avatar" width={42} height={42} className="rounded-full" />
                </div>
            </div>
            {/* <Button fill={false} children={<BellIc width={24} height={24} color={theme.colors.white} />} /> */}
        </header>
    );
}

export default Header;
