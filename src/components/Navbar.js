import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const closeDropdown = () => {
            setIsDropdownOpen(false);
        };

        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, []);
    return (
        <>
            <nav className="w-full flex flex-wrap items-center justify-between py-3 bg-white dark:bg-gray-900 dark:text-white shadow-lg navbar navbar-expand-lg fixed-top">
                <div className="container-fluid w-full flex items-center justify-between px-6">
                    <Link className="text-2xl  pr-2 font-semibold" to="/">
                        React Movie App
                    </Link>
                    {/* Collapsible wrapper */}
                    {/* Right elements */}
                    <div className="flex items-center relative">
                        {/* Icon */}
                        {currentUser && (
                            <h5 className="mr-2 capitalize">
                                {currentUser?.displayName}
                            </h5>
                        )}
                        <Switch />
                        <div className="dropdown relative">
                            <button
                                className="dropdown-toggle flex items-center hidden-arrow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-105"
                                id="dropdownMenuButton2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDropdownToggle();
                                }}
                            >
                                <img
                                    src={currentUser?.photoURL || avatar}
                                    className="rounded-full"
                                    style={{ height: 25, width: 25 }}
                                    alt="user"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </button>
                            {currentUser ? (
                                <ul
                                    className={`dropdown-menu min-w-max absolute bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-base z-50 float-left py-2 list-none text-left rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 mt-2 ${isDropdownOpen ? "block" : "hidden"}`}
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
                                    className={`dropdown-menu min-w-max absolute bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-base z-50 float-left py-2 list-none text-left rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 mt-2 ${isDropdownOpen ? "block" : "hidden"}`}
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
                    {/* Right elements */}
                </div>
            </nav>
            <div className="h-[52px]"></div>
        </>
    );
};

export default Navbar;
