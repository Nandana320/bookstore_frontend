import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { allBookAdminApi, approveBookApi, getAllUsersApi } from '../../services/allApi'

const AdminBooks = () => {

  const [booklist, setBookList] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState([])
  const [token, setToken] = useState("")
  const [approveStatus, setApproveStatus] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  // ------------------ Fetch All Books -----------------------
  const getAllBooksAdmin = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await allBookAdminApi(reqHeader);
    console.log("Books:", result);

    if (result.status === 200) {
      setApproveStatus(true)
      setBookDetails(result.data)
    }
  };

  // ---------------------- Approve Book ----------------------
  const approveBooks = async (data) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await approveBookApi(data, reqHeader)
    console.log("Approved:", result);

    if (result.status === 200) {
      setApproveStatus(!approveStatus)
    }
  }

  // ---------------------- Fetch All Users -------------------
  const getAllUsers = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await getAllUsersApi(reqHeader)
    console.log("Users:", result.data);
    setAllUsers(result.data)
  }

  // ---------------------- Load Books on Token ----------------
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getAllBooksAdmin(savedToken);
    }
  }, [approveStatus]);

  // ---------------------- Load Users on Tab Switch -----------
  useEffect(() => {
    if (userStatus && token) {
      getAllUsers(token);
    }
  }, [userStatus, token]);

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[18rem_1fr] min-h-screen">
        <div className='bg-blue-100 flex flex-col items-center'>
          <AdminSideBar />
        </div>

        <div className="w-full">
          {/* Tabs */}
          <div className="flex justify-center items-center my-5 space-x-4">
            <p
              onClick={() => { setBookList(true); setUserStatus(false); }}
              className={booklist ? 'p-4 text-blue-800 border-b-4 border-blue-800 font-semibold cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>
              Book List
            </p>

            <p
              onClick={() => { setBookList(false); setUserStatus(true); }}
              className={userStatus ? 'p-4 text-blue-800 border-b-4 border-blue-800 font-semibold cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>
              Users
            </p>
          </div>

          {/* ------------------ BOOK LIST ------------------ */}
          {booklist &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
              {bookDetails?.length > 0 ? (
                bookDetails?.map((item) => (
                  <div
                    key={item._id}
                    className={item?.status === "sold" ? 'p-3 shadow-md opacity-60' : 'p-3 shadow-md'}
                  >
                    <img
                      src={item?.imageurl}
                      alt="no image"
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-4 text-center">
                      <p className="text-gray-600 font-semibold mb-2">{item?.author}</p>
                      <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
                      <p className="text-green-600 font-semibold">${item?.dprice}</p>

                      {item?.status === "pending" &&
                        <button
                          onClick={() => approveBooks(item)}
                          className='bg-green-800 text-white w-full p-3 mt-3'
                        >
                          Approve
                        </button>
                      }

                      {item?.status === "approved" &&
                        <div className='flex justify-end w-full mt-2'>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixSse2LK6ZMsm4ml8lHoL_bCuEO6rsA1nQA&s"
                            alt="approved"
                            style={{ width: "40px", height: "40px" }}
                          />
                        </div>
                      }
                    </div>
                  </div>
                ))
              ) : (
                <p>No books available...</p>
              )}
            </div>
          }

          {/* ------------------ USER LIST ------------------ */}
          {userStatus &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {allUsers?.length > 0 ? (
                allUsers.map((user) => (
                  <div
                    key={user?._id}
                    className="bg-gray-100 w-full max-w-sm p-6 rounded shadow-md"
                  >
                    <h2 className="text-red-600 font-semibold mb-3">
                      ID: {user?._id}
                    </h2>

                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-gray-400 text-2xl">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <span className="text-blue-600 font-medium text-lg">
                        {user?.username}
                      </span>
                    </div>

                    <p className="text-red-600 text-sm">{user?.email}</p>
                  </div>
                ))
              ) : (
                <p>No users found...</p>
              )}
            </div>
          }
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AdminBooks
