import React from 'react'

const Preloader = () => {
  return (
    <>
     <div className='w-full h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-3'></div>
                <div></div>
                <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                    <img src="https://i.pinimg.com/originals/f6/06/cb/f606cbf26c0a18898b96ef6857953a75.gif" alt="OOps..." />
                    
                </div>
            </div>
       
      
    </>
  )
}

export default Preloader
