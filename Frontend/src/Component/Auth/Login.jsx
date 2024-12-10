import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://careercompass-seven.vercel.app/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] min-h-screen flex items-center justify-center">
      <div className="container max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="header mb-4 text-center">
          <h3 className="text-3xl font-semibold">Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag mb-4 flex items-center border-b-2 border-gray-300">
            <label className="w-32">Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            <FaRegUser className="text-gray-600 ml-2" />
          </div>
          <div className="inputTag mb-4 flex items-center border-b-2 border-gray-300">
            <label className="w-32">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <MdOutlineMailOutline className="text-gray-600 ml-2" />
          </div>
          <div className="inputTag mb-4 flex items-center border-b-2 border-gray-300">
            <label className="w-32">Password</label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <RiLock2Fill className="text-gray-600 ml-2" />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] text-white font-semibold rounded-md hover:from-[#6fa2c5] hover:to-[#8189c6]"
          >
            Login
          </button>
          <Link
            to={"/register"}
            className="block text-center mt-4 text-blue-500 hover:underline"
          >
            Register Now
          </Link>
        </form>
      </div>
      <div className="banner hidden sm:block w-1/2">
        <img
          src="/login.png"
          alt="login"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Login;
