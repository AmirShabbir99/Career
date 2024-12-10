import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("https://careercompass-seven.vercel.app/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobs bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          ALL AVAILABLE JOBS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.jobs &&
            jobs.jobs.map((job) => (
              <div
                className="card bg-white rounded-lg shadow-md p-6 flex flex-col items-start space-y-4"
                key={job._id}
              >
                <h3 className="text-xl font-semibold text-[#333]">
                  {job.title}
                </h3>
                <p className="text-lg text-[#555]">
                  <span className="font-semibold">Category:</span>{" "}
                  {job.category}
                </p>
                <p className="text-lg text-[#555]">
                  <span className="font-semibold">Country:</span> {job.country}
                </p>
                <Link
                  to={`/job/${job._id}`}
                  className="text-white bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] px-4 py-2 rounded-md hover:bg-gradient-to-l hover:from-[#6fa2c5] hover:to-[#8189c6] transition-all"
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
