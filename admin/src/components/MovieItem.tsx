import React from "react";
import { useState } from "react";
import axios from "~/utils/axios";
import usePortal from "react-cool-portal";
import { toast } from "react-toastify";

interface Props {
    name: string;
    director: string;
    img: string;
    id: string;
    deletingMode: boolean;
}

const MovieItem: React.FC<Props> = ({ name, img, director, id, deletingMode }) => {
    const [selectedId, setSelectedId] = useState(String);
    const { Portal, hide, show } = usePortal({
        defaultShow: false
    });

    const handleDelete = async () => {
        await axios
            .delete(`/movies/${selectedId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).data.accessToken}`
                }
            })
            .then(() => {
                toast("Delete successfully!");
                hide();
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                toast("Delete failed!");
                hide();
            });
    };

    return (
        <>
            <li className="w-[calc((100%-96px)/5)]">
                {deletingMode ? (
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            setSelectedId(id);
                            show();
                        }}
                    >
                        <div className="group overflow-hidden rounded-xl aspect-square shadow-sm">
                            <img
                                src={img}
                                alt="movie poster"
                                className="rounded-xl w-full h-full group-hover:scale-110 transition-transform duration-300 ease-linear"
                            />
                        </div>
                    </div>
                ) : (
                    <a href={`/movies/${id}`}>
                        <div className="group overflow-hidden rounded-xl aspect-square shadow-sm">
                            <img
                                src={img}
                                alt="movie poster"
                                className="rounded-xl w-full h-full group-hover:scale-110 transition-transform duration-300 ease-linear"
                            />
                        </div>
                    </a>
                )}
                <div className="pt-2">
                    <a className="text-base hover:text-primary text-blue" href={`/movies/${id}`}>
                        {name}
                    </a>
                    <div className="text-[13px]">{director}</div>
                </div>
            </li>

            <Portal>
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="rounded-xl py-6 px-12 border border-primary bg-background flex flex-col items-center justify-center relative">
                            <button
                                onClick={hide}
                                className="absolute right-3 top-3 border border-blue rounded-full p-1 hover:border-primary hover:bg-primary"
                            >
                                <i>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width={14}
                                        height={14}
                                        id="close"
                                    >
                                        <path
                                            className="fill-white"
                                            d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                                        ></path>
                                    </svg>
                                </i>
                            </button>
                            <p className="mb-4 mt-4">
                                Delete movie <span className="text-blue">"{name}"</span>?
                            </p>
                            <div className="flex gap-6">
                                <button
                                    className="px-5 py-2 border border-blue hover:border-mdRed hover:bg-mdRed rounded-lg"
                                    onClick={() => handleDelete()}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={hide}
                                    className="px-5 py-2 border border-blue hover:border-primary hover:bg-primary rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    );
};

export default MovieItem;
