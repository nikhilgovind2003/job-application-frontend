import React, { useState } from 'react';
import './CoverLetterForm.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CoverLetterForm = () => {
  const { jobId } = useParams()
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(jobId)
    try {
      const response = await axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`, // Adjust the URL as needed
        { coverLetter: data.coverLetter },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}` // Assuming you store the token in localStorage
          }
        }
      );

      if (response.data.success) {
        toast.success('Cover letter submitted successfully!');
          navigate("/")
      } else {
        setMessage('Failed to submit cover letter.');
      }
    } catch (error) {
      toast.error(error.message);
      setMessage('An error occurred while submitting.');
    }
  };

  return (

    <div className='coverletter-form'>
      <div className="cover-letter-container">
        <h2 className="cover-letter-title">Submit Cover Letter</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="cover-letter-label">Your Cover Letter</label>
          <textarea
            name="coverLetter"
            required
            rows="8"
            className="cover-letter-textarea"
            {...register("coverLetter", { required: "Cover letter is required" })}
          ></textarea>
          {errors.coverLetter && <p className="error-text">{errors.coverLetter.message}</p>}
          <div className='btns'>

            <button type="button" className="cancel-button" onClick={() => {
              navigate("/")
            }}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoverLetterForm;
