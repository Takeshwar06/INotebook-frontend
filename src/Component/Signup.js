import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const navigate=useNavigate()
    const [credential,setCredential]=useState({name:"",email:"",password:""})
    const onChange=(e)=>{
          
          setCredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authtoken)
            navigate("/");
        }else{
            alert("some error occured");
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input onChange={onChange} value={credential.name} type="text" className="form-control" name='name' id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={onChange} value={credential.email} type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} value={credential.password} type="password" className="form-control" name='password' id="exampleInputPassword1" minLength={5} required/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Comforme Password</label>
                    <input onChange={onChange}  type="password" className="form-control" name='cpassword' id="exampleInputPassword1" minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
