import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../../components/JobCard/JobCard";
import { useSelector } from "react-redux";
import "./MyJobsPage.css";

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  useEffect(() => {
    const fetchJobs = async () => {
      if (user) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/my-jobs` , {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });

          if (res?.data?.success) {
            setJobs(res.data.jobs); // Update jobs state with fetched data
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    fetchJobs();
  }, [user]);

  const removeJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  };

  return (
    <div className="my-jobs-page">
      <h2>My Jobs</h2>
      <div className="job-list">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              email={job?.createdBy?.email}
              onDelete={removeJob}
              showApplyButton={false}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;
