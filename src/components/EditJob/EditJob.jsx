import React, { useState, useEffect } from 'react';
import './EditJob.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleJob, updateJob } from '../../redux/slices/job/jobSlice'; // Import actions
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const JobEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {jobId} = useParams()
  console.log(jobId)

  // Access the job data from the Redux store
  const { job } = useSelector((state) => state.job);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: ''
  });


  // Fetch the job from the API if jobId is passed
  useEffect(() => {
    if (jobId) {
      dispatch(getSingleJob(jobId)); // Fetch job from Redux
    }
  }, [dispatch, jobId]);

  // Update form data when job data is retrieved from Redux
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        company: job.company || '',
        location: job.location || '',
        salary: job.salary || ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const onSubmit = async (values) => {

    try {
      // Dispatch the updateJob action to update the job
      await dispatch(updateJob({ jobId, jobData: values }));
      toast.success('Job updated successfully');
      navigate('/my-jobs');
    } catch (error) {
      toast.error('Error updating job: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      company: '',
      location: '',
      salary: ''
    });
    navigate("/my-jobs");
  };

  return (
    <div className="job-edit-popup">
      <div className="job-edit-header">
        <h2>Edit Job Details</h2>
        <button className="job-edit-close-btn" aria-label="Close">&times;</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="job-edit-form">
        <div className="job-edit-group">
          <label htmlFor="title">Job Title</label>
          <input 
            id="title" 
            name="title" 
            {...register("title", { required: "Job title is required" })}
          />
          {errors.title && <div className="job-edit-error">{errors.title.message}</div>}
        </div>

        <div className="job-edit-group">
          <label htmlFor="description">Job Description</label>
          <textarea 
            id="description" 
            name="description" 
            {...register("description", { required: "Job description is required" })}
            required 
            rows={4} 
          />
          {errors.description && <div className="job-edit-error">{errors.description.message}</div>}
        </div>

        <div className="job-edit-row">
          <div className="job-edit-group">
            <label htmlFor="company">Company Name</label>
            <input 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              required 
            />
            {errors.company && <div className="job-edit-error">{errors.company}</div>}
          </div>

          <div className="job-edit-group">
            <label htmlFor="location">Location</label>
            <input 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
            {errors.location && <div className="job-edit-error">{errors.location}</div>}
          </div>
        </div>

        <div className="job-edit-group">
          <label htmlFor="salary">Salary</label>
          <input 
            id="salary" 
            type="number" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
            min="0" 
          />
          {errors.salary && <div className="job-edit-error">{errors.salary}</div>}
        </div>

        <div className="job-edit-actions">
          <button 
            type="button" 
            onClick={handleCancel} 
            className="job-edit-cancel"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="job-edit-save"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobEditForm;
