import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";

interface MovieData {
    moviePosters: Array<{
        link: string;
        isThumb: boolean;
    }>;
}
function Movie() {
    const [data, setData] = useState<MovieData>();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await axios
                .get(`/movies/${id}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => setData(response.data))
                .catch((error) => console.error(error));
        })();
    }, [id]);

    return (
        data && (
            <div className="flex w-full gap-4">
                <div className="w-1/2">
                    <img
                        src={data.moviePosters.filter((poster) => poster.isThumb === true)[0].link}
                        alt="poster"
                        className="rounded-xl"
                    />
                </div>
                <div className="w-1/2"></div>
            </div>
        )
    );
}

export default Movie;
