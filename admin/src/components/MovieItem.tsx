import React from "react";

interface Props {
    name: string;
    director: string;
    img: string;
    id: number;
}

const MovieItem: React.FC<Props> = ({ name, img, director, id }) => {
    return (
        <li className="w-[calc((100%-96px)/5)]">
            <a href={`/movies/${id}`}>
                <div className="group overflow-hidden rounded-xl aspect-square shadow-sm">
                    <img
                        src={img}
                        alt="movie poster"
                        className="rounded-xl w-full h-full group-hover:scale-110 transition-transform duration-300 ease-linear"
                    />
                </div>
            </a>
            <div className="pt-2">
                <a className="text-base hover:text-primary text-blue" href={`/movies/${id}`}>
                    {name}
                </a>
                <div className="text-[13px]">{director}</div>
            </div>
        </li>
    );
};

export default MovieItem;
