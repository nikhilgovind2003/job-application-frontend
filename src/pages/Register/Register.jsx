import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import {useForm} from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const onSubmit = async (datas) => {

    console.log(datas)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datas),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!', {
          position: 'top-right',
          autoClose: 2000,
        });

        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.error || 'Registration failed!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Server error. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error-text">{errors.name.message  }</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } } )}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } } )}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button type="submit">Register</button>
        </form>
        <div className="login-redirect">
  Already have an account? <a href="/login">Login here</a>
</div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
