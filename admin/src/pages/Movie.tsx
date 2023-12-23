import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";
import usePortal from "react-cool-portal";
import { convertNormalDate } from "~/utils/convertNormalDate";

interface MovieData {
    avrStars: number;
    description: string;
    director: string;
    duration: number;
    id: string;
    isActive: boolean;
    name: string;
    nation: string;
    releaseDate: string;
    reviews: [];
    totalReviews: string;
    trailerLink: string;
    moviePosters: Array<{
        link: string;
        isThumb: boolean;
    }>;
    movieCategories: Array<{
        id: string;
        movieId: string;
        categoryId: string;
    }>;
    movieParticipants: Array<{
        id: string;
        movieId: string;
        profession: string;
        peopleId: string;
    }>;
}
function Movie() {
    const [data, setData] = useState<MovieData>();
    const { id } = useParams();
    const [updatingMode, setUpdatingMode] = useState(false);
    const { Portal, show, hide } = usePortal();

    useEffect(() => {
        (async () => {
            await axios
                .get(`/movies/${id}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => setData(response.data))
                .catch((error) => console.error(error));
        })();
    }, [id]);

    console.log(data);

    return (
        data && (
            <>
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setUpdatingMode(!updatingMode)}
                            className={`rounded-xl border-blue border hover:border-primary ${
                                updatingMode ? "border-mdRed bg-mdRed" : ""
                            } hover:bg-primary flex items-center justify-center p-3 w-[112px]`}
                        >
                            <i className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={20}
                                    height={20}
                                    id="edit"
                                >
                                    <path
                                        className="fill-white"
                                        d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                                    ></path>
                                </svg>
                            </i>
                            Update
                        </button>
                    </div>
                </div>
                <div className="bg-block p-6 rounded-3xl shadow-xl">
                    <div className="flex w-full gap-6">
                        <div className="w-1/2 relative">
                            <img
                                src={data.moviePosters.filter((poster) => poster.isThumb === true)[0].link}
                                alt="poster"
                                className="rounded-xl"
                            />
                            <span className="absolute top-0 right-0 z-10 shadow-lg rounded-lg pl-2 py-1 m-2 bg-background_80 flex justify-center items-center">
                                {data.avrStars}/5
                                <i>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 25 25"
                                        width={28}
                                        height={28}
                                        id="star"
                                    >
                                        <linearGradient
                                            id="a"
                                            x1="3.063"
                                            x2="16.937"
                                            y1="11"
                                            y2="11"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#ffc80b"></stop>
                                            <stop offset="1" stopColor="#e89318"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#a)"
                                            transform="translate(0 1.5)"
                                            d="m10.4 4.7 1.8 3.6c.1.1.2.2.4.3l3.9.6c.4.1.6.6.3.9L14 12.9c-.1.1-.2.3-.1.4l.7 3.9c.1.4-.4.7-.7.5l-3.5-1.8c-.1-.1-.3-.1-.5 0l-3.5 1.8c-.4.2-.8-.1-.7-.5l.7-3.9c0-.2 0-.3-.1-.4l-3.1-3c-.3-.3-.1-.8.3-.8l3.9-.6c.2 0 .3-.1.4-.3l1.8-3.6c.1-.3.7-.3.8.1z"
                                        ></path>
                                    </svg>
                                </i>
                            </span>
                        </div>
                        <div className="w-1/2 flex flex-col gap-2">
                            <div className="text-primary text-xl font-semibold mb-4">{data.name}</div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <span className="text-blue font-medium">Director:</span> {data.director}
                                </div>
                                <div className="">
                                    <span className="text-blue font-medium">Duration:</span> {data.duration} minutes
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <span className="text-blue font-medium">Nationality:</span> {data.nation}
                                </div>
                                <div className="">
                                    <span className="text-blue font-medium">Release date: </span>
                                    {convertNormalDate(data.releaseDate)}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <span className="text-blue font-medium">Active:</span>{" "}
                                    {data.isActive ? "True" : "False"}
                                </div>
                                <div className="">
                                    <span className="text-blue font-medium">Total reviews:</span> {data.totalReviews}
                                </div>
                            </div>
                            <div className="">
                                <span className="text-blue font-medium">Description:</span> {data.description}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default Movie;
