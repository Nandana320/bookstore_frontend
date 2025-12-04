import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const PaymentError1 = () => {
  return (
    <>

     <>
            <Header />
            <div className='container my-10'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
                    <div >
                        <h1 className='md:text-4xl text-red-500'>Sorry Your payment is unsuccesfull</h1>
                        <p>We apologised for the inconvinience</p>
                        <Link to={'/all-books'}>
                            {" "}
                            <button className='bg-red-600 px-4 py-3 text-white my-5'><FontAwesomeIcon icon={faBackward} />Explore more books
                            </button>
                            </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt6-9XeD06SB1f3WYTAz9vpc4p3HDhSNzs0Q&s" alt="Thankuu" className='w-full' />
                    </div>

                </div>
            </div>

            <Footer />



        </>
    </>
  )
}

export default PaymentError1