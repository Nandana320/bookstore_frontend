import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate('/')
  }
  return (
    <>
    <div className='flex justify-between px-20 p-3'>
        <div className='flex items-center'>
            <img src="https://img.freepik.com/free-vector/stack-colorful-books_1308-171744.jpg?semt=ais_hybrid&w=740&q=80" alt="Book Store" style={{width:"50px",height:"50px"}}/>
            <h1 className='ms-3 font-medium text-2xl'>Book Store</h1>

        </div>
        <button onClick={logout} className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white'>
            <FontAwesomeIcon icon={faPowerOff}/>LogOut
        </button>
    </div>
    <marquee behaviour="" direction="left" className='p-3 bg-gray-900 text-white'>
    <p>Welcome.Admin!..You are all set to manage and monitor the System.Let's get to work</p>
      </marquee>
    </>
  )
}

export default AdminHeader
