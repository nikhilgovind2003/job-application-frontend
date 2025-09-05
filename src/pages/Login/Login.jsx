import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// Redux imports
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth/authSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const onSubmit = async (value) => {


    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, value);
      const { token, user } = response.data;
      dispatch(login({ token, user }));
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.log(error.response?.data?.message);
      console.error('Login error:', error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Login failed");  
    }
  };

  return (
    <div className=' login-page'>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
      <p className="switch-auth">
        Don't have an account? <Link to="/register">Sign Up here</Link>
      </p>
      </div>
      </div>
  );
}

export default Login;