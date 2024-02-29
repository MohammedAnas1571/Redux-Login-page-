import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const[error,setError] = useState(false)
  const[loading,setLoading] = useState(false)
  
 const navigate = useNavigate()
  const handlevalue = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    setError(false)
    setLoading(true);
    
    
   await axios.post(`/auth/signup`, formData)
       .then(response => {
        console.log('Success:', response.data);
      
      if( response.data) setLoading(false)
      navigate("/login")
 
    }) .catch(error => {
        setError(true)
        setLoading(false)
        console.error('Error:', error);
      });
  };

  return (
    <div className='p-12 max-w-lg mx-auto '>
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='bg-slate-200 rounded-lg p-3' type="text" placeholder='Enter Username' id='username' onChange={handlevalue} />
        <input className='bg-slate-200 rounded-lg  p-3 ' type="email" placeholder='Enter email' id='email' onChange={handlevalue} />
        <input className='bg-slate-200 rounded-lg  p-3' type="password" placeholder='Enter password' id='password' onChange={handlevalue} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?"Loading":"Signin"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Sign in </span>
        </Link>
        
      </div>
      <p className='text-red-700'>{error? "something error":""}</p>
    </div>
  )
}

export default SignUp;
