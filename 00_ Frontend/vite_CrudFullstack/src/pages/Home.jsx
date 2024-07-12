import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {  // shortcut: we typed "rfc" + Enter

    const[users, setUsers] = useState([]);

    useEffect(()=>{
        loadUsers();
    }, []);

    const loadUsers = async() => {
        const respoonse = await axios.get("http://localhost:8080/user/getAll")
        console.log('Fetched data by axios:', respoonse.data);
        setUsers(respoonse.data);
    }

    const deleteUser = async(id) => {
        const returningMessage = await axios.delete(`http://localhost:8080/user/${id}`)
        console.log("Returning message from backend:",returningMessage);
        loadUsers();
    }



  return ( 
    <>
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>{/* 'index' refers to the which element of the 'users' array; zero, first, second, third... */}
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link className='btn btn-primary mx-2'
                                to={`/viewuser/${user.id}`}> {/* [we had defined the paths in App.jsx]. |||  */}
                                View                         {/*  '--> (we will use this 'id' in the target component [EditUser component], by using 'useParams()' there. (for database operation). */}
                            </Link>
                            <Link className='btn btn-outline-primary mx-2' 
                                to={`/edituser/${user.id}`}> 
                                Edit
                            </Link>
                            <button className='btn btn-danger mx-2' 
                                onClick={()=>deleteUser(user.id)}>
                                Delete
                            </button>
                        </td>
                        </tr>
                    ))
                }
                
                
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}
