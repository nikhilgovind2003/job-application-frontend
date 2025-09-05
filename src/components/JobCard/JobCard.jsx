import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobCard.css";
import { useSelector } from "react-redux";
import axios from "axios";

const JobCard = ({ job, email, onDelete, showApplyButton }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${job?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      alert("Job deleted successfully");
      onDelete(job._id);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const descriptionWords = job.description?.split(" ") || [];
  const shouldTruncate = descriptionWords.length > 100;

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      {/* <div className="job-span"> */}
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
    {/* </div> */}
      <p className="job-salary">₹ {job.salary}</p>

      <p className="job-description">
        {showFullDescription || !shouldTruncate
          ? job.description
          : `${descriptionWords.slice(0, 100).join(" ")}...`}
        {shouldTruncate && (
          <span onClick={toggleDescription} className="read-more-toggle">
            {showFullDescription ? " Show Less" : " Read More"}
          </span>
        )}
      </p>

      {showApplyButton && (
        <Link to={`/apply/${job._id}`} className="apply-btn">
          Apply Now
        </Link>
      )}

      {user?.email === email && !showApplyButton && (
        <div className="job-btns">
          <button
            onClick={() => navigate(`/edit-job/${job._id}`)}
            className="job-edit-btn"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="job-delete-btn">
            Delete
          </button>
          <button
            className="view-applicants-btn"
            onClick={() => navigate(`/view-applicants/${job._id}`)}
          >
            View Applicants
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
