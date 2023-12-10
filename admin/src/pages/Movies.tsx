import MoviesList from "~/components/MoviesList";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useState } from "react";

function Movies() {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("All");

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Tippy
                        visible={visible}
                        interactive
                        onClickOutside={() => setVisible(false)}
                        offset={[0, 0]}
                        render={(attrs) => (
                            <div
                                {...attrs}
                                tabIndex={-1}
                                className={`flex text-white p-2 rounded-bl-xl rounded-br-xl flex-col bg-background border-border border justify-center w-[232px] ${
                                    visible ? "border-primary border-t-0" : ""
                                }`}
                            >
                                <button
                                    onClick={() => {
                                        setType("");
                                        setVisible(false);
                                        setTitle("All");
                                    }}
                                    className={`py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                        type === "" ? "text-blue pointer-events-none" : ""
                                    }`}
                                >
                                    All movies
                                </button>
                                <button
                                    onClick={() => {
                                        setType("BANNER");
                                        setVisible(false);
                                        setTitle("Banner");
                                    }}
                                    className={`py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                        type === "BANNER" ? "text-blue pointer-events-none" : ""
                                    }`}
                                >
                                    Banner movies
                                </button>
                                <button
                                    onClick={() => {
                                        setType("NOW_PLAYING");
                                        setVisible(false);
                                        setTitle("Now playing");
                                    }}
                                    className={`py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                        type === "NOW_PLAYING" ? "text-blue pointer-events-none" : ""
                                    }`}
                                >
                                    Now playing movies
                                </button>
                                <button
                                    onClick={() => {
                                        setType("TOP_FEATURED");
                                        setVisible(false);
                                        setTitle("Top featured");
                                    }}
                                    className={`py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                        type === "TOP_FEATURED" ? "text-blue pointer-events-none" : ""
                                    }`}
                                >
                                    Top featured movies
                                </button>
                                <button
                                    onClick={() => {
                                        setType("COMING_SOON");
                                        setVisible(false);
                                        setTitle("Coming soon");
                                    }}
                                    className={`py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                        type === "COMING_SOON" ? "text-blue pointer-events-none" : ""
                                    }`}
                                >
                                    Coming soon movies
                                </button>
                            </div>
                        )}
                    >
                        <button
                            onClick={() => setVisible(!visible)}
                            className={`hover:border-primary py-[14px] px-5 border-blue border ${
                                visible ? "rounded-tl-xl rounded-tr-xl border-primary" : "rounded-xl"
                            }   flex justify-between items-center w-[232px]`}
                        >
                            <span className="">{title} movies</span>
                            <i className={`${visible ? "rotate-180" : ""}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 16 16"
                                    id="chevron-down"
                                >
                                    <path
                                        fill="#fff"
                                        d="M4.14645,5.64645 C4.34171,5.45118 4.65829,5.45118 4.85355,5.64645 L7.9999975,8.79289 L11.1464,5.64645 C11.3417,5.45118 11.6583,5.45118 11.8536,5.64645 C12.0488,5.84171 12.0488,6.15829 11.8536,6.35355 L8.35355,9.85355 C8.15829,10.0488 7.84171,10.0488 7.64645,9.85355 L4.14645,6.35355 C3.95118,6.15829 3.95118,5.84171 4.14645,5.64645 Z"
                                    ></path>
                                </svg>
                            </i>
                        </button>
                    </Tippy>
                </div>
                <div className="flex gap-3 items-center">
                    <button className="rounded-xl border-blue border hover:border-primary flex items-center justify-center p-3 w-[120px]">
                        <i className="mr-[3px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="add"
                                x="0"
                                y="0"
                                version="1.1"
                                viewBox="0 0 29 29"
                                xmlSpace="preserve"
                                width={24}
                                height={24}
                                className="translate-x-[-3px]"
                            >
                                <path
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                    d="M14.5 22V7M7 14.5h15"
                                ></path>
                            </svg>
                        </i>
                        New
                    </button>
                    <button className="rounded-xl border-blue border hover:border-primary flex items-center justify-center p-3 w-[120px]">
                        <i className="mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width={24}
                                height={24}
                                id="delete"
                            >
                                <path
                                    className="fill-white"
                                    d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"
                                ></path>
                            </svg>
                        </i>
                        Delete
                    </button>
                </div>
            </div>
            <MoviesList type={type} />
        </div>
    );
}

export default Movies;
