import MoviesList from "~/components/MoviesList";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useState } from "react";

function Movies() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="p-8">
            <Tippy
                visible={visible}
                interactive
                onClickOutside={() => setVisible(false)}
                render={(attrs) => (
                    <ul
                        {...attrs}
                        tabIndex={-1}
                        className="flex text-disabled p-3 rounded-xl flex-col bg-background border-border border-[1px]"
                    >
                        <li className="py-3 px-5 hover:bg-primary hover:text-white rounded-lg">All movies</li>
                        <li className="py-3 px-5 hover:bg-primary hover:text-white rounded-lg">Banner movies</li>
                        <li className="py-3 px-5 hover:bg-primary hover:text-white rounded-lg">Now playing movies</li>
                        <li className="py-3 px-5 hover:bg-primary hover:text-white rounded-lg">Top featured movies</li>
                        <li className="py-3 px-5 hover:bg-primary hover:text-white rounded-lg">Coming soon movies</li>
                    </ul>
                )}
            >
                <button
                    onClick={() => setVisible(!visible)}
                    className="hover:border-primary py-3 px-5 border-border border-[1px] rounded-xl flex justify-between"
                >
                    All movies
                    <i></i>
                </button>
            </Tippy>
            <MoviesList title="All" type="" />
            <MoviesList title="Banner" type="BANNER" />
            <MoviesList title="Now Playing" type="NOW_PLAYING" />
            <MoviesList title="Top Featured" type="TOP_FEATURED" />
            <MoviesList title="Coming Soon" type="COMING_SOON" />
        </div>
    );
}

export default Movies;
