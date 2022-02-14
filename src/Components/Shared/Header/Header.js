import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  const toggleFunction = () => {
    const toggleButton = document.getElementById("toogleDiv");
    if (toggleButton.style.display === "none") {
      toggleButton.style.display = "block";
    } else {
      toggleButton.style.display = "none";
    }
  };

  return (
    <nav className="bg-indigo-700 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* ///////////////// Hamburger ///////////////// */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleFunction}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:text-gray-300 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <i className="fas fa-bars text-2xl px-2"></i>
            </button>
          </div>
          {/* ///////////// Project Logo /////////// */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/home">
              <img
                className="hidden lg:block"
                height="230"
                width="130"
                src="https://i.ibb.co/HzzW0Xv/logo.png"
                alt="Workflow"
              />
              <i className="fab fa-twitter"></i> 
            </Link>
          </div>
          {/* /////////////////// Mobile Navbar Points /////////////////// */}
          <div className="flex items-center">
            <div className="hidden sm:block px-8">
              <div className="flex space-x-4">
                <Link
                  className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium flex items-center"
                  as={HashLink}
                  to="/home#home"
                >
                  Home
                </Link>
                <Link
                  className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium flex items-center"
                  as={HashLink}
                  to="/home#about"
                >
                  About
                </Link>
                <Link
                  className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium flex items-center"
                  as={HashLink}
                  to="/home#Courses"
                >
                  Courses
                </Link>
                <Link
                  className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium flex items-center"
                  as={HashLink}
                  to="/home#blog"
                >
                  Blog
                </Link>
                <Link
                  className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium flex items-center"
                  as={HashLink}
                  to="/home#contact"
                >
                  Contact
                </Link>
              </div>
            </div>

            {!user?.email && (
              <Link
                className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 mr-2 border-2 rounded-md text-md font-medium flex items-center justify-center"
                to="/login"
              >
                Sign In
              </Link>
            )}
            {user?.email && (
              <div className="flex">
                {/* /////////////// Nav Profile Box //////////// */}
                <div className="flex userProfile">
                  {/* ///////// Profile img & name /////////// */}
                  <div className="flex items-center profile-imgName">
                    <img
                      className=" user-img h-8 w-8 rounded-full ring-2 ring-offset-2"
                      src={user.photoURL}
                      alt=""
                    />
                    <span
                      style={{ fontSize: "12px" }}
                      className="text-white ml-2 uppercase"
                    >
                      {user.displayName}
                    </span>
                  </div>
                  {/* ///////// Profile Dropdown Menu /////////// */}
                  <div
                    className="
                origin-top-right 
                absolute 
                right-0 
                w-40 
                rounded-md 
                shadow-lg 
                py-1 
                px-1
                mr-12
                mt-10
                bg-white 
                ring-1 
                ring-black 
                ring-opacity-5 
                focus:outline-none 
                hidden 
                show"
                    id="userProfileDiv"
                  >
                    <Link
                      className="text-black-200 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium block hover:text-white"
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/userProfile"
                      className="text-black-200 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium block hover:text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/login"
                      onClick={logout}
                      className="text-black-200 hover:bg-indigo-900 focus:text-gray-300 px-3 py-2 rounded-md text-md font-medium block hover:text-white"
                    >
                      Log Out
                    </Link>
                  </div>
                </div>
                {/* //////////////// Logout Button /////////////// */}
                <Link onClick={logout} to="/login">
                  <i
                    className="
              xl:ml-4 
              lg:ml-4 
              sm:ml-2 
              fas fa-sign-in-alt 
              text-white 
              text-lg 
              px-2 
              py-1 
              border 
              border-indigo-700 
              rounded-lg 
              hover:border-white 
              hover:bg-indigo-900"
                  ></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* //////////////////// Hamburger Mobile ////////////////////// */}
      <div className="hidden" id="toogleDiv">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            as={HashLink}
            to="/home#home"
            className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            as={HashLink}
            to="/home#about"
            className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            as={HashLink}
            to="/home#Courses"
            className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Courses
          </Link>
          <Link
            as={HashLink}
            to="/home#blog"
            className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
          <Link
            as={HashLink}
            to="/home#contact"
            className="text-gray-100 hover:bg-indigo-900 focus:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
