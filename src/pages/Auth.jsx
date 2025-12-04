import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../users/components/Header'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Auth = ({ register }) => {

  // state for fetch data
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("please fill the form completly")
    } else {
      const result = await registerAPI({ username, email, password, profile: "" })
      console.log(result);
      if (result.status == 200) {
        toast.success("register successful..")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""

        })
      }

    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("please fill the form completly")
    } else {
      const result = await loginAPI({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success("Login Sucessfull...")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.email == "bookadmin@gmail.com") {
            navigate("/admin-home")
          } else {
            navigate("/")
          }
        }, 2500)
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else if (result.status == 401) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("Something Went Wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }


    }

  }

  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    console.log(details);

    const result = await googleLoginAPI({
      username: details.name,
      email: details.email,
      password: "google-auth-user",
      profile: details.picture
    });

    console.log(result);

    if (result.status == 200) {
      toast.success("Login Successfully...");
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
      sessionStorage.setItem("token", result.data.token);

      setTimeout(() => {
        if (result.data.existingUser.email == "bookadmin@gmail.com") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      }, 2500);
    } else {
      toast.error("something went wrong");
    }
  };


  return (
    <>
      <Header />
      <div id='authPage' className='mb-5'>
        <div className='md:grid grid-cols-3'>
          <div></div>
          <div className='flex justify-center items-center flex-col'>
            <h1 className='my-5 text-3xl text-bold'>BOOK STORE</h1>
            <form className='w-full bg-gray-900 p-10 flex justify-center items-center flex-col rounded my-4'>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-white flex justify-center items-center'>
                <FontAwesomeIcon icon={faUser} className="text-white fa-2x" />
              </div>
              {register ? <h1 className='text-white mt-6 text-3xl'>Register</h1> :
                <h1 className='text-white mt-6 text-3xl'>Login</h1>
              }           {register && <div className='mb-3 w-full mt-4'>




                <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}

                  type="text" placeholder='User Name' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
              </div>}

              <div className='mb-3 w-full mt-4'>
                <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}

                  type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
              </div>

              <div className='mb-3 w-full mt-4'>
                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}

                  type="text" placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
              </div>

              <div className='mb-5 w-full flex justify-between'>
                <p className='text-amber-300' style={{ fontSize: '10px' }}>*Never Share Your Password With Others</p>
                {
                  !register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forgot Password</p>
                }
              </div>

              <div className='mb-2 w-full'>
                {register ?
                  <button type='button' onClick={handleRegister} className='bg-green-800 text-white w-full p-3 rounded'>Register</button> :
                  <button type='button' onClick={handleLogin} className='bg-green-800 text-white w-full p-3 rounded'>Login</button>

                }            </div>
              {
                !register && <p className='text-white'>------------------or------------------</p>
              }
              {!register && <div className='mb-2 mt-3 w-full flex justify-center items-center'>
                {/* <button className='bg-white text-black w-full p-3 rounded'>Sign in with Google</button> */}
                <GoogleLogin width={"250px"}
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse);

                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </div>}
              {
                register ?

                  <p className='text-white'>Already a user?<Link to={'/login'}> Login..</Link></p> :
                  <p className='text-white'>Are you a new user?<Link to={'/register'}> Register..</Link></p>


              }
            </form>
          </div>
        </div>


      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

      <Footer />
    </>
  )
}

export default Auth