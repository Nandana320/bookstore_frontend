import { faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import {adminProfileUpdateStatusContext} from '../../context/Contextshare'


const AdminSideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [homeStatus, setHomeStatus] = useState(false)
  const [bookStatus, setBookStatus] = useState(false)
  const [settingStatus, setSettingStatus] = useState(false)

  const [adminData, setAdminData] = useState({
    username: "",
    profile: ""
  })

  const {adminProfileUpdateStatus}=useContext(adminProfileUpdateStatusContext)

  // ---- Load user details once ----
  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setAdminData({
        username: user.username || "",
        profile: user.profile || ""
      })
    }
  }, [adminProfileUpdateStatus])

  // ---- Update active menu based on URL ----
  useEffect(() => {
    setHomeStatus(location.pathname === "/admin-home")
    setBookStatus(location.pathname === "/admin-books")
    setSettingStatus(location.pathname === "/admin-settings")
  }, [location.pathname])

  const filter = (data) => {
    if (data === 'home') navigate('/admin-home')
    else if (data === 'books') navigate('/admin-books')
    else if (data === 'settings') navigate('/admin-settings')
    else navigate('*')
  }

  return (
    <>
      <img 
        src={adminData.profile && adminData.profile !== "" 
          ? `${serverURL}/uploads/${adminData.profile}`
          : "https://cdn-icons-png.flaticon.com/512/666/666201.png"
        } 
        alt="profile" 
        style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
      />

      <h1 className='mt-5'>{adminData.username}</h1>

      <div className='my-5'>
        <div className='mb-3' onClick={() => filter("home")}>
          <input type='radio' name="filterPage" checked={homeStatus} readOnly />
          <label className='ms-3'><FontAwesomeIcon icon={faHouse} className='me-3' />Home</label>
        </div>

        <div className='mb-3' onClick={() => filter("books")}>
          <input type='radio' name="filterPage" checked={bookStatus} readOnly />
          <label className='ms-3'><FontAwesomeIcon icon={faBook} className='me-3' />All Books</label>
        </div>

        <div className='mb-3' onClick={() => filter("settings")}>
          <input type='radio' name="filterPage" checked={settingStatus} readOnly />
          <label className='ms-3'><FontAwesomeIcon icon={faGear} className='me-3' />Settings</label>
        </div>
      </div>
    </>
  )
}

export default AdminSideBar
