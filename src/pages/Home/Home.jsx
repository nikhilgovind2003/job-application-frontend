import React, { useEffect } from 'react';
import JobCard from '../../components/JobCard/JobCard.jsx';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slices/job/jobSlice'; // Import the fetchJobs action

function Home() {
  const dispatch = useDispatch();

  // Access job data from Redux store
  const { jobs, status, error } = useSelector((state) => state.job);

  // Fetch jobs when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [dispatch, status]);

  return (
    <div className="home-container">
      <h1>All Jobs</h1>
      {status === 'loading' && <p>Loading jobs...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} showApplyButton={true} />
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
