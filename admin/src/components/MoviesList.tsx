import { useState, useEffect } from "react";
import axios from "~/utils/axios";
import MovieItem from "~/components/MovieItem";
import React from "react";
import SkeletonItem from "./SkeletonItem";

interface Movie {
    id: number;
    name: string;
    director: string;
    moviePosters: Array<{ id: number; link: string }>;
}

interface Props {
    type: string;
    title: string;
}

const MoviesList: React.FC<Props> = ({ type, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await axios
                .get(`/movies?page=1&take=10&filterMovies=${type}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => console.error(error));
        })();
    }, [type]);

    return (
        data && (
            <div className="mb-10">
                <div className="flex justify-between items-center pb-6">
                    <div className="text-xl font-medium">{title} Movies</div>
                    <div className=""></div>
                </div>
                <div className="bg-block p-6 rounded-3xl shadow-xl">
                    <ul className="w-full flex flex-wrap gap-6">
                        {loading && <SkeletonItem />}
                        {!loading &&
                            data.map((movie: Movie) => (
                                <MovieItem
                                    id={movie.id}
                                    key={movie.id}
                                    name={movie.name}
                                    director={movie.director}
                                    img={movie.moviePosters[0].link}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        )
    );
};

export default MoviesList;
