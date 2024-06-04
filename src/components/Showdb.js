import React, { useEffect, useState } from 'react'

function Showdb() {

const[users,setUsers]=useState([])

    const getusers =async()=>{
        const response = await fetch('http://localhost:8080/user',{
            method:'GET',
          })
          const data = await response.json();
          setUsers(data)
     }
      useEffect(()=>{
      getusers();
      },[])
      
  return (
    <>
    <div>
        <h1>ALL USERS</h1>
        <ul>
            {users.map(user=><li key={user._id}>
{user.username}
            </li>)}
        </ul>
    </div>
    </> 
  )
}

export default Showdb