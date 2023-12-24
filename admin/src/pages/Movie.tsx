import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";
import usePortal from "react-cool-portal";
import { convertNormalDate } from "~/utils/convertNormalDate";
import IsRequired from "~/icons/IsRequired";
import * as yup from "yup";
import Tippy from "@tippyjs/react/headless";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useAppDispatch } from "~/hook";
import { startLoading, stopLoading } from "~/actions/loading";
import { sendMessage } from "~/actions/message";
import convertReleaseDate from "~/utils/convertReleaseDate";
import { convertToBase64 } from "~/utils/convertToBase64";

const schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    duration: yup.number().required("Duration is required.").typeError("Duration must be a number."),
    description: yup.string().required("Description is required."),
    trailerLink: yup.string().required("Trailer link is required."),
    releaseDate: yup.date().required("Release date is required.").typeError("Release date must be a date."),
    nation: yup.string().required("Nation is required."),
    director: yup.string().required("Director is required."),
    moviePosters: yup
        .array()
        .of(
            yup.object().shape({
                base64: yup.mixed(),
                isThumb: yup.boolean().required()
            })
        )
        .required()
});

function Movie() {
    const [data, setData] = useState<IMovieData>();
    const { id } = useParams();
    const { Portal, show, hide } = usePortal({ defaultShow: false });
    const [isActive, setActive] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [deleteMovieCategoryIds, setDeleteMovieCategoryIds] = useState<string[]>([]);
    const [deleteMovieParticipantIds, setDeleteMovieParticipantIds] = useState<string[]>([]);
    const [deleteMoviePosterIds, setDeleteMoviePosterIds] = useState([]);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IMovie>({
        resolver: yupResolver(schema),
        defaultValues: {
            moviePosters: [{ isThumb: false }],
            name: data?.name
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "moviePosters"
    });
    const [categories, setCategories] = useState(
        Array<{
            id: string;
            name: string;
        }>
    );
    const [movieCategories, setMovieCategories] = useState<
        Array<{
            id: string;
            name: string;
        }>
    >([]);
    const [participants, setParticipants] = useState(
        Array<{
            id: string;
            fullName: string;
            profilePicture: string;
        }>
    );
    const [movieParticipants, setMovieParticipants] = useState<
        Array<{
            id: string;
            fullName: string;
            profilePicture: string;
        }>
    >([]);
    const [participantsMenuVisible, setParticipantsMenuVisible] = useState(false);
    const dispatch = useAppDispatch();
    const [activeVisible, setActiveVisible] = useState(false);
    const [reviews, setReviews] = useState<
        Array<{
            id: string;
            description: string;
            star: number;
            movieId: number;
        }>
    >();

    useEffect(() => {
        (async () => {
            await axios
                .get(`/movies/${id}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setData(response.data);
                    setMovieCategories(
                        response.data.movieCategories.map(
                            (movie: { categoryId: string; category: { name: string } }) => ({
                                id: movie.categoryId,
                                name: movie.category.name
                            })
                        )
                    );
                    setMovieParticipants(
                        response.data.movieParticipants.map(
                            (actor: { peopleId: string; people: { fullName: string; profilePicture: string } }) => ({
                                id: actor.peopleId,
                                fullName: actor.people.fullName,
                                profilePicture: actor.people.profilePicture
                            })
                        )
                    );
                })
                .catch((error) => console.error(error));
        })();
    }, [id]);

    const onSubmit: SubmitHandler<IMovie> = async (data) => {
        hide();
        dispatch(startLoading());
        const name = data.name;
        const duration = data.duration;
        const description = data.description;
        const trailerLink = data.trailerLink;
        const releaseDate = convertReleaseDate(data.releaseDate);
        const nation = data.nation;
        const director = data.director;
        const movieCategoryIds = movieCategories?.map((category) => category.id);
        const movieParticipantIds = movieParticipants.map((participant) => participant.id);
        const base64Promises = data.moviePosters.map(async (poster) => ({
            ...poster,
            base64: await convert(poster.base64[0])
        }));

        Promise.all(base64Promises)
            .then((updatedPosters) => {
                axios
                    .patch(
                        `/movies/${id}`,
                        {
                            name,
                            duration,
                            description,
                            trailerLink,
                            releaseDate,
                            nation,
                            totalReviews: 0,
                            avrStars: 0,
                            isActive,
                            director,
                            movieCategoryIds: movieCategoryIds,
                            movieParticipantIds,
                            moviePosters: updatedPosters,
                            deleteMovieCategoryIds: deleteMovieCategoryIds,
                            deleteMovieParticipantIds: deleteMovieParticipantIds,
                            deleteMoviePosterIds: []
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).data.accessToken}`
                            }
                        }
                    )
                    .then(() => {
                        dispatch(stopLoading());
                        dispatch(sendMessage("Updated sucessfully!"));
                        setReloadFlag(true);
                    })
                    .catch((error) => {
                        dispatch(stopLoading());
                        dispatch(sendMessage("Updated failed!"));
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error("Failed to convert base64:", error);
            });
    };

    const convert = async (file: File) => {
        if (file) {
            try {
                return await convertToBase64(file);
            } catch (error) {
                console.error("Failed to convert image to base64:", error);
            }
        }
    };

    useEffect(() => {
        (async () => {
            await axios
                .get("/categories/no-pagination", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => setCategories(response.data))
                .catch((error) => console.error(error));
        })();

        (async () => {
            await axios
                .get("/people/no-pagination", {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => setParticipants(response.data))
                .catch((error) => console.error(error));
        })();

        (async () => {
            await axios
                .get(`/reviews/${id}`, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => setReviews(response.data))
                .catch((error) => console.error(error));
        })();
    }, [id]);

    useEffect(() => {
        if (reloadFlag) {
            setReloadFlag(true);
        }
    }, [reloadFlag]);

    useEffect(() => {
        const filteredArray = movieCategories?.filter((movie) => !deleteMovieCategoryIds.includes(movie.id));
        setMovieCategories(filteredArray);
    }, [deleteMovieCategoryIds]);

    useEffect(() => {
        const filteredArray = movieParticipants?.filter((movie) => !deleteMovieParticipantIds.includes(movie.id));
        setMovieParticipants(filteredArray);
    }, [deleteMovieParticipantIds]);

    console.log(participants);

    return (
        data && (
            <>
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => {
                                show();
                            }}
                            className={`rounded-xl border-blue border hover:border-primary 
                               hover:bg-primary flex items-center justify-center p-3 w-[112px]`}
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
                <div className="bg-block p-6 rounded-3xl shadow-xl flex flex-col gap-6">
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
                            <div className="text-primary text-xl font-semibold">{data.name}</div>
                            <div className="flex gap-2 mb-4">
                                {data.movieCategories.map((movieCategory) => (
                                    <span
                                        className="py-1 px-2 text-[13px] bg-background whitespace-nowrap inline gap-1 items-center rounded-md border border-blue"
                                        key={movieCategory.id}
                                    >
                                        {movieCategory.category.name}
                                    </span>
                                ))}
                            </div>
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
                    <div className="flex flex-col gap-4">
                        <div className="text-blue font-medium text-lg">Top Cast</div>
                        <div className="grid grid-cols-4 gap-6">
                            {data.movieParticipants.map((actor) => (
                                <a
                                    href={`/actors/${actor.id}`}
                                    key={actor.id}
                                    className={`cursor-pointer shadow-xl py-2 px-4 border border-blue hover:border-primary hover:bg-background text-left rounded-xl flex justify-between items-center p-2 `}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={actor.people.profilePicture}
                                            alt="participant avatar"
                                            className="w-10 rounded-full aspect-square mr-4"
                                        />
                                        <span className="whitespace-nowrap overflow-hidden font-medium text-ellipsis w-[200px]">
                                            {actor.people.fullName}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-blue font-medium text-lg">Reviews</div>
                        <div className="grid grid-cols-4 gap-6">
                            {reviews?.map((review) => (
                                <div key={review.id} className="">
                                    {review.description}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Portal>
                    <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            <div className="border border-blue p-8 bg-background relative rounded-xl max-h-[810px] max-w-[662px] overflow-y-scroll no-scrollbar">
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
                                    <div className="text-white font-semibold text-xl">Update movie</div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <div className="text-blue text-[15px]">Movie Information</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="name" className="flex gap-1 mb-1 items-center">
                                                Name
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Name . . ."
                                                {...register("name")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.name?.message}</span>}
                                        </div>
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="director" className="flex gap-1 mb-1 items-center">
                                                Director
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="director"
                                                {...register("director")}
                                                placeholder="Ex: United States, France, . . ."
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.director?.message}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="description" className="flex gap-1 mb-1 items-center">
                                            Description
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            {...register("description")}
                                            placeholder="Description . . ."
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {<span className="text-deepRed">{errors.description?.message}</span>}
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="trailerLink" className="flex gap-1 mb-1 items-center">
                                            Trailer link
                                            <IsRequired />
                                        </label>
                                        <input
                                            type="text"
                                            id="trailerLink"
                                            {...register("trailerLink")}
                                            placeholder="Trailer link . . ."
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        {<span className="text-deepRed">{errors.trailerLink?.message}</span>}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex gap-2 flex-col flex-1">
                                            <label htmlFor="nation" className="flex gap-1 mb-1 items-center">
                                                Nation
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="text"
                                                id="nation"
                                                {...register("nation")}
                                                placeholder="Ex: United States . . ."
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.nation?.message}</span>}
                                        </div>
                                        <div className="flex gap-2 flex-col flex-1">
                                            <label htmlFor="duration" className="flex gap-1 mb-1 items-center">
                                                Duration
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="number"
                                                id="duration"
                                                {...register("duration")}
                                                placeholder="Ex: 180"
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.duration?.message}</span>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-2 flex-col">
                                            <label htmlFor="releaseDate" className="flex gap-1 mb-1 items-center">
                                                Release date
                                                <IsRequired />
                                            </label>
                                            <input
                                                type="date"
                                                pattern="\d{4}-\d{2}-\d{2}"
                                                id="releaseDate"
                                                {...register("releaseDate")}
                                                className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                            />
                                            {<span className="text-deepRed">{errors.releaseDate?.message}</span>}
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
                                                        className={`flex w-[290px] text-white p-2 rounded-bl-lg rounded-br-lg flex-col bg-background outline-1 outline-border outline justify-center ${
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
                                                                isActive === false
                                                                    ? "text-blue pointer-events-none"
                                                                    : ""
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
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="movieCategoryIds" className="flex gap-1 mb-1 items-center">
                                            Categories
                                            <IsRequired />
                                        </label>
                                        <div className="flex gap-2 items-center overflow-x-scroll no-scrollbar">
                                            {movieCategories?.map((movie) => (
                                                <span
                                                    className="py-1 px-2 text-[13px] whitespace-nowrap flex gap-1 items-center rounded-md border border-blue"
                                                    key={movie.id}
                                                >
                                                    {movie.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDeleteMovieCategoryIds([
                                                                ...deleteMovieCategoryIds,
                                                                movie.id
                                                            ]);
                                                        }}
                                                    >
                                                        <i>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width={12}
                                                                height={12}
                                                                id="close"
                                                            >
                                                                <path
                                                                    className="fill-white"
                                                                    d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                                                                ></path>
                                                            </svg>
                                                        </i>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-blue mt-1">All categories</div>
                                        <div className="flex gap-2 items-center overflow-x-scroll no-scrollbar mb-2">
                                            {categories &&
                                                categories.map((category) => (
                                                    <span
                                                        onClick={() => {
                                                            setMovieCategories([
                                                                ...movieCategories,
                                                                { id: category.id, name: category.name }
                                                            ]);
                                                        }}
                                                        className={`py-1 px-2 text-[13px] whitespace-nowrap rounded-md border border-blue hover:border-primary hover:bg-primary cursor-pointer ${
                                                            movieCategories?.some((movie) => movie.id === category.id)
                                                                ? "opacity-50 pointer-events-none"
                                                                : ""
                                                        }`}
                                                        key={category.id}
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                            Actors
                                            <IsRequired />
                                        </label>
                                        <ul className="grid grid-cols-2 gap-4">
                                            {movieParticipants.map((movieParticipant) => (
                                                <li
                                                    key={movieParticipant.id}
                                                    className={`cursor-pointer py-2 px-4 border border-blue hover:border-primary text-left rounded-lg flex justify-between items-center p-2 `}
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            src={movieParticipant.profilePicture}
                                                            alt="participant avatar"
                                                            className="w-8 rounded-full aspect-square mr-3"
                                                        />
                                                        {movieParticipant.fullName}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDeleteMovieParticipantIds([
                                                                ...deleteMovieParticipantIds,
                                                                movieParticipant.id
                                                            ]);
                                                        }}
                                                    >
                                                        <i>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width={16}
                                                                height={16}
                                                                id="close"
                                                            >
                                                                <path
                                                                    className="fill-white"
                                                                    d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                                                                ></path>
                                                            </svg>
                                                        </i>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-blue mt-1">All actors</div>
                                        <Tippy
                                            visible={participantsMenuVisible}
                                            interactive
                                            onClickOutside={() => setParticipantsMenuVisible(false)}
                                            offset={[0, -346]}
                                            render={(attrs) => (
                                                <ul
                                                    className={`border border-primary rounded-lg p-2 max-h-[300px] w-[290px] overflow-y-scroll no-scrollbar bg-background ${
                                                        participantsMenuVisible
                                                            ? "border-t-0 rounded-tl-none rounded-tr-none"
                                                            : ""
                                                    }`}
                                                    {...attrs}
                                                >
                                                    {participants &&
                                                        participants.map((participant) => (
                                                            <li
                                                                onClick={() =>
                                                                    setMovieParticipants([
                                                                        ...movieParticipants,
                                                                        {
                                                                            id: participant.id,
                                                                            fullName: participant.fullName,
                                                                            profilePicture: participant.profilePicture
                                                                        }
                                                                    ])
                                                                }
                                                                key={participant.id}
                                                                className={`cursor-pointer py-2 px-4 text-[13px] hover:bg-primary text-left rounded-lg flex items-center p-2 ${
                                                                    movieParticipants.some(
                                                                        (movieParticipant) =>
                                                                            movieParticipant.id === participant.id
                                                                    )
                                                                        ? "text-blue pointer-events-none"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <img
                                                                    src={participant.profilePicture}
                                                                    alt="participant avatar"
                                                                    className="w-8 rounded-full aspect-square mr-3"
                                                                />
                                                                {participant.fullName}
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        >
                                            <div
                                                className={`hover:border-primary py-3 px-4 border-blue border bg-background cursor-pointer w-[290px] mt-1 ${
                                                    participantsMenuVisible
                                                        ? "rounded-tl-lg rounded-tr-lg border-primary"
                                                        : "rounded-lg"
                                                }   flex justify-between items-center`}
                                                onClick={() => setParticipantsMenuVisible(!participantsMenuVisible)}
                                            >
                                                All actors
                                                <i className={`${participantsMenuVisible ? "rotate-180" : ""}`}>
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

                                    <div className="outline outline-1 outline-border my-2"></div>
                                    <div className="text-blue text-[15px]">Movie Posters</div>
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="grid grid-cols-2 gap-4 justify-center items-center"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor={`poster-${index}`}
                                                    className="flex gap-1 mb-1 items-center"
                                                >
                                                    Poster link
                                                    <IsRequired />
                                                </label>
                                                <input
                                                    type="file"
                                                    placeholder="Poster link..."
                                                    id={`poster-${index}`}
                                                    {...register(`moviePosters.${index}.base64` as const)}
                                                    className="bg-[rgba(141,124,221,0.1)] text-sm focus:border-primary focus:border focus:border-1 border border-blue border-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                                />
                                            </div>
                                            <div className="flex gap-2 mt-8">
                                                <div className="flex gap-2 flex-1 items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="w-[20px] h-[20px]"
                                                        {...register(`moviePosters.${index}.isThumb` as const)}
                                                    />
                                                    <label
                                                        htmlFor={`poster-${index}`}
                                                        className="flex gap-1 items-center"
                                                    >
                                                        Thumbnail
                                                    </label>
                                                </div>
                                                <button
                                                    className="border border-1 border-blue rounded-lg px-5 py-3 hover:border-primary hover:bg-primary"
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    Delete this field
                                                </button>
                                            </div>
                                            {
                                                <span className="text-deepRed mt-[-8px]">
                                                    {errors?.moviePosters?.[index]?.base64?.message}
                                                </span>
                                            }
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="outline outline-1 outline-blue px-5 py-3 rounded-lg hover:outline-primary hover:bg-primary"
                                            onClick={() => append({ isThumb: false })}
                                        >
                                            Add new poster
                                        </button>
                                    </div>
                                    <div className="outline outline-1 outline-border my-2"></div>
                                    <button
                                        className="py-3 px-8 mt-3 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                        type="submit"
                                    >
                                        Update movie
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Portal>
            </>
        )
    );
}

export default Movie;
