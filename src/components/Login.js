import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:" ",password: " "});
    let navigate= useNavigate();
    const onChange=(e)=>{
       setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({email:credentials.email,password: credentials.password})
      });
      
      const json = await response.json();
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authToken);
        props.showAlert("Logged In successfully","success")
        navigate("/");
      }
      else{
        props.showAlert("Invalid credentials","danger");
      }
    }
    
    return (
        <div className='mt-2'>
          <h2 className='my-2'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>    
        </div>
    )
}

export default Login
