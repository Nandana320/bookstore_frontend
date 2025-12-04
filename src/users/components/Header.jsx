import React, { useContext, useEffect, useState } from 'react'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faPowerOff, faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Header = () => {

  const [status, setStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token, setToken] = useState("")
  const [profile, setProfile] = useState("")

  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setToken("")
    setProfile("")
    navigate('/')
  }

  useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem("token")
    setToken(tokenFromStorage || "")

    const userData = sessionStorage.getItem("existingUser")

    if (userData) {
      const user = JSON.parse(userData)
      setProfile(user?.profile || "")
    } else {
      setProfile("")
    }
  }, [userProfileUpdateStatus])

  return (
    <>
      {/* TOP HEADER */}
      <div className='md:grid grid-cols-3 p-3'>
        <div className='flex items-center'>
          <img
            src="https://img.freepik.com/premium-vector/stack-books-with-cup-coffee-stack-books_1253202-19272.jpg?w=360"
            alt="BookStore"
            style={{ width: '50px', height: '50px' }}
          />
        </div>

        <div className='flex justify-center items-center'>
          <h1>BOOK STORE</h1>
        </div>

        <div className='flex justify-end items-center'>
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faTwitter} className='me-3' />
          <FontAwesomeIcon icon={faFacebook} className='me-3' />

          {!token ? (
            <Link to={'/login'}>
              <button className='border border-black rounded px-3 py-2 ms-3'>
                <FontAwesomeIcon icon={faUser} /> Login
              </button>
            </Link>
          ) : (
            // DROPDOWN
            <div className='relative inline-block text-left'>
              <button
                type="button"
                className='inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50'
                onClick={() => setDropDownStatus(!dropDownStatus)}
              >
                <img
                  referrerPolicy="no-referrer"
                  style={{
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    objectFit: 'cover'
                  }}
                  src={
                    !profile
                      ? "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg"
                      : profile.startsWith('https://lh3.googleusercontent.com/')
                        ? profile + "?sz=400"
                        : `${serverURL}/uploads/${profile}?t=${new Date().getTime()}`
                  }
                  alt="profile"
                />
              </button>

              {dropDownStatus && (
                <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5'>
                  <div className='py-1'>
                    <Link to={'/profile'}>
                      <p className='block px-4 py-2 text-sm text-gray-700'>
                        <FontAwesomeIcon icon={faAddressCard} className='me-2' />
                        Profile
                      </p>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className='block px-4 py-2 text-sm text-gray-700 w-full text-left'
                    >
                      <FontAwesomeIcon icon={faPowerOff} className='me-2' />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center'>
        <div className='flex justify-between px-3 md:hidden w-full'>
          <span onClick={() => setStatus(!status)} className='text-2xl'>
            <FontAwesomeIcon icon={faBars} />
          </span>

          {!token && (
            <Link to={'/login'}>
              <button className='border border-white rounded px-3 py-2 ms-3'>
                <FontAwesomeIcon icon={faUser} className='me-2' />Login
              </button>
            </Link>
          )}
        </div>

        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}>
            <li className='mx-4 mt-3 md:mt-0'>Home</li>
          </Link>

          <Link to={'/all-books'}>
            <li className='mx-4 mt-3 md:mt-0'>Books</li>
          </Link>

          <Link to={'/contact'}>
            <li className='mx-4 mt-3 md:mt-0'>Contact</li>
          </Link>
        </ul>
      </nav>
    </>
  )
}

export default Header
