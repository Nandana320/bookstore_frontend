import React from 'react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../../components/Footer';
import AdminSideBar from '../components/AdminSideBar';
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, PieChart, Pie } from 'recharts';

const AdminHome = () => {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page E', uv: 1890, pv: 4800 },
    { name: 'Page F', uv: 2390, pv: 3800 },
    { name: 'Page G', uv: 3490, pv: 4300 },
  ];

  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
  ];

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr] min-h-screen bg-white">
        
        {/* Sidebar */}
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSideBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-start px-8 py-12 w-full">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

            <div className="bg-blue-800 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <span className="text-4xl mb-2">📘</span>
              <p className="text-lg">Total Number of Books</p>
              <p className="text-2xl font-bold mt-2">100+</p>
            </div>

            <div className="bg-green-800 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <span className="text-4xl mb-2">👥</span>
              <p className="text-lg">Total Number of Users</p>
              <p className="text-2xl font-bold mt-2">100+</p>
            </div>

            <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <span className="text-4xl mb-2">📘</span>
              <p className="text-lg">Total Number of Employees</p>
              <p className="text-2xl font-bold mt-2">100+</p>
            </div>

          </div>

          {/* CHARTS - SIDE BY SIDE */}
          <div className="w-full max-w-6xl mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full flex items-center justify-center h-[450px]">
              <PieChart width={400} height={400}>
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                />
                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={150}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminHome;
