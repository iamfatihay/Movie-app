import React, { useContext, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { toastWarnNotify } from "../helpers/ToastNotify";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = memo(({ poster_path, title, overview, vote_average, id }) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const getVoteClass = useCallback((vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }, []);

    const handleCardClick = useCallback(() => {
        navigate("details/" + id);
        !currentUser && toastWarnNotify("Please log in to see details");
    }, [navigate, id, currentUser]);
    return (
        <div className="movie" onClick={handleCardClick}>
            <img
                loading="lazy"
                src={poster_path ? IMG_API + poster_path : defaultImage}
                alt="movie-card"
            />
            <div className="flex align-baseline justify-between p-1 text-white">
                <h5>{title}</h5>
                {currentUser && (
                    <span className={`tag ${getVoteClass(vote_average)}`}>
                        {vote_average.toFixed(1)}
                    </span>
                )}
            </div>
            <div className="movie-over">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                    Overview
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                    {overview}
                </p>
            </div>
        </div>
    );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
