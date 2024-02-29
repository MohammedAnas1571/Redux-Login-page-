import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../Redux/user/createSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlevalue = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const response = await axios.post(`/auth/login`, formData);
      console.log('Success:', response.data);
      dispatch(signInSuccess(response.data));
      navigate("/");
    } catch (error) {
      console.error('Error:', error.response.data);
  
      if (error.response.status === 500) {
        // Internal server error
        dispatch(signInFailure("Internal error"));
      } else {
        // Other errors
        dispatch(signInFailure(error.response.data));
      }
    }
  };

  return (
    <div className='p-12 max-w-lg mx-auto '>
      <h1 className=' text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='bg-slate-200 rounded-lg  p-3 ' type="email" placeholder='Enter email' id='email' onChange={handlevalue} />
        <input className='bg-slate-200 rounded-lg  p-3' type="password" placeholder='Enter password' id='password' onChange={handlevalue} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading" : "Signup"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have any account  ? </p>
        <Link to='/signUp'>
          <span className='text-blue-500'>Register </span>
        </Link>
      </div>
      <p className='text-red-700'>{error ? (error || "something error") : ""}</p>
    </div>
  )
}

export default Login;
