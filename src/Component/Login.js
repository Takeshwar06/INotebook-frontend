import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [credential,setCredential]=useState({email:"",password:""})
    const navigate=useNavigate();
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const response= await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credential.email,password:credential.password})
          })
          const json=await response.json();
          console.log(json);
          if(json.success){
            // save the authtoken on localStorage
            localStorage.setItem("token",json.authtoken)
            navigate("/");
          }
          else{
            props.showAlert("signup ","success");
          }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={onChange} name="email" value={credential.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} name='password' value={credential.password} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
