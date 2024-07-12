import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  })

  const{name, username, email} = user // (destructuring the object)

  const onInputChange=(e) =>{  // MARK, important
    setUser({...user, [e.target.name]:e.target.value}); // ...user --> we're keeping the old data. And we're updating only the related data with the target input's value.
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
    const respoonse = await axios.post("http://localhost:8080/user/save", user);
    console.log("Fetched data by axios-post-request:", respoonse);
    navigate("/");
  }

  return (
    <div className="container">
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register User</h2>

                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Name
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            name='name'
                            value={name}
                            onChange={(e) => onInputChange(e)} // MARK, important
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Username' className='form-label'>
                            Username
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your username'
                            name='username'
                            value={username}
                            onChange={(e) => onInputChange(e)} // MARK
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your email'
                            name='email'
                            value={email}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type='submit' onClick={(e)=> onSubmit(e)} className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
