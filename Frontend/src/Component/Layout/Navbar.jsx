import { useContext, useState } from "react";
import { Context } from "../../main";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://careercampass.vercel.app/api/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  // shared NavLink class function
  const linkClasses = ({ isActive }) =>
    `text-white hover:text-purple-200 px-2 py-1 transition duration-300 ${
      isActive ? 'border-b-2 border-white ' : ''
    }`;

  return (
    <nav
      className={`${
        isAuthorized
          ? "bg-gradient-to-r from-blue-400 to-purple-400"
          : "bg-gray-800"
      } shadow-md fixed w-full z-50`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigateTo("/")}
          className="logo cursor-pointer text-white text-2xl font-extrabold border-l-4 pl-4 transition-colors duration-300 transform hover:scale-105 tracking-wider"
        >
          CareerCompass
        </div>

        {/* Desktop Menu */}
        {isAuthorized && (
          <ul className="hidden sm:flex space-x-6 items-center">
            <li>
              <NavLink to="/" className={linkClasses}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/job/getall" className={linkClasses}>
                ALL JOBS
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications/me" className={linkClasses}>
                {user?.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </NavLink>
            </li>
            {user?.role === "Employer" && (
              <>
                <li>
                  <NavLink to="/job/post" className={linkClasses}>
                    POST NEW JOB
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job/me" className={linkClasses}>
                    VIEW YOUR JOBS
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                LOGOUT
              </button>
            </li>
          </ul>
        )}

        {/* Hamburger Menu for Mobile */}
        <div
          className="sm:hidden text-white text-3xl cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transition-transform transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 p-6">
          <li>
            <NavLink
              to="/"
              className={linkClasses}
              onClick={() => setShowSidebar(false)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job/getall"
              className={linkClasses}
              onClick={() => setShowSidebar(false)}
            >
              ALL JOBS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/applications/me"
              className={linkClasses}
              onClick={() => setShowSidebar(false)}
            >
              {user?.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </NavLink>
          </li>
          {user?.role === "Employer" && (
            <>
              <li>
                <NavLink
                  to="/job/post"
                  className={linkClasses}
                  onClick={() => setShowSidebar(false)}
                >
                  POST NEW JOB
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/job/me"
                  className={linkClasses}
                  onClick={() => setShowSidebar(false)}
                >
                  VIEW YOUR JOBS
                </NavLink>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300 w-full text-left"
            >
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
