import axios from "~/utils/axios";
import { useState, useEffect } from "react";
import usePortal from "react-cool-portal";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import IsRequired from "~/icons/IsRequired";
import { useAppDispatch } from "~/hook";
import { startLoading, stopLoading } from "~/actions/loading";
import { sendMessage } from "~/actions/message";
import ShowItem from "~/components/ShowItem";
import Tippy from "@tippyjs/react/headless";
import convertReleaseDate from "~/utils/convertReleaseDate";

const schema = yup.object().shape({
    startTime: yup.date().required("Start time is required.").typeError("Start time must be a date.")
});

function Shows() {
    const [availableShows, setAvailableShows] = useState<Array<IShows>>();
    const [unavailableShows, setUnavailableShows] = useState<Array<IShows>>();
    const [deletingMode, setDeletingMode] = useState(false);
    const [moviesData, setMoviesData] = useState<Array<IMovieData>>([]);
    const [selectedMovie, setSelectedMovie] = useState<{ id: string; name: string; director: string }>({
        id: "",
        name: "",
        director: ""
    });
    const [theatersData, setTheatersData] = useState<Array<ITheaters>>([]);
    const [roomsData, setRoomsData] = useState<Array<IRooms>>([]);
    const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; type: string }>({
        id: "",
        name: "",
        type: ""
    });
    const [moviesMenuVisible, setMoviesMenuVisible] = useState(false);
    const [roomsMenuVisible, setRoomsMenuVisible] = useState(false);
    const { Portal, show, hide } = usePortal({
        defaultShow: false
    });
    const [time, setTime] = useState("");
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IShowsValidation>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IShowsValidation> = async (formData) => {
        hide();
        dispatch(startLoading());
        const selectedTime = new Date(`${convertReleaseDate(formData.startTime)}T${time}:00+07:00`);
        selectedTime.setUTCHours(selectedTime.getUTCHours() - 7);
        const movieId = selectedMovie?.id;
        const roomId = selectedRoom?.id;

        (async () => {
            axios
                .post(
                    "/showings",
                    {
                        startTime: selectedTime,
                        movieId,
                        roomId
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
                    dispatch(sendMessage("Created sucessfully!"));
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    dispatch(stopLoading());
                    dispatch(sendMessage("Created failed!"));
                    console.error(error);
                });
        })();
    };

    useEffect(() => {
        (async () => {
            await axios
                .get("/showings?page=1&take=50&isAvailable=true", { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setAvailableShows(response.data.data);
                })
                .catch((err) => console.error(err));
        })();

        (async () => {
            await axios
                .get("/showings?page=1&take=50&isAvailable=false", { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setUnavailableShows(response.data.data);
                })
                .catch((err) => console.error(err));
        })();

        (async () => {
            await axios
                .get(`/movies?page=1&take=20`, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setMoviesData(response.data.data);
                })
                .catch((error) => console.error(error));
        })();

        (async () => {
            await axios
                .get("/theaters?page=1&take=20", { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setTheatersData(response.data.data);
                })
                .catch((err) => console.error(err));
        })();

        (async () => {
            await axios
                .get("/rooms?page=1&take=20", { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setRoomsData(response.data.data);
                })
                .catch((err) => console.error(err));
        })();
    }, []);

    return (
        <>
            <div className="flex justify-end items-center mb-6">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => {
                            setDeletingMode(false);
                            show();
                        }}
                        className="bg-block rounded-xl border-blue border hover:border-primary hover:bg-primary flex items-center justify-center p-3 w-[112px]"
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
                        Create
                    </button>
                    <button
                        onClick={() => setDeletingMode(!deletingMode)}
                        className={`bg-block rounded-xl border-blue border hover:border-primary ${
                            deletingMode ? "border-mdRed bg-mdRed" : ""
                        } hover:bg-primary flex items-center justify-center p-3 w-[112px]`}
                    >
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
            {deletingMode && (
                <div className="shadow-xl rounded-xl bg-block mb-6">
                    <div className="bg-primary h-6 rounded-tr-xl rounded-tl-xl"></div>
                    <div className="p-6 text-[15px]">Select a show below to delete.</div>
                </div>
            )}
            <div className="flex flex-col gap-10">
                <div className="bg-block p-6 rounded-3xl shadow-xl">
                    <div className="mb-8 text-xl font-medium ">Available Shows</div>
                    <ul className="grid grid-cols-3 gap-6 w-full">
                        {availableShows?.map((show) => (
                            <ShowItem
                                key={show.id}
                                id={show.id}
                                movie={moviesData?.filter((movie) => movie.id === show.movieId)[0]}
                                theater={theatersData?.filter((theater) => theater.id === show.room.theaterId)[0]}
                                startTime={show.startTime}
                                deletingMode={deletingMode}
                            />
                        ))}
                    </ul>
                </div>
                <div className="bg-block p-6 rounded-3xl shadow-xl">
                    <div className="mb-8 text-xl font-medium ">Unavailable Shows</div>
                    <ul className="grid grid-cols-3 gap-6 w-full">
                        {unavailableShows?.map((show) => (
                            <ShowItem
                                key={show.id}
                                id={show.id}
                                movie={moviesData?.filter((movie) => movie.id === show.movieId)[0]}
                                theater={theatersData?.filter((theater) => theater.id === show.room.theaterId)[0]}
                                startTime={show.startTime}
                                deletingMode={deletingMode}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Portal>
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="border border-blue p-8 bg-background relative rounded-xl w-[450px] max-w-[662px] no-scrollbar">
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
                                <div className="text-white font-semibold text-xl">Create a show</div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                <div className="text-blue text-[15px]">Show Information</div>
                                <div className="flex gap-2 flex-col">
                                    <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                        Movie
                                        <IsRequired />
                                    </label>
                                    <div>
                                        <Tippy
                                            visible={moviesMenuVisible}
                                            interactive
                                            onClickOutside={() => setMoviesMenuVisible(false)}
                                            offset={[0, -279]}
                                            render={(attrs) => (
                                                <ul
                                                    className={`border border-primary rounded-lg p-2 max-h-[300px] w-[384px] overflow-y-scroll no-scrollbar bg-background ${
                                                        moviesMenuVisible
                                                            ? "border-t-0 rounded-tl-none rounded-tr-none"
                                                            : ""
                                                    }`}
                                                    {...attrs}
                                                >
                                                    {moviesData &&
                                                        moviesData.map((movie) => (
                                                            <li
                                                                onClick={() => {
                                                                    setSelectedMovie(movie);
                                                                    setMoviesMenuVisible(false);
                                                                }}
                                                                key={movie.id}
                                                                className={`cursor-pointer capitalize py-2 px-4 text-[13px] hover:bg-primary text-left rounded-lg flex items-center p-2 ${
                                                                    selectedMovie?.id === movie.id
                                                                        ? "text-blue pointer-events-none"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {movie.name} - {movie.director}
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        >
                                            <div
                                                className={`hover:border-primary py-3 px-4 border-blue border bg-background cursor-pointer w-[384px] mt-1 ${
                                                    moviesMenuVisible
                                                        ? "rounded-tl-lg rounded-tr-lg border-primary"
                                                        : "rounded-lg"
                                                }   flex justify-between items-center`}
                                                onClick={() => setMoviesMenuVisible(!moviesMenuVisible)}
                                            >
                                                {selectedMovie.id === "" ? (
                                                    <span className="mr-2">All movies</span>
                                                ) : (
                                                    <span className="mr-2">
                                                        {selectedMovie.name + " - " + selectedMovie.director}
                                                    </span>
                                                )}
                                                <i className={`${moviesMenuVisible ? "rotate-180" : ""}`}>
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
                                    <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                        Room
                                        <IsRequired />
                                    </label>
                                    <div>
                                        <Tippy
                                            visible={roomsMenuVisible}
                                            interactive
                                            onClickOutside={() => setRoomsMenuVisible(false)}
                                            offset={[0, -346]}
                                            render={(attrs) => (
                                                <ul
                                                    className={`border border-primary rounded-lg p-2 max-h-[300px] w-[384px] overflow-y-scroll no-scrollbar bg-background ${
                                                        roomsMenuVisible
                                                            ? "border-t-0 rounded-tl-none rounded-tr-none"
                                                            : ""
                                                    }`}
                                                    {...attrs}
                                                >
                                                    {roomsData &&
                                                        roomsData.map((room) => (
                                                            <li
                                                                onClick={() => {
                                                                    setSelectedRoom(room);
                                                                    setRoomsMenuVisible(false);
                                                                }}
                                                                key={room.id}
                                                                className={`cursor-pointer capitalize py-2 px-4 text-[13px] hover:bg-primary text-left rounded-lg flex items-center p-2 ${
                                                                    selectedRoom?.id === room.id
                                                                        ? "text-blue pointer-events-none"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {room.name} - {room.type}
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        >
                                            <div
                                                className={`hover:border-primary py-3 px-4 border-blue border bg-background cursor-pointer w-[384px] mt-1 ${
                                                    roomsMenuVisible
                                                        ? "rounded-tl-lg rounded-tr-lg border-primary"
                                                        : "rounded-lg"
                                                }   flex justify-between items-center`}
                                                onClick={() => setRoomsMenuVisible(!roomsMenuVisible)}
                                            >
                                                {selectedRoom.id === "" ? (
                                                    <span className="mr-2">All rooms</span>
                                                ) : (
                                                    <span className="mr-2">
                                                        {selectedRoom.name + " - " + selectedRoom.type}
                                                    </span>
                                                )}
                                                <i className={`${roomsMenuVisible ? "rotate-180" : ""}`}>
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
                                    <label htmlFor="releaseDate" className="flex gap-1 mb-1 items-center">
                                        Start time
                                        <IsRequired />
                                    </label>
                                    <div className="grid grid-cols-2 gap-6">
                                        <input
                                            type="date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            id="releaseDate"
                                            {...register("startTime")}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                        <input
                                            type="time"
                                            id="releaseDate"
                                            onChange={(e) => setTime(e.target.value)}
                                            className="bg-[rgba(141,124,221,0.1)] text-sm focus:outline-primary focus:outline focus:outline-1 outline outline-blue outline-1 text-white px-4 py-3 rounded-lg placeholder:text-disabled"
                                        />
                                    </div>
                                    {<span className="text-deepRed">{errors.startTime?.message}</span>}
                                </div>
                                <div className="outline outline-1 outline-border my-2"></div>
                                <button
                                    className="py-3 px-8 mt-3 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                    type="submit"
                                >
                                    Create show
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    );
}

export default Shows;
