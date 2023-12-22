import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "~/utils/axios";

function Movie() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await axios
                .get(`/movies/${id}`, { headers: { "Content-Type": "application/json" } })
                .then((response) => setData(response.data))
                .catch((error) => console.error(error));
        })();
    }, [id]);

    console.log(data.moviePosters.filter((poster) => poster.isThumb === true));

    return (
        data && (
            <div className="flex w-full gap-4">
                <div className="w-1/2">
                    <img
                        // src={data.moviePosters.filter((poster) => poster.isThumb === true).link}
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
