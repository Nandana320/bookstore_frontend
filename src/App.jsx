import { Route, Routes } from "react-router-dom"
import Home from "./users/pages/Home"
import PagenotFound from "./pages/PagenotFound"
import Auth from "./pages/Auth"
import Preloader from "./components/Preloader"
import { Profiler, useEffect, useState } from "react"
import AllBooks from "./users/pages/AllBooks"
import Careers1 from "./users/pages/Careers1"
import Contact from "./users/pages/Contact"
import Profile1 from "./users/pages/Profile1"
import AdminHome from "./admin/pages/AdminHome"
import AdminBooks from "./admin/pages/AdminBooks"
import AdminCareers from "./admin/pages/AdminCareers"
import AdminSettings from "./admin/pages/AdminSettings"
import ViewBook from "./users/pages/ViewBook"
import PaymentSuccess1 from "./users/pages/PaymentSuccess1"
import PaymentError1 from "./users/pages/PaymentError1"

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 7000);
  })

  return (
    <>

      <Routes>
        <Route path="/" element={isLoading ? <Preloader /> : <Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/all-books" element={<AllBooks />} />
        {/* <Route path="/careers" element={<Careers1 />} /> */}
        <Route path="/profile" element={<Profile1 />} />
        <Route path="/view-book/:id" element={<ViewBook />} />
        <Route path="/payment-success" element={< PaymentSuccess1 />} />
        <Route path="/payment-error" element={< PaymentError1 />} />




        <Route path="/contact" element={<Contact />} />

        <Route path="/admin-home" element={isLoading ? <Preloader /> : <AdminHome />} />
        <Route path="/admin-books" element={<AdminBooks />} />
        {/* <Route path="/admin-careers" element={<AdminCareers />} /> */}
        <Route path="/admin-settings" element={<AdminSettings />} />




        <Route path="/*" element={<PagenotFound />} />


      </Routes>

    </>
  )
}

export default App