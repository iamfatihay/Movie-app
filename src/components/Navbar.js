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
      <nav className="w-full flex flex-wrap items-center justify-between py-3 bg-white dark:bg-gray-900 dark:text-white shadow-lg navbar navbar-expand-lg fixed-top">
        <div className="container-fluid w-full flex items-center justify-between px-6">
          <Link className="text-2xl  pr-2 font-semibold" to="/">
            Movie App
          </Link>
          <div className="flex items-center relative">
            {currentUser && (
              <h5 className="mr-2 capitalize">{currentUser?.displayName}</h5>
            )}
            <Switch />
            <div className="dropdown relative">
              <button
                className="dropdown-toggle flex items-center hidden-arrow focus:outline-none"
                id="dropdownMenuButton2"
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation here
                  handleDropdownToggle(); // Call the dropdown toggle function
                }}
              >
                <img
                  src={currentUser?.photoURL || avatar}
                  className="rounded-full"
                  style={{ height: 25, width: 25 }}
                  alt="user"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  // onClick={(e) => e.stopPropagation()}
                />
              </button>
              <ul
                className={`dropdown-menu min-w-max absolute bg-white text-base z-500 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 display: ${isDropdownOpen ? "block" : "hidden"}`}
                aria-labelledby="dropdownMenuButton2"
                style={{ right: "0", left: "auto" }}
              >
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <span
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    role="button"
                    onClick={() => logOut()}
                  >
                    Logout
                  </span>
                </li>
              </ul>
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
