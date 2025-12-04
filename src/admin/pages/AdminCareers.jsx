import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../../components/Footer";

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState("jobpost");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Job Posted:", formData);
    alert("Job Posted Successfully!");
    setShowModal(false);
    setFormData({
      title: "",
      location: "",
      jobType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: "",
    });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      location: "",
      jobType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-blue-100 flex flex-col items-center py-4">
          <AdminSideBar />
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-4 mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Careers</h1>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setActiveTab("jobpost")}
                className={`px-4 py-2 rounded border ${
                  activeTab === "jobpost"
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-blue-700 border-blue-700"
                }`}
              >
                Job Post
              </button>
              <button
                onClick={() => setActiveTab("viewapplicant")}
                className={`px-4 py-2 rounded border ${
                  activeTab === "viewapplicant"
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-blue-700 border-blue-700"
                }`}
              >
                View Applicant
              </button>
            </div>
          </div>

          {/* JOB POST PAGE */}
          {activeTab === "jobpost" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search By Title"
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                  />
                  <button className="bg-blue-700 text-white px-4 py-2 rounded">
                    Search
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Job +
                </button>
              </div>

              {/* Example Job Card */}
              <div className="bg-white p-5 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">Manager</h2>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
                <hr className="my-2" />
                <div className="text-gray-700 space-y-1">
                  <p className="flex items-center gap-2 text-blue-700">
                    <FontAwesomeIcon icon={faLocationDot} /> Ernakulam
                  </p>
                  <p>Job Type: Full Time</p>
                  <p>Salary: 20000 - 40000</p>
                  <p>Qualification: MBA</p>
                  <p>Experience: 1 year</p>
                  <p>
                    Description: Team leadership. Hire, train, coach, and
                    motivate employees to achieve objectives. Provide feedback,
                    resolve conflicts, and manage performance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW APPLICANT PAGE */}
          {activeTab === "viewapplicant" && (
            <div className="bg-white p-5 rounded-lg shadow overflow-x-auto">
              <table className="w-full border border-gray-300 text-center">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-3 border">Sl</th>
                    <th className="py-2 px-3 border">Job Title</th>
                    <th className="py-2 px-3 border">Name</th>
                    <th className="py-2 px-3 border">Qualification</th>
                    <th className="py-2 px-3 border">Email</th>
                    <th className="py-2 px-3 border">Phone</th>
                    <th className="py-2 px-3 border">Cover Letter</th>
                    <th className="py-2 px-3 border">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">1</td>
                    <td className="border px-3 py-2">Manager</td>
                    <td className="border px-3 py-2">John Doe</td>
                    <td className="border px-3 py-2">MBA</td>
                    <td className="border px-3 py-2">john@example.com</td>
                    <td className="border px-3 py-2">9876543210</td>
                    <td className="border px-3 py-2">
                      Excellent leadership skills
                    </td>
                    <td className="border px-3 py-2 text-blue-600 underline cursor-pointer">
                      resume
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ADD JOB MODAL (with blur background and smooth animation) */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] p-6 relative transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Add New Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="jobType"
                placeholder="Job Type (e.g., Full Time)"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary Range"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 h-24"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition-all"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminCareers;