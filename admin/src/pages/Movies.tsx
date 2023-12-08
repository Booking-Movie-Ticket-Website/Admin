import { useState, useEffect } from "react";
import axios from "~/utils/axios";
import MovieItem from "~/components/MovieItem";

interface Movie {
    id: number;
    name: string;
    director: string;
    moviePosters: Array<{ id: number; link: string }>;
}

function Movies() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            await axios
                .get("/movies?page=1&take=10", { headers: { "Content-Type": "application/json" } })
                .then((response) => setData(response.data))
                .catch((error) => console.error(error));
        })();
    }, []);
    console.log(data);
    return (
        data && (
            <div className="bg-block p-6 rounded-xl shadow-xl">
                <div className="flex justify-between items-center pb-6">
                    <div className="text-xl font-medium">All Movies</div>
                    <div className=""></div>
                </div>
                <ul className="w-full flex flex-wrap gap-6">
                    {data.map((movie: Movie) => (
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
        )
    );
}

export default Movies;
