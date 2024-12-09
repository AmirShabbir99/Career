import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-8">How JobZee Works</h3>
        <div className="banner grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="card bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="icon text-4xl text-[#8BC6EC] mb-4">
              <FaUserPlus />
            </div>
            <p className="text-xl font-bold text-gray-800">Create Account</p>
            <p className="mt-2 text-gray-600">
              Create an account by providing your details and setting a
              password.
            </p>
          </div>
          <div className="card bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="icon text-4xl text-[#8BC6EC] mb-4">
              <MdFindInPage />
            </div>
            <p className="text-xl font-bold text-gray-800">
              Find a Job/Post a Job
            </p>
            <p className="mt-2 text-gray-600">
              Find jobs by browsing listings; post jobs to attract candidates.
            </p>
          </div>
          <div className="card bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="icon text-4xl text-[#8BC6EC] mb-4">
              <IoMdSend />
            </div>
            <p className="text-xl font-bold text-gray-800">
              Apply For Job/Recruit Candidates
            </p>
            <p className="mt-2 text-gray-600">
              Apply for jobs by submitting resumes; recruit by posting listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
