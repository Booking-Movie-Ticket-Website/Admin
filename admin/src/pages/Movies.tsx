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
            <div className="bg-background">
                <div className="my-[130px] ml-[300px] mr-[40px]">
                    <ul className="w-full flex flex-wrap gap-6">
                        {data.map((movie: Movie) => (
                            <MovieItem
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
}

export default Movies;
