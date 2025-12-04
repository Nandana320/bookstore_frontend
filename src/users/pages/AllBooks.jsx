import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { allBookApi } from '../../services/allApi'
import { Link } from 'react-router-dom'
import {searchKeyContext} from '../../context/Contextshare'

const AllBooks = () => {
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [tempAllBooks, setTempAllBooks] = useState([])

  const{searchKey,setSearchKey}=useContext(searchKeyContext)

  const getAllBooks = async (searchKey,tok) => {
    const reqHeader = {
      Authorization: `Bearer ${tok}`,
    }
    const result = await allBookApi(searchKey,reqHeader)

    console.log("API Result:", result)
    if (result.status === 200) {
      setAllBooks(result.data)
      setTempAllBooks(result.data)
    }
  }

  console.log(allBooks)

  const filter = (data) => {
    if (data === "no-filter") {
      setAllBooks(tempAllBooks)
    } else {
      setAllBooks(tempAllBooks.filter((item) => item.category?.toLowerCase() === data.toLowerCase()))
    }
  }

  useEffect(() => {
    const token1 = sessionStorage.getItem("token")
    if (token1) {
      setToken(token1)
      getAllBooks(searchKey,token1)
    }
  }, [searchKey])

  return (
    <>
      <Header />

      {token ? (
        <div>
          <div className="flex justify-center items-center flex-col">
            <h3 className="mt-10 text-2xl md:text-3xl font-semibold text-gray-800">
              Collections
            </h3>

            <div className="flex my-8 w-full justify-center items-center">
              <input
              value={searchKey}
              onChange={e=>setSearchKey(e.target.value)}
                type="text"
                placeholder="Search by Title"
                className="border border-gray-300 px-3 py-2 w-1/4 rounded-l-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-white hover:text-blue-600 hover:border-blue-600 border border-blue-600 transition">
                Search
              </button> */}
            </div>
          </div>

          <div className="md:grid grid-cols-[1fr_4fr] md:px-20 px-6 gap-10 mb-16">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-4">Filters</h1>
              <div className="space-y-3 text-gray-800">
                <label htmlFor="no-filter" className="flex items-center gap-2">
                  <input
                    id="no-filter"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("no-filter")}
                  />
                  All Categories
                </label>

                <label htmlFor="fiction" className="flex items-center gap-2">
                  <input
                    id="fiction"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("fiction")}
                  />
                  Literary Fiction
                </label>

                <label htmlFor="philosophy" className="flex items-center gap-2">
                  <input
                    id="philosophy"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("philosophy")}
                  />
                  Philosophy
                </label>

                <label htmlFor="romance" className="flex items-center gap-2">
                  <input
                    id="romance"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("romance")}
                  />
                  Romance
                </label>

                <label htmlFor="mystery" className="flex items-center gap-2">
                  <input
                    id="mystery"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("mystery")}
                  />
                  Mystery / Thriller
                </label>

                <label htmlFor="horror" className="flex items-center gap-2">
                  <input
                    id="horror"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("horror")}
                  />
                  Horror
                </label>

                <label htmlFor="biography" className="flex items-center gap-2">
                  <input
                    id="biography"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("Autobiography")}
                  />
                  AutoBiography
                </label>

                <label htmlFor="selfhelp" className="flex items-center gap-2">
                  <input
                    id="selfhelp"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("selfhelp")}
                  />
                  Self-Help
                </label>

                <label htmlFor="politics" className="flex items-center gap-2">
                  <input
                    id="politics"
                    type="radio"
                    name="filter"
                    className="accent-blue-600"
                    onClick={() => filter("politics")}
                  />
                  Politics
                </label>
              </div>
            </div>

            {/* ✅ Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allBooks?.length > 0 ? (
                allBooks.map((item) => (
                  <div
                    key={item._id} hidden={item?.status=="pending"||item?.status=="sold"}
                    className="bg-white shadow-md hover:shadow-lg transition rounded-md overflow-hidden"
                  >
                    <img
                      src={item?.imageurl}
                      alt="Book image"
                      className="w-full h-72 object-cover rounded-lg"
                    />
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-700">{item.author}</p>
                      <h4 className="font-medium text-base text-gray-900 mb-3">
                        {item.title}
                      </h4>
                      <Link to={`/view-book/${item?._id}`}>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-white hover:text-blue-600 border border-blue-600 transition">
                          View Book
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Books</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div></div>
          <div className="flex justify-center items-center flex-col w-full">
            <img
              src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
              alt=""
            />
            <p className="mt-3 text-2xl">
              Please{" "}
              <Link to={"/login"} className="text-red-500 underline">
                Login
              </Link>{" "}
              to explore more.....
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default AllBooks
