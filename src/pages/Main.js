import React, {
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import { toastWarnNotify } from "../helpers/ToastNotify";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const getMovies = useCallback((API) => {
        setLoading(true);
        axios
            .get(API, { timeout: 10000 })
            .then((res) => {
                if (res.data.results && res.data.results.length > 0) {
                    setMovies(res.data.results);
                } else {
                    setMovies([]);
                    toastWarnNotify("No movies found for your search");
                }
            })
            .catch((err) => {
                console.error("API Error:", err);
                setMovies([]);
                if (err.response?.status === 429) {
                    toastWarnNotify("Too many requests. Please try again later.");
                } else if (err.response?.status === 401) {
                    toastWarnNotify("API key error. Please check configuration.");
                } else {
                    toastWarnNotify("Failed to fetch movies. Please try again.");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getMovies(FEATURED_API);
    }, [getMovies]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (searchTerm && currentUser) {
                getMovies(SEARCH_API + searchTerm);
                setSearchTerm("");
            } else if (!currentUser) {
                toastWarnNotify("Please log in to search for movies");
            } else {
                toastWarnNotify("Please enter a text");
            }
        },
        [searchTerm, currentUser, getMovies]
    );

    const movieCards = useMemo(
        () => movies.map((movie) => <MovieCard key={movie.id} {...movie} />),
        [movies]
    );

    return (
        <>
            <form className="flex justify-center p-6" onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                    <input
                        type="search"
                        className="w-80 h-12 rounded-xl outline-none border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 pr-12 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 shadow-lg"
                        placeholder="Search for movies..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <button
                        className="absolute right-2 h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        type="submit"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
            <div className="flex justify-center flex-wrap px-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-32">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 dark:border-gray-600 rounded-full animate-spin"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                            Loading movies...
                        </p>
                    </div>
                ) : movies.length > 0 ? (
                    movieCards
                ) : (
                    <div className="flex flex-col items-center justify-center mt-32">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No movies found</h3>
                            <p className="text-gray-500 dark:text-gray-500">Try searching with different keywords</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Main;
