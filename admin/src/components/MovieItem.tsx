import React from "react";

interface Props {
    name: string;
    director: string;
    img: string;
}

const MovieItem: React.FC<Props> = ({ name, img, director }) => {
    return (
        <li className="w-[calc((100%-48px)/3)] rounded-lg bg-primary shadow-sm group">
            <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
                <img
                    src={img}
                    alt="movie poster"
                    className="rounded-tl-lg rounded-tr-lg h-[300px] w-full group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="flex p-6 items-center">
                <div className="pr-8 border-r text-black text-xl">{name}</div>
                <div className="ml-8 text-gray text-sm">{director}</div>
            </div>
        </li>
    );
};

export default MovieItem;
