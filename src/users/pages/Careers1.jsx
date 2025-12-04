import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

const Careers1 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />

      {/* PAGE CONTAINER */}
      <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center py-10 px-6 md:px-20">
        {/* CAREERS TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-4">Careers</h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-center max-w-4xl mb-10 text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione,
          officia delectus consequuntur, dicta libero magni omnis architecto
          voluptas culpa praesentium ipsum assumenda quae dolor, nihil rerum
          fugit expedita corrupti.
        </p>

        {/* CURRENT OPENINGS */}
        <div className="w-full md:w-3/4 mt-4">
          <h3 className="text-lg font-medium mb-4">Current Openings</h3>

          {/* SEARCH BAR */}
          <div className="flex justify-center mb-10">
            <div className="flex w-full md:w-1/2">
              <input
                type="text"
                placeholder="Job Title"
                className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none"
              />
              <button className="bg-green-700 text-white px-6 py-2 rounded-r-md hover:bg-green-800 transition">
                Search
              </button>
            </div>
          </div>

          {/* JOB CARD */}
          <div className="border border-gray-200 shadow-md rounded-md p-6 mb-12">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h4 className="text-lg font-medium">Job Title</h4>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
              >
                Apply
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            </div>

            <div className="space-y-1 text-sm md:text-base">
              <p className="flex items-center gap-2 text-gray-700">
                <FontAwesomeIcon icon={faLocationDot} className="text-blue-600" />
                <span>Kochi</span>
              </p>
              <p>Job Type: Senior Level</p>
              <p>Salary: 10 lakhs</p>
              <p>Qualification: M-Tech / B-Tech / BCA / MCA</p>
              <p>Experience: 5–7 years</p>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Description: Lorem Ipsum is simply dummy text of the printing and
                typesetting industry...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL - NO BLACK BACKGROUND */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 border border-gray-200 relative">
            {/* Modal Header */}
            <div className="bg-gray-900 p-4 flex sm:px-6 justify-between">
              <h3 className="text-white text-2xl">Application Form</h3>
              <FontAwesomeIcon icon={faXmark}
                className="text-white fa-2x"
                onClick={() => setShowModal(false)}
              />
               
            </div>

            {/* Modal Body */}
            <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-gray-400 p-2 rounded placeholder-gray-500 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Qualification"
                    className="border border-gray-400 p-2 rounded placeholder-gray-500 w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email Id"
                    className="border border-gray-400 p-2 rounded placeholder-gray-500 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="border border-gray-400 p-2 rounded placeholder-gray-500 w-full"
                  />
                </div>

                <textarea
                  placeholder="Cover Letter"
                  className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                ></textarea>

                <div>
                  <label className="block text-sm font-medium mb-1">Resume</label>
                  <input
                    type="file"
                    className="w-full text-sm border border-gray-300 rounded-md file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="reset"
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Careers1;