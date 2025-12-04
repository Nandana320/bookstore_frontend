import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { updateProfileApi } from "../../services/allApi";
import { serverURL } from "../../services/serverURL";
import {adminProfileUpdateStatusContext} from '../../context/Contextshare'


const AdminSettings = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  });

  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [existingProfileImage, setExistingProfileImage] = useState("");
  const [updateStatus, setUpdateStatus] = useState({});
  const{setAdminProfileUpdateStatus}=useContext(adminProfileUpdateStatusContext)

  // Load stored user details
  useEffect(() => {
    const tokenData = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");

    if (tokenData && storedUser) {
      setToken(tokenData);

      let user = {};
      try {
        user = JSON.parse(storedUser);
      } catch (err) {
        console.log("Invalid user JSON");
        return;
      }

      setAdminDetails({
        username: user.username || "",
        password: user.password || "",
        cPassword: user.password || "",
        profile: "" // keep preview separate
      });

      setExistingProfileImage(user.profile || "");
    }
  }, [updateStatus]);

  // Handle file upload preview
  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminDetails({ ...adminDetails, profile: file });
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleReset = () => {
     const tokenData = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");

    if (tokenData && storedUser) {
      setToken(tokenData);

      let user = {};
      try {
        user = JSON.parse(storedUser);
      } catch (err) {
        console.log("Invalid user JSON");
        return;
      }

      setAdminDetails({
        username: user.username || "",
        password: user.password || "",
        cPassword: user.password || "",
        profile: "" // keep preview separate
      });

      setExistingProfileImage(user.profile || "");
    }
    setPreview("")
  };

  const handleAdd = async () => {
    const { username, password, cPassword, profile } = adminDetails;

    if (!username || !password || !cPassword) {
      toast.info("Please fill all fields!");
      return;
    }

    if (password !== cPassword) {
      toast.warning("Passwords must match!");
      return;
    }

    let result;

    if (preview) {
      // If a new profile image is selected
      const reqBody = new FormData();
      for (let key in adminDetails) {
        reqBody.append(key, adminDetails[key]);
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      result = await updateProfileApi(reqBody, reqHeader);
    } else {
      // No new image selected
      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      result = await updateProfileApi(
        { username, password, profile: existingProfileImage },
        reqHeader
      );
    }

    if (result.status === 200) {
      toast.success("Profile updated successfully!");
      sessionStorage.setItem("existingUser", JSON.stringify(result.data));
      setUpdateStatus(result.data);
      setAdminProfileUpdateStatus(result.data)
      setPreview(""); // clear preview
    } else {
      toast.error("Something went wrong...");
      setUpdateStatus(result);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr] min-h-screen">
        <div className="bg-blue-100 flex flex-col items-center py-8">
          <AdminSideBar />
        </div>

        <div className="p-10">
          <h1 className="text-3xl font-semibold mb-6 text-center">Settings</h1>

          <div className="grid grid-cols-2 gap-10">
            {/* LEFT TEXT */}
            <div className="space-y-6 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Perspiciatis id maxime quia asperiores in cupiditate voluptatum.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Blanditiis soluta fuga aut?
              </p>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-blue-100 p-8 rounded-lg shadow-md flex flex-col items-center text-center">

              {/* IMAGE PREVIEW FIXED */}
              <div className="relative mb-6">
                <img
                  src={
                    preview
                      ? preview
                      : existingProfileImage && existingProfileImage !== ""
                      ? `${serverURL}/uploads/${existingProfileImage}`
                      : "https://cdn-icons-png.flaticon.com/512/666/666201.png"
                  }
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover border"
                />

                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  onChange={handleAddFile}
                />

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-2 bg-yellow-400 p-2 rounded-full cursor-pointer"
                >
                  ✏
                </label>
              </div>

              {/* FORM */}
              <form className="w-full space-y-4 mt-4">
                <input
                  value={adminDetails.username}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, username: e.target.value })
                  }
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                />

                <input
                  value={adminDetails.password}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, password: e.target.value })
                  }
                  type="text"
                  placeholder="Password"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                />

                <input
                  value={adminDetails.cPassword}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, cPassword: e.target.value })
                  }
                  type="text"
                  placeholder="Confirm Password"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                />

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default AdminSettings;
