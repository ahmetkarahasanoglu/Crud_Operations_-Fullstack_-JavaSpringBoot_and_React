import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  let navigate = useNavigate();

  const {id} = useParams(); // extracts the 'id' on the path which brought us to this page

  const [user, setUser] = useState({ // this 'user' state is for tracking the values of the input fields on the browser page.
    name: "",
    username: "",
    email: ""
  })

  const{name, username, email} = user // (destructuring the object)

  const onInputChange=(e) =>{  // MARK, important
    setUser({...user, [e.target.name]:e.target.value}); // ...user --> we're keeping the old data. And we're updating only the related data with the target input's value.
  }

  useEffect(()=>{
    loadUser()
  }, [])

  const onSubmit=async(e)=>{
    e.preventDefault();
    const respoonse = await axios.put(`http://localhost:8080/user/${id}`, user); // update the user with this 'id', with this new 'user' object
    console.log("Fetched data by axios-put-request:", respoonse); // (we're not using setUser() here, because we don't have anything to do with the viewed user on this browser page; because we're going back to the home page[on the below line here])
    navigate("/");
  }

  const loadUser = async() => {
    const respoonse = await axios.get(`http://localhost:8080/user/${id}`)
    setUser(respoonse.data);
  }

  return (
    <div className="container">
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit User</h2>
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
