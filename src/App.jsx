import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateJob from "./pages/CreateJob/CreateJob";
import MyJobs from "./pages/MyJobs/MyJobsPage";
import ProtectedRoute from "./utils/PrivateRoute"; // ProtectedRoute for regular users
import JobApplication from "./components/CoverLetterForm/CoverLetterForm";
import NotFound from "./pages/PageNotFound/PageNotFound"; // Import the 404 page
import ViewApplicants from "./components/ViewApplicant/ViewApplicant";
import EditJob from "./components/EditJob/EditJob.jsx";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>} />
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute>
              <JobApplication />
            </ProtectedRoute>
          }
        />
        <Route path="/view-applicants/:jobId" element={
          <ProtectedRoute>
            <ViewApplicants />
          </ProtectedRoute>
        } />

        <Route path="/edit-job/:jobId" element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        } />


        <Route path="*" element={<NotFound />} />
      </Routes>


          <ToastContainer />
    </div>
  );
}

export default App;
