import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://careercompass-seven.vercel.app/api/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        console.log(error);
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] min-h-screen flex items-center justify-center py-8">
      <div className="container max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h3 className="mt-10 text-2xl font-semibold text-center mb-6">
          Job Details
        </h3>
        <div className="banner space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Title:</span> {job.title}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {job.category}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Country:</span> {job.country}
          </p>
          <p className="text-lg">
            <span className="font-semibold">City:</span> {job.city}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Description:</span>{" "}
            {job.description}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Job Posted On:</span>{" "}
            {job.jobPostedOn}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Salary:</span>{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="mt-6">
              <Link
                to={`/application/${job._id}`}
                className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-[#8BC6EC] to-[#9599E2] rounded-md shadow-lg hover:bg-gradient-to-l hover:from-[#6fa2c5] hover:to-[#8189c6]"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
