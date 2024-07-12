import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewUser() {

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });

    const {id} = useParams(); // extracts the 'id' on the path which brought us to this page

    useEffect(()=>{
        loadUser();
    }, [])

    const loadUser = async() => {
        const response = await axios.get(`http://localhost:8080/user/${id}`)
        console.log("Response from backend:", response);
        setUser(response.data);
    }

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            User Id: {user.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name:</b> {user.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Username:</b> {user.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email: </b> {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to="/">
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    )
}