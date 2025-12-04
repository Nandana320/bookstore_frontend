import React, { useContext, useEffect, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {

  const [homeBooks, setHomeBooks] = useState([])
  const { searchKey, setSearchKey } = useContext(searchKeyContext)
  const navigate = useNavigate()

  const getAllBooks = async () => {
    const result = await homeBookApi()
    console.log(result);
    if (result.status == 200) {
      setHomeBooks(result.data)
    }

  }

  console.log(homeBooks);

  const handleSearch = () => {
    console.log("inside search");
    const token = sessionStorage.getItem("token")

    if (searchKey == "") {
      toast.info("Please enter the title of any book")
    } else if (!token) {

      toast.info("Please login")
      setTimeout(() => {
        navigate("/login")
      }, 2500)

    } else if (searchKey && token) {
      navigate("/all-books")
    }
    else {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    setSearchKey("")
    getAllBooks()
  }, [])


  return (
    <>
      <Header />
      <div>
        {/* ---------- HERO HEADER ---------- */}
        <header className='flex justify-center items-center bg-blue-900 text-white py-20'>
          <div id='main' className='flex justify-center items-center w-full'>
            <div className='md:grid grid-cols-3 w-full px-10'>
              <div></div>
              <div className='text-white flex justify-center items-center flex-col'>
                <h3 className='text-5xl font-semibold mb-2'>Wonderful Gifts</h3>
                <p className='text-gray-200 mb-4'>Give Your Family And Friends A Book</p>
                <div className='flex mt-3 w-full max-w-md'>
                  <input
                    onChange={e => setSearchKey(e.target.value)}
                    type="text"
                    placeholder='Search Books'
                    className='py-2 px-4 bg-white text-black rounded-3xl placeholder-gray-400 w-full outline-none'
                  />
                  <FontAwesomeIcon onClick={handleSearch}
                    icon={faMagnifyingGlass}
                    className='text-yellow-400 ml-3 mt-3 cursor-pointer'
                  />
                </div>


              </div>
              <div></div>
            </div>
          </div>
        </header>

        {/* ---------- NEW ARRIVALS SECTION ---------- */}
        <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
          <h2 className='text-xl text-gray-600 uppercase tracking-widest'>New Arrivals</h2>
          <h4 className='text-3xl font-semibold mb-8'>Explore our Latest Collection</h4>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full'>
            {homeBooks?.length > 0 ?
              homeBooks?.map((item) => (
                <div key={item?._id} className='p-3 shadow-md rounded-xl hover:shadow-lg transition'>
                  <img
                    src={item?.imageurl}
                    alt="Book image"
                    className='w-full h-72 object-cover rounded-lg'
                  />
                  <div className='flex justify-center flex-col items-center mt-3'>
                    <p className='text-blue-700 text-sm'>{item?.author}</p>
                    <h3 className='font-semibold'>{item?.title}</h3>
                    <p className='text-gray-500'>{item?.dprice}</p>
                  </div>
                </div>
              ))
              :
              <p>Loading.....</p>
            }

          </div>
          {/* ✅ Added Explore More Button below search bar */}
          <Link
            to="/all-books"
            className="mt-6 bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-3xl hover:bg-white hover:text-blue-900 border border-yellow-400 transition"
          >
            Explore More
          </Link>
        </section>

        <section className="flex flex-col md:flex-row justify-between items-start md:px-40 px-6 py-20 bg-white">
          {/* LEFT SIDE TEXT */}
          <div className="md:w-1/2 md:pr-12 text-gray-800">
            <h5 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Featured Authors
            </h5>
            <h2 className="text-xl font-semibold mb-5">Captivates with every word</h2>

            <p className="text-sm leading-relaxed mb-3">
              Authors in a bookstore application are the visionaries behind the books that fill the shelves,
              each contributing their own unique voice, creativity, and perspective to the world of literature.
              Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories,
              ideas, and knowledge to life in ways that resonate with readers of all backgrounds.
            </p>
            <p className="text-sm leading-relaxed">
              Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances
              to thought-provoking memoirs and insightful self-help books. Through their words, authors not
              only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow.
              In a bookstore application, authors’ works become accessible to readers everywhere, offering a
              diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape
              of modern literature.
            </p>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
            <img
              src="https://img.freepik.com/free-photo/smiling-businesswoman-cross-arms-office_23-2147936251.jpg"
              alt="Featured Author"
              className="w-[420px] h-[280px] object-cover rounded-none"
            />
          </div>
        </section>

        <section className="text-center py-16 bg-white md:px-40 px-6">
          <h5 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Testimonials
          </h5>
          <h2 className="text-xl font-semibold mb-8">See What Others Are Saying</h2>

          <div className="flex flex-col items-center justify-center text-gray-700">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Ken Thomas"
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <p className="text-sm leading-relaxed max-w-3xl mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dignissimos vitae, doloremque similique ipsum provident sed,
              voluptates soluta recusandae voluptatibus possimus natus fuga. Suscipit laudantium culpa inventore, soluta dolores et.
            </p>
            <p className="text-gray-800 text-sm mt-1">Ken Thomas</p>
          </div>
        </section>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Home