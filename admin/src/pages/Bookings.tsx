import axios from "~/utils/axios";
import { useState, useEffect } from "react";
import usePortal from "react-cool-portal";
import { useForm } from "react-hook-form";
import IsRequired from "~/icons/IsRequired";
import { useAppDispatch, useAppSelector } from "~/hook";
import { startLoading, stopLoading } from "~/actions/loading";
import { sendMessage } from "~/actions/message";
import BookingItem from "~/components/BookingItem";
import convertTimeStamp from "~/utils/convertTimeStamp";

function Bookings() {
    const [data, setData] = useState<Array<IBookings>>([]);
    const [showsData, setShowsData] = useState<Array<IShows>>([]);
    const [theatersData, setTheatersData] = useState<Array<ITheaters>>([]);
    const [showDetails, setShowDetails] = useState<IShows>();
    const [deletingMode, setDeletingMode] = useState(false);
    const [moviesData, setMoviesData] = useState<Array<IMovieData>>([]);
    const [selectedShow, setSelectedShow] = useState<string>("");
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const { Portal, show, hide } = usePortal({
        defaultShow: false
    });
    const dispatch = useAppDispatch();

    const { query } = useAppSelector((state) => state.searching!);

    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        hide();
        dispatch(startLoading());
        const showingId = selectedShow;
        const seatIds = selectedSeats;
        (async () => {
            axios
                .post(
                    "/bookings",
                    {
                        showingId,
                        seatIds
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
                .get("/bookings?page=1&take=40", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).data.accessToken}`
                    }
                })
                .then((response) => {
                    setData(response.data.data);
                })
                .catch((err) => console.error(err));
        })();

        (async () => {
            await axios
                .get("/showings?page=1&take=50&isAvailable=true", { headers: { "Content-Type": "application/json" } })
                .then((showResponse) => {
                    setShowsData(showResponse.data.data);
                    (async () => {
                        await axios
                            .get(`/movies?page=1&take=20`, { headers: { "Content-Type": "application/json" } })
                            .then((movieResponse) => {
                                setMoviesData(
                                    movieResponse.data.data.filter((movie: { id: string }) =>
                                        showResponse.data.data.some(
                                            (show: { movieId: string }) => show.movieId === movie.id
                                        )
                                    )
                                );
                            })
                            .catch((error) => console.error(error));
                    })();
                })
                .catch((err) => console.error(err));
        })();

        (async () => {
            await axios
                .get("/theaters?page=1&take=20", { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setTheatersData(response.data.data);
                })
                .catch((err) => console.error(err));
        })();
    }, []);

    useEffect(() => {
        if (selectedShow !== "") {
            (async () => {
                await axios
                    .get(`/showings/${selectedShow}`, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                        setShowDetails(response.data);
                        setSelectedSeats([]);
                    })
                    .catch((err) => console.error(err));
            })();
        }
    }, [selectedShow]);

    return (
        showsData &&
        moviesData &&
        moviesData.length > 0 && (
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
                    </div>
                </div>
                {deletingMode && (
                    <div className="shadow-xl rounded-xl bg-block mb-6">
                        <div className="bg-primary h-6 rounded-tr-xl rounded-tl-xl"></div>
                        <div className="p-6 text-[15px]">Select a booking below to delete.</div>
                    </div>
                )}
                <div className="flex flex-col gap-10">
                    <div className="bg-block p-6 rounded-3xl shadow-xl">
                        <ul className="grid grid-cols-2 gap-6 w-full">
                            {data
                                ?.filter((booking) => booking.user.email.toLowerCase().includes(query.toLowerCase()))
                                ?.map((booking) => (
                                    <BookingItem
                                        key={booking.id}
                                        id={booking.id}
                                        booking={booking}
                                        movie={moviesData.filter((movie) => movie.id === booking.showing?.movieId)[0]}
                                        deletingMode={deletingMode}
                                    />
                                ))}
                        </ul>
                    </div>
                </div>
                <Portal>
                    <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            <div className="border border-blue p-8 bg-background relative rounded-xl max-h-[810px] overflow-y-scroll no-scrollbar">
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
                                    <div className="text-white font-semibold text-xl">Create a booking</div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <div className="text-blue text-[15px]">Booking Information</div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                            Show
                                            <IsRequired />
                                        </label>
                                        <span className="text-xs">Click on shows below to add a show.</span>
                                        <div className="grid grid-cols-2 gap-6 mt-4">
                                            {showsData.map((show) => (
                                                <div
                                                    key={show.id}
                                                    onClick={() => {
                                                        setSelectedShow(show.id);
                                                    }}
                                                    className="rounded-xl relative border border-blue hover:border-primary hover:bg-background p-4"
                                                >
                                                    <div className="group overflow-hidden rounded-xl shadow-sm">
                                                        <div className="flex flex-col gap-2 justify-center">
                                                            <div className="rounded-xl overflow-hidden w-full h-[180px]">
                                                                <img
                                                                    src={
                                                                        moviesData
                                                                            .filter(
                                                                                (movie) => movie.id === show.movieId
                                                                            )[0]
                                                                            .moviePosters.filter(
                                                                                (poster) => poster.isThumb === true
                                                                            )[0].link
                                                                    }
                                                                    alt="movie poster"
                                                                    className="rounded-xl w-full h-full group-hover:scale-110 transition-transform duration-300 ease-linear"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="text-center">
                                                                    <div className="text-base text-blue">
                                                                        {
                                                                            moviesData.filter(
                                                                                (movie) => movie.id === show.movieId
                                                                            )[0].name
                                                                        }
                                                                    </div>
                                                                    <div className="text-[13px]">
                                                                        {
                                                                            moviesData.filter(
                                                                                (movie) => movie.id === show.movieId
                                                                            )[0].director
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 items-center mt-4">
                                                                    <i>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 24 24"
                                                                            width={36}
                                                                            height={36}
                                                                            id="location"
                                                                        >
                                                                            <path
                                                                                className="fill-white group-hover:fill-primary"
                                                                                d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,17.65c-2.13-2-6-6.31-6-9.65a6,6,0,0,1,12,0C18,13.34,14.13,17.66,12,19.65ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
                                                                            ></path>
                                                                        </svg>
                                                                    </i>
                                                                    <div>
                                                                        <div className="text-blue font-medium">
                                                                            {
                                                                                theatersData.find(
                                                                                    (theater) =>
                                                                                        theater.id ===
                                                                                        show.room?.theaterId
                                                                                )?.name
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                theatersData.find(
                                                                                    (theater) =>
                                                                                        theater.id ===
                                                                                        show.room?.theaterId
                                                                                )?.city
                                                                            }
                                                                        </div>
                                                                        <div className="">
                                                                            {
                                                                                theatersData.find(
                                                                                    (theater) =>
                                                                                        theater.id ===
                                                                                        show.room?.theaterId
                                                                                )?.address
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            Start time:{" "}
                                                                            {convertTimeStamp(show.startTime)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`absolute top-0 bottom-0 right-0 left-0 ${
                                                            selectedShow === show.id ? "flex" : "hidden"
                                                        }`}
                                                    >
                                                        <i className="icon flex justify-center items-center w-full h-full">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 48 48"
                                                                width="200"
                                                                height="200"
                                                            >
                                                                <path
                                                                    className="fill-primary"
                                                                    d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
                                                                />
                                                            </svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <label htmlFor="movieParticipantIds" className="flex gap-1 mb-1 items-center">
                                            Seats
                                            <IsRequired />
                                        </label>
                                        <span className="text-xs">Click on seats below to add seats.</span>
                                        <div className="grid grid-cols-8 gap-4 mt-4">
                                            {showDetails && showDetails.showingSeats.length > 0 ? (
                                                showDetails.showingSeats.map((seat) => (
                                                    <div
                                                        onClick={() => {
                                                            setSelectedSeats([...selectedSeats, seat.id]);
                                                        }}
                                                        key={seat.id}
                                                        className={`text-center border cursor-pointer relative border-blue hover:border-primary rounded-lg p-2 ${
                                                            selectedSeats.includes(seat.id)
                                                                ? "bg-primary border-primary"
                                                                : ""
                                                        } ${
                                                            seat.isBooked
                                                                ? "bg-mdRed border-mdRed pointer-events-none"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="capitalize">{seat.type}</div>
                                                        <div>
                                                            {seat.seatRow}
                                                            {seat.seatColumn}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span>No seat.</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="outline outline-1 outline-border my-2"></div>
                                    <button
                                        className="py-3 px-8 mt-3 text-base font-semibold rounded-lg border-blue border hover:border-primary hover:bg-primary"
                                        type="submit"
                                    >
                                        Create a booking
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

export default Bookings;