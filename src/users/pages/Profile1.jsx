import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { deleteUserBooksApi, getAllUserBookApi, getAllUserBroughtBooksApi, uploadBookApi } from '../../services/allApi'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Profile1 = () => {

  const [sellStatus, setSellStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)

  const [username, setUserName] = useState("")
  const [profile, setProfile] = useState("")

  const [deletestatus, setDeleteStatus] = useState("")
  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "",
    abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
  })

  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")
  const [userBooks, setUserBooks] = useState([])
  const [userBroughtBooks, setUserBroughtBooks] = useState([])

  // image upload handler
  const handleUploadImg = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const updatedUploads = [...bookDetails.uploadImages, file]
    setBookDetails({ ...bookDetails, uploadImages: updatedUploads })

    const url = URL.createObjectURL(file)
    setPreview(url)
    setPreviewList([...previewList, url])
  }

  // reset form
  const handleReset = () => {
    setBookDetails({
      title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "",
      abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
    })
    setPreview("")
    setPreviewList([])
  }

  // submit handler
  const handleSubmit = async () => {
    const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails

    if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length === 0) {
      toast.info("Please fill the form completely")
      return
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const reqBody = new FormData()

    for (let key in bookDetails) {
      if (key !== "uploadImages") {
        reqBody.append(key, bookDetails[key])
      } else {
        bookDetails.uploadImages.forEach((item) => {
          reqBody.append("uploadImages", item)
        })
      }
    }

    const result = await uploadBookApi(reqBody, reqHeader)

    if (result.status === 401) {
      toast.warning(result.response.data)
      handleReset()
    } else if (result.status === 200) {
      toast.success("Book Added Successfully")
      handleReset()
    } else {
      toast.error("Something went wrong")
      handleReset()
    }
  }

  console.log("TOKEN:", sessionStorage.getItem("token"));


  const deleteBook = async (id) => {
    const result = await deleteUserBooksApi(id)
    console.log(result);
    if (result.status == 200) {
      setDeleteStatus(result.data)
    }

  }












  // get user & token + update when profile changes
  useEffect(() => {
        if (bookStatus == true) {
            getAllUserBooks()
        }
        else if (purchaseStatus == true) {
            getAllUserBroughtBooks()
        }
        else {
            console.log("Something Went Wrong!!!");
        }
    }, [bookStatus, purchaseStatus,deletestatus])






    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserName(user.username)
            setProfile(user.profile)
            // setUserDetails({ username: user.username, password: user.password, cPassword: user.password, bio: user.bio })
            // setExistingImage(user.profile)
        }
    }, [])


  const getAllUserBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getAllUserBookApi(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setUserBooks(result.data)
    }

  }

  const getAllUserBroughtBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBroughtBooksApi(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setUserBroughtBooks(result.data)
    }


  }



  return (
    <>
      <Header />

      <div style={{ height: '200px' }} className='bg-gray-500'></div>

      {/* PROFILE IMAGE */}
      <div
        style={{
          width: '230px',
          height: '230px',
          borderRadius: '50%',
          marginLeft: '70px',
          marginTop: '-130px'
        }}
        className='bg-white p-3'
      >
        <img
          referrerPolicy="no-referrer"
          style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }}
          src={
            profile === ""
              ? "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg"
              : profile.startsWith('https://lh3.googleusercontent.com/')
                ? profile + "?sz=400"
                : `${serverURL}/uploads/${profile}?t=${new Date().getTime()}`
          }
          alt="profile"
        />

      </div>

      {/* USERNAME + EDIT */}
      <div className='flex px-20 mt-5 justify-between'>
        <p className='flex justify-center items-center'>
          <span className='text-3xl'>{username}</span>
          <FontAwesomeIcon icon={faCircleCheck} className='text-blue-500 ms-2' />
        </p>
        <EditProfile />
      </div>

      <p className='md:px-20 px-5 my-5 text-justify'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quis doloribus rem, repellat exercitationem incidunt?
      </p>

      {/* TABS */}
      <div className='md:px-40'>
        <div className='flex justify-center items-center my-5'>
          <p
            onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }}
            className={sellStatus ? 'p-4 text-blue-800 border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200'}>
            Sell Book
          </p>

          <p
            onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }}
            className={bookStatus ? 'p-4 text-blue-800 border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200'}>
            Sold History
          </p>

          <p
            onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }}
            className={purchaseStatus ? 'p-4 text-blue-800 border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200'}>
            Purchase History
          </p>
        </div>

        {/* SELL BOOK FORM */}
        {sellStatus &&
          <div className='bg-gray-200 p-10 mt-10'>
            <h1 className='text-center text-3xl font-medium'>Book Details</h1>
            <div className='md:grid grid-cols-2 mt-5 w-full'>
              <div>
                <div className='mb-3'>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} type="text" placeholder='Number of Pages' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.imageurl} onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} type="text" placeholder='Image Url ' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} type="text" placeholder='Discount Price' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3'>
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} rows={5} type="text" placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
              </div>
              <div>
                <div className='mb-3 ms-3'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3 ms-3'>
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} t type="text" placeholder='Lanugage' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3 ms-3'>
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>
                <div className='mb-3 ms-3'>
                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Cateogry' className='p-2 bg-white rounded placeholder-gray-500 w-full' />
                </div>

                <div className='mb-3 flex justify-center items-center w-full mt-10'>
                  {!preview ? <label htmlFor="imageFile">
                    <input id='imageFile' type="file" style={{ display: 'none' }} onChange={e => handleUploadImg(e)} />
                    <img src="https://cdn-icons-png.freepik.com/256/15473/15473943.png?semt=ais_white_label" alt="no image" style={{ width: '200px', height: '200px' }} />
                  </label>
                    :
                    <img src={preview} alt="no image" style={{ width: '200px', height: '200px' }} />
                  }
                </div>

                {preview && <div className='flex justify-center items-center'>
                  {previewList?.map((item) => (
                    <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='me-1' />
                  ))
                  }
                  <label htmlFor="imageFile">
                    <input id='imageFile' type="file" style={{ display: 'none' }} onChange={e => handleUploadImg(e)} />
                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3' />
                  </label>
                </div>}

              </div>
            </div>
            <div className='flex justify-end items-center gap-3'>
              <button onClick={handleReset} className='bg-amber-500 rounded text-black p-3 hover:bg-white hover:border hover:border-amber-500 hover:text-amber-500'>Reset</button>
              <button onClick={handleSubmit} className='bg-green-500 rounded text-white p-3 hover:bg-white hover:border hover:border-green-500 hover:text-green-500 ms-2'>Submit</button>
            </div>
          </div>}

        {/* SOLD HISTORY */}
        {bookStatus &&
          <div className='p-10 my-20 shadow rounded'>
            {userBooks?.length > 0 ?
              userBooks?.map((item) => (
                <div className='bg-gray-200 p-4 rounded mb-3'>
                  <div className='md:grid grid-cols-[3fr_1fr]'>
                    <div>
                      <h1 className='text-2xl'>{item?.title}</h1>
                      <h1>{item?.author}</h1>
                      <h3 className='text-blue-600'>${item?.dprice}</h3>
                      <p>Abstract/Description : {item?.abstract}</p>
                      <div className='flex mt-5'>

                        {item?.status == "pending" ? <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" style={{ width: '70px', height: '70px' }} />

                          : item?.status == "approved" ?

                            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/490/043/small_2x/approved-stamp-mark-clipart-free-png.png" alt="approved" style={{ width: '70px', height: '70px' }} className='ms-3' />

                            :

                            <img src="https://static.vecteezy.com/system/resources/previews/021/432/975/non_2x/sold-out-grunge-rubber-stamp-free-png.png" alt="sold" style={{ width: '70px', height: '70px' }} />
                        }
                      </div>
                    </div>
                    <div>
                      <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '300px' }} />
                      <div className='flex justify-end mt-4'>
                        <button onClick={() => deleteBook(item?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))

              :
              <div className='flex justify-center items-center flex-col'>
                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                <p className='text-red-600 text-2xl'>No Books Added Yet</p>
              </div>}
          </div>}


        {/* PURCHASE HISTORY */}
        {purchaseStatus &&
          <div className='p-10 my-20 shadow rounded'>
            {userBroughtBooks?.length > 0 ?
              userBroughtBooks?.map((item) => (
                <div className='bg-gray-200 p-4 rounded'>
                  <div className='md:grid grid-cols-[3fr_1fr]'>
                    <div>
                      <h1 className='text-2xl'>{item?.title}</h1>
                      <h1>{item?.author}</h1>
                      <h3 className='text-blue-600'>${item?.dprice}</h3>
                      <p>Abstract/Description : {item?.abstract}</p>
                      <div className='flex mt-5'>
                        {item?.status == "pending" ? <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" style={{ width: '70px', height: '70px' }} />

                          : item?.status == "approved" ?

                            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/490/043/small_2x/approved-stamp-mark-clipart-free-png.png" alt="approved" style={{ width: '70px', height: '70px' }} className='ms-3' />

                            :

                            <img src="https://static.vecteezy.com/system/resources/previews/021/432/975/non_2x/sold-out-grunge-rubber-stamp-free-png.png" alt="sold" style={{ width: '70px', height: '70px' }} />}


                      </div>
                    </div>
                    <div>
                      <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '300px' }} />
                      {/* <div className='flex justify-end mt-4'>
                                                <button className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                            </div> */}
                    </div>
                  </div>
                </div>
              ))

              :
              <div className='flex justify-center items-center flex-col'>
                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                <p className='text-red-600 text-2xl'>No Books Added Yet</p>
              </div>}
          </div>}











      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Profile1