import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const Contact = () => {
  return (
    <>
    <Header/>
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold mb-3">Contacts</h2>
          <p className="text-sm text-gray-600 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione, officia delectus
            consequuntur, dicta libero magni omnis architecto voluptas culpa praesentium ipsum assumenda.
          </p>
    
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 mb-12">
            <div>
              <p className="font-medium">📍 123 Main Street, Apt 4B</p>
              <p className="text-gray-600 text-sm">Anytown, CA 91234</p>
            </div>
            <div>
              <p className="font-medium">📞 +91 9874561230</p>
            </div>
            <div>
              <p className="font-medium">📧 Bookstore@gmail.com</p>
            </div>
          </div>
    
          {/* Form and Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-100 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-4">Send me a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                />
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white rounded-md py-2 text-sm hover:bg-gray-700"
                >
                  Send
                </button>
              </form>
            </div>
    
            {/* Google Map */}
            <div>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.123456789012!2d76.267!3d9.993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d6c!2sKochi!5e0!3m2!1sen!2sin!4v1650000000000"
                className="w-full h-80 border-0 rounded-lg"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Contact