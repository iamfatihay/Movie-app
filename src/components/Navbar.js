import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        const closeDropdown = () => {
            setIsDropdownOpen(false);
        };

        // Dropdown menüsünün dışına tıklandığında menünün kapanmasını sağlamak için bir olay dinleyicisi ekleme
        document.addEventListener("click", closeDropdown);

        // Component temizlendiğinde olay dinleyicisini kaldırma
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, []);

    const { currentUser } = useContext(AuthContext);
    //* with custom hook
    // const { currentUser } = useAuthContext();

    // const currentUser = { displayName: "felix franko" };
    // const currentUser = false;
    return (
        <>
            <nav className="w-full flex flex-wrap items-center justify-between py-4 bg-white/95 dark:bg-gray-900/95 dark:text-white shadow-lg backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 fixed top-0 z-50">
                <div className="container-fluid w-full flex items-center justify-between px-6">
                    <Link
                        className="text-2xl pr-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        to="/"
                    >
                        Movie App
                    </Link>
                    <div className="flex items-center relative">
                        {currentUser && (
                            <h5 className="mr-3 capitalize text-sm font-medium text-gray-700 dark:text-gray-300">
                                {currentUser?.displayName}
                            </h5>
                        )}
                        <Switch />
                        <div className="dropdown relative">
                            <button
                                className="dropdown-toggle flex items-center hidden-arrow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-105"
                                id="dropdownMenuButton2"
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop event propagation here
                                    handleDropdownToggle(); // Call the dropdown toggle function
                                }}
                            >
                                <img
                                    src={currentUser?.photoURL || avatar}
                                    className="rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-md"
                                    style={{ height: 32, width: 32 }}
                                    alt="user"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </button>

                            {currentUser ? (
                                <ul
                                    className={`dropdown-menu min-w-max absolute bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-base z-50 float-left py-2 list-none text-left rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 mt-2 ${
                                        isDropdownOpen ? "block" : "hidden"
                                    }`}
                                    aria-labelledby="dropdownMenuButton2"
                                    style={{ right: "0", left: "auto" }}
                                >
                                    <li>
                                        <span
                                            className="dropdown-item text-sm py-3 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-2 transition-colors duration-200 cursor-pointer"
                                            role="button"
                                            onClick={() => logOut()}
                                        >
                                            Logout
                                        </span>
                                    </li>
                                </ul>
                            ) : (
                                <ul
                                    className={`dropdown-menu min-w-max absolute bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-base z-50 float-left py-2 list-none text-left rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 mt-2 ${
                                        isDropdownOpen ? "block" : "hidden"
                                    }`}
                                    aria-labelledby="dropdownMenuButton2"
                                    style={{ right: "0", left: "auto" }}
                                >
                                    <li>
                                        <Link
                                            className="dropdown-item text-sm py-3 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-2 transition-colors duration-200"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item text-sm py-3 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-2 transition-colors duration-200"
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="h-[68px]"></div>
        </>
    );
};

export default Navbar;
