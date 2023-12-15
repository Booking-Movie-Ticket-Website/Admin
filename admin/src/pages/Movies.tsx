import MoviesList from "~/components/MoviesList";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import usePortal from "react-cool-portal";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "~/utils/axios";
import { toast } from "react-toastify";
import React from "react";

function Movies() {
    const [visible, setVisible] = useState(false);
    const [activeVisible, setActiveVisible] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("All");

    const { Portal, show, hide } = usePortal({
        defaultShow: false,
        clickOutsideToHide: true
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IMovie>();

    const onSubmit: SubmitHandler<IMovie> = async () => {
        console.log(
            name,
            duration,
            description,
            trailerLink,
            releaseDate,
            nation,
            totalReviews,
            avrStars,
            isActive,
            movieCategoryIds,
            movieParticipantIds
        );
        // await axios
        //     .post("/movies", {
        //         name,
        //         duration,
        //         description,
        //         trailerLink,
        //         releaseDate,
        //         nation,
        //         totalReviews,
        //         avrStars,
        //         isActive,
        //         movieCategoryIds,
        //         movieParticipantIds
        //     })
        //     .then(() => {
        //         toast("Create movie successfully!");
        //     })
        //     .catch(() => {
        //         toast("Create movie failed!");
        //     });
    };

    //Form data
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [trailerLink, setTrailerLink] = useState("");
    const [releaseDate, setReleaseDate] = useState(Date);
    const [nation, setNation] = useState("");
    const [totalReviews, setTotalReviews] = useState("0");
    const [avrStars, setAvrStars] = useState("0");
    const [isActive, setActive] = useState(false);
    const [movieCategoryIds, setMovieCategoryIds] = useState([]);
    const [movieParticipantIds, setMovieParticipantIds] = useState([]);

    //onChangeFunc with input
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
    };

    const onChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDuration(value);
    };

    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDescription(value);
    };

    const onChangeTrailerLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTrailerLink(value);
    };

    const onChangeReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReleaseDate(value);
    };

    const onChangeNation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNation(value);
    };

    const onChangeTotalReviews = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTotalReviews(value);
    };

    const onChangeAvrStars = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAvrStars(value);
    };

    const onChangeMovieCategoryIds = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMovieCategoryIds(value);
    };

    const onChangeMovieParticipantIds = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMovieParticipantIds(value);
    };

    return (
        <>
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
                                className={`hover:border-primary py-3 px-5 border-blue border ${
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
                        <button
                            onClick={() => show()}
                            className="rounded-xl border-blue border hover:border-primary hover:bg-primary flex items-center justify-center p-3 w-[112px]"
                        >
                            <i className="mr-[3px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="add"
                                    x="0"
                                    y="0"
                                    version="1.1"
                                    viewBox="0 0 29 29"
                                    xmlSpace="preserve"
                                    width={20}
                                    height={20}
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
                        <button className="rounded-xl border-blue border hover:border-primary hover:bg-primary flex items-center justify-center p-3 w-[112px]">
                            <i className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    width={20}
                                    height={20}
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
            <Portal>
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="border border-blue p-8 bg-background relative rounded-xl">
                            <button
                                onClick={hide}
                                className="absolute right-4 top-4 border border-blue rounded-full p-1 hover:border-primary hover:bg-primary"
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
                            <div className="flex justify-center mb-8">
                                <div className="text-white font-semibold text-xl">Create a new movie</div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="name" className="flex gap-1 mb-1 items-center">
                                            Name
                                            <i className="">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="8"
                                                    height="8"
                                                    viewBox="0 0 48 48"
                                                    id="asterisk"
                                                >
                                                    <path
                                                        className="fill-deepRed"
                                                        d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                    ></path>
                                                </svg>
                                            </i>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Name . . ."
                                            value={name}
                                            {...register("name", {
                                                required: "Name is required."
                                            })}
                                            onChange={onChangeName}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {errors.name && <span className="text-deepRed">{errors.name.message}</span>}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="nation" className="flex gap-1 mb-1 items-center">
                                            Nation
                                            <i className="">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="8"
                                                    height="8"
                                                    viewBox="0 0 48 48"
                                                    id="asterisk"
                                                >
                                                    <path
                                                        className="fill-deepRed"
                                                        d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                    ></path>
                                                </svg>
                                            </i>
                                        </label>
                                        <input
                                            type="text"
                                            id="nation"
                                            value={nation}
                                            {...register("nation", {
                                                required: "Nation is required."
                                            })}
                                            onChange={onChangeNation}
                                            placeholder="Ex: United States, France, . . ."
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {errors.nation && <span className="text-deepRed">{errors.nation.message}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <label htmlFor="description" className="flex gap-1 mb-1 items-center">
                                        Description
                                        <i className="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="8"
                                                viewBox="0 0 48 48"
                                                id="asterisk"
                                            >
                                                <path
                                                    className="fill-deepRed"
                                                    d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                ></path>
                                            </svg>
                                        </i>
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={description}
                                        {...register("description", {
                                            required: "Description is required."
                                        })}
                                        onChange={onChangeDescription}
                                        placeholder="Description . . ."
                                        className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                    />
                                    {errors.description && (
                                        <span className="text-deepRed">{errors.description.message}</span>
                                    )}
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <label htmlFor="trailerLink" className="flex gap-1 mb-1 items-center">
                                        Trailer link
                                        <i className="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="8"
                                                viewBox="0 0 48 48"
                                                id="asterisk"
                                            >
                                                <path
                                                    className="fill-deepRed"
                                                    d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                ></path>
                                            </svg>
                                        </i>
                                    </label>
                                    <input
                                        type="text"
                                        id="trailerLink"
                                        value={trailerLink}
                                        {...register("trailerLink", {
                                            required: "Trailer link is required."
                                        })}
                                        onChange={onChangeTrailerLink}
                                        placeholder="Trailer link . . ."
                                        className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                    />
                                    {errors.trailerLink && (
                                        <span className="text-deepRed">{errors.trailerLink.message}</span>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex gap-2 flex-col flex-1">
                                        <label htmlFor="duration" className="flex gap-1 mb-1 items-center">
                                            Duration
                                            <i className="">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="8"
                                                    height="8"
                                                    viewBox="0 0 48 48"
                                                    id="asterisk"
                                                >
                                                    <path
                                                        className="fill-deepRed"
                                                        d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                    ></path>
                                                </svg>
                                            </i>
                                        </label>
                                        <input
                                            type="number"
                                            id="duration"
                                            value={duration}
                                            {...register("duration", {
                                                required: "Duration is required."
                                            })}
                                            onChange={onChangeDuration}
                                            placeholder="Ex: 180"
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {errors.duration && (
                                            <span className="text-deepRed">{errors.duration.message}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-col flex-1">
                                        <label htmlFor="releaseDate" className="flex gap-1 mb-1 items-center">
                                            Release Date
                                            <i className="">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="8"
                                                    height="8"
                                                    viewBox="0 0 48 48"
                                                    id="asterisk"
                                                >
                                                    <path
                                                        className="fill-deepRed"
                                                        d="M42.588 20.196c-1.53.882-6.24 2.715-10.554 3.804 4.314 1.089 9.024 2.922 10.557 3.804A6.003 6.003 0 0 1 44.784 36a5.996 5.996 0 0 1-8.193 2.196c-1.533-.885-5.475-4.053-8.574-7.245C29.232 35.235 30 40.233 30 42c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-1.767.768-6.765 1.986-11.049-3.099 3.192-7.041 6.36-8.574 7.245-2.871 1.656-6.54.675-8.196-2.196s-.675-6.54 2.196-8.196c1.53-.882 6.24-2.715 10.557-3.804-4.317-1.089-9.027-2.922-10.557-3.804C2.541 18.54 1.56 14.871 3.216 12s5.325-3.852 8.196-2.196c1.533.885 5.475 4.053 8.574 7.245C18.768 12.765 18 7.767 18 6c0-3.312 2.688-6 6-6s6 2.688 6 6c0 1.767-.768 6.765-1.986 11.049 3.099-3.192 7.044-6.36 8.574-7.245A5.995 5.995 0 0 1 44.781 12a5.998 5.998 0 0 1-2.193 8.196z"
                                                    ></path>
                                                </svg>
                                            </i>
                                        </label>
                                        <input
                                            type="date"
                                            id="releaseDate"
                                            value={releaseDate}
                                            {...register("releaseDate", {
                                                required: "Release date is required."
                                            })}
                                            onChange={onChangeReleaseDate}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {errors.releaseDate && (
                                            <span className="text-deepRed">{errors.releaseDate.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="totalReviews" className="flex gap-1 mb-1 items-center">
                                            Total reviews
                                        </label>
                                        <input
                                            type="number"
                                            id="totalReviews"
                                            placeholder="Ex: 27"
                                            value={totalReviews}
                                            onChange={onChangeTotalReviews}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="averageStars" className="flex gap-1 mb-1 items-center">
                                            Average stars
                                        </label>
                                        <input
                                            type="number"
                                            id="averageStars"
                                            value={avrStars}
                                            onChange={onChangeAvrStars}
                                            placeholder="Ex: 5"
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="active" className="flex gap-1 mb-1 items-center">
                                            Active
                                        </label>
                                        <Tippy
                                            interactive
                                            onClickOutside={() => setActiveVisible(!activeVisible)}
                                            visible={activeVisible}
                                            offset={[0, -149]}
                                            render={(attrs) => (
                                                <div
                                                    {...attrs}
                                                    className={`flex w-[188px] text-white p-2 rounded-bl-lg rounded-br-lg flex-col bg-background outline-1 outline-border outline justify-center ${
                                                        activeVisible ? "outline-primary" : ""
                                                    }`}
                                                >
                                                    <div
                                                        onClick={() => {
                                                            setActive(true);
                                                            setActiveVisible(false);
                                                        }}
                                                        className={`cursor-pointer py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                                            isActive === true ? "text-blue pointer-events-none" : ""
                                                        }`}
                                                    >
                                                        True
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setActive(false);
                                                            setActiveVisible(false);
                                                        }}
                                                        className={`cursor-pointer py-3 px-4 hover:bg-primary text-left rounded-lg ${
                                                            isActive === false ? "text-blue pointer-events-none" : ""
                                                        }`}
                                                    >
                                                        False
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <div
                                                tabIndex={-1}
                                                onClick={() => setActiveVisible(!activeVisible)}
                                                className={`hover:outline-primary py-3 px-4 outline-blue outline-1 outline bg-[rgba(141,124,221,0.1)] cursor-pointer ${
                                                    activeVisible
                                                        ? "rounded-tl-lg rounded-tr-lg outline-primary"
                                                        : "rounded-lg"
                                                }   flex justify-between items-center`}
                                            >
                                                {isActive === false ? "False" : "True"}
                                                <i className={`${activeVisible ? "rotate-180" : ""}`}>
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
                                            </div>
                                        </Tippy>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex gap-2 flex-col flex-1">
                                        <label htmlFor="movieCategoryIds" className="flex gap-1 mb-1 items-center">
                                            Movie category ids
                                        </label>
                                        <input
                                            type="text"
                                            id="movieCategoryIds"
                                            placeholder="Ex: 1, 2, 3, . . ."
                                            value={movieCategoryIds}
                                            onChange={onChangeMovieCategoryIds}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                    <div className="flex gap-2 flex-col flex-1">
                                        <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                            Movie participant ids
                                        </label>
                                        <input
                                            type="text"
                                            id="movieParticipantIds"
                                            placeholder="Ex: 1, 2, 3, . . ."
                                            value={movieParticipantIds}
                                            onChange={onChangeMovieParticipantIds}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="py-3 px-8 mt-8 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                    type="submit"
                                >
                                    Create movie
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    );
}

export default Movies;
