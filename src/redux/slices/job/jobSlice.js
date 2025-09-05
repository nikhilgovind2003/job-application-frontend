// src/slices/jobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  job: null,
  jobs: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch a single job with authentication
export const getSingleJob = createAsyncThunk(
  "jobs/getSingleJob",
  async (jobId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
      return rejectWithValue("Authentication token is missing");
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/jobs/singleJob/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      );

      return response.data; // Assuming your API returns the job in the data property
    } catch (error) {
      // Handle errors, such as network errors
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job"
      );
    }
  }
);

// Async thunk to fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axios.get("http://localhost:5000/api/jobs/all-jobs");
  return response.data.data; // Assuming the response data has a "data" property containing the jobs array
});

// Async thunk to update a job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, jobData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/jobs/${jobId}`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Returning the updated job data
  }
);

// Job slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    resetJob: (state) => {
      state.job = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getSingleJob Thunk
      .addCase(getSingleJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job = action.payload.data; // Assuming the API returns the job object in `data`
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message; // Handle errors from the rejected thunk
      })

      // fetchJobs Thunk
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload; // Assuming your API returns an array of jobs
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // updateJob Thunk
      .addCase(updateJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob; // Update job in the list
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { resetJob } = jobSlice.actions;

export default jobSlice.reducer;
