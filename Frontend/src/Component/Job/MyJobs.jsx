import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job/myJob`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for disabling editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function for updating the job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);

    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Function for deleting job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="  myJobs page bg-gradient-to-r from-blue-400  to-blue-300 min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className=" text-3xl font-semibold text-center text-white mb-8">
          Your Posted Jobs
        </h1>
        {myJobs.length > 0 ? (
          <div className="space-y-8">
            {myJobs.map((element) => (
              <div
                key={element._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold">Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      />
                    </div>
                    <div>
                      <span className="font-semibold">Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "country",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold">City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      />
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "category",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      >
                        <option value="Graphics & Design">
                          Graphics & Design
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="Frontend Web Development">
                          Frontend Web Development
                        </option>
                        <option value="MERN Stack Development">
                          MERN Stack Development
                        </option>
                        <option value="Account & Finance">
                          Account & Finance
                        </option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">
                          MEAN Stack Development
                        </option>
                        <option value="MEVN Stack Development">
                          MEVN Stack Development
                        </option>
                        <option value="Data Entry Operator">
                          Data Entry Operator
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold">Salary:</span>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "fixedSalary",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                        />
                      ) : (
                        <div className="flex space-x-4">
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryFrom",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryTo",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold">Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "expired",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold">Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      />
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span>
                      <textarea
                        rows={2}
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#8BC6EC] disabled:bg-gray-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  {editingMode === element._id ? (
                    <>
                      <button
                        className="bg-[#8BC6EC] text-white px-4 py-2 rounded-md transition-all hover:bg-[#5598d3]"
                        onClick={() => handleUpdateJob(element._id)}
                      >
                        <FaCheck className="inline-block mr-2" /> Save
                      </button>
                      <button
                        className="bg-gray-300 text-black px-4 py-2 rounded-md transition-all hover:bg-gray-400"
                        onClick={handleDisableEdit}
                      >
                        <RxCross2 className="inline-block mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <div>
                      <button
                        className="bg-[#8BC6EC] text-white px-4 py-2 rounded-md transition-all hover:bg-[#5598d3] mr-4"
                        onClick={() => handleEnableEdit(element._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md transition-all hover:bg-red-600"
                        onClick={() => handleDeleteJob(element._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">
            You have not posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
