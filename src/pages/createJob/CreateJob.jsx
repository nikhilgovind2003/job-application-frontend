import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css"; // Assuming you have a CSS file for styling
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const CreateJob = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

 

  const onSubmit = async(values) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success("Job created successfully!");

      if (res.data.success) {
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  };

  return (
    <div className="create-job-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          {...register("title", { required: "Job title is required" })}
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          {...register("description", { required: "Job description is required" })}
        />
        {errors.description && <p className="error-text">{errors.description.message}</p>}
        <input
          type="text"
          name="company"
          placeholder="Company"
          {...register("company", { required: "Company is required" })}
        />
        {errors.company && <p className="error-text">{errors.company.message}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p className="error-text">{errors.location.message}</p>}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          {...register("salary", { required: "Salary is required" })}
        />
        {errors.salary && <p className="error-text">{errors.salary.message}</p>}
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
