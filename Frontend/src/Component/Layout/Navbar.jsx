import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
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
        "https://careercompass-seven.vercel.app/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

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
        <ul className="hidden sm:flex space-x-6 items-center">
          <li className="text-white hover:text-purple-200">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="text-white hover:text-purple-200">
            <Link to={"/job/getall"}>ALL JOBS</Link>
          </li>
          <li className="text-white hover:text-purple-200">
            <Link to={"/applications/me"}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li className="text-white hover:text-purple-200">
                <Link to={"/job/post"}>POST NEW JOB</Link>
              </li>
              <li className="text-white hover:text-purple-200">
                <Link to={"/job/me"}>VIEW YOUR JOBS</Link>
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

        {/* Hamburger Menu for Mobile */}
        <div
          className="sm:hidden text-white text-3xl cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ease-in-out ${
          showSidebar ? "block" : "hidden"
        }`}
        onClick={() => setShowSidebar(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transition-transform transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 p-6">
          <li className="text-white hover:text-purple-200">
            <Link to={"/"} onClick={() => setShowSidebar(false)}>
              HOME
            </Link>
          </li>
          <li className="text-white hover:text-purple-200">
            <Link to={"/job/getall"} onClick={() => setShowSidebar(false)}>
              ALL JOBS
            </Link>
          </li>
          <li className="text-white hover:text-purple-200">
            <Link to={"/applications/me"} onClick={() => setShowSidebar(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li className="text-white hover:text-purple-200">
                <Link to={"/job/post"} onClick={() => setShowSidebar(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li className="text-white hover:text-purple-200">
                <Link to={"/job/me"} onClick={() => setShowSidebar(false)}>
                  VIEW YOUR JOBS
                </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
