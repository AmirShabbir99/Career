import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModel";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(
            "https://careercampass.vercel.app/api/application/employer/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "https://careercampass.vercel.app/api/application/jobseeker/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(
          `https://careercampass.vercel.app/api/application/delete/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] p-6">
      <div className="container mx-auto">
        <h1 className="mt-12 text-4xl font-bold text-white mb-4">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        {applications.length <= 0 ? (
          <h4 className="text-xl text-gray-300">No Applications Found</h4>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((element) =>
              user.role === "Job Seeker" ? (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              )
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card bg-white p-6 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="detail mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Cover Letter:</span>{" "}
          {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card bg-white p-6 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="detail mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Cover Letter:</span>{" "}
          {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};

export default MyApplications;
