import React from 'react'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-3'></div>
                <div></div>
                <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                    <img src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif" alt="oops..." />
                    <p>Oh No !</p>
                    <h2 className='md:text-5xl text-2xl'>Look Like You're Lost</h2>
                    <h5>The page you are looking for is not available</h5>
                    <Link to={"/"}>
                        <button className='mt-4 px-4 py-3 bg-blue-800 text-white rounded hover:border hover:border-blue-800 hover:bg-white hover:text-blue-800'>Back Home</button>

                    </Link>{" "}
                </div>
            </div>

        </>
    )
}

export default PagenotFound