import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ViewApplicant.css"; // Importing the updated CSS file

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res?.data?.success) {
          setApplicants(res?.data?.applications);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="view-applicants">
      <h2>Applicants for this Job</h2>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.applicantId._id}>
              <div className="applicant-details">
                <div className="applicant-name-email">
                  <span>{applicant.applicantId.name}</span>
                  <span>{applicant.applicantId.email}</span>
                </div>
              </div>
              <div className="cover-letter">
                {applicant.coverLetter || "No cover letter provided"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants found.</p>
      )}
    </div>
  );
};

export default ViewApplicants;
