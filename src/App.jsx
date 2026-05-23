import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import CreateJob from "./pages/CreateJob/CreateJob.jsx";
import MyJobs from "./pages/MyJobs/MyJobsPage.jsx";
import ProtectedRoute from "./utils/PrivateRoute.jsx"; // ProtectedRoute for regular users
import JobApplication from "./components/CoverLetterForm/CoverLetterForm.jsx";
import NotFound from "./pages/PageNotFound/PageNotFound.jsx"; // Import the 404 page
import ViewApplicants from "./components/ViewApplicant/ViewApplicant.jsx";
import EditJob from "./components/EditJob/EditJob.jsx.jsx";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css.jsx";
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
