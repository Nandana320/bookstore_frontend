import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateUserProfileApi } from "../../services/allApi";
import { toast, ToastContainer } from "react-toastify";
import { serverURL } from "../../services/serverURL";
import { userProfileUpdateStatusContext } from "../../context/Contextshare";

const EditProfile = () => {
  const [offCanvasStatus, setOffCanvasStatus] = useState(false);
  const [token, setToken] = useState("");

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: ""
  });

  const [existingImage, setExistingImage] = useState("");
  const [preview, setPreview] = useState("");

  const { setUserProfileUpdateStatus } = useContext(
    userProfileUpdateStatusContext
  );

  /* ---------------- Image change ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUserDetails({ ...userDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ---------------- Reset ---------------- */
  const handleReset = () => {
    const storedUser = sessionStorage.getItem("existingUser");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserDetails({
        username: user.username,
        password: user.password,
        cpassword: user.password,
        bio: user.bio,
        profile: ""
      });

      setExistingImage(user.profile);
      setPreview("");
    }
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    const { username, password, cpassword, bio, profile } = userDetails;

    if (!username || !password || !cpassword || !bio) {
      toast.info("Please fill all fields!");
      return;
    }

    if (password !== cpassword) {
      toast.warning("Passwords must match!");
      return;
    }

    let result;

    try {
      console.log("Preview:", preview);
      console.log("User Details:", userDetails);
      console.log("Token:", token);

      if (preview) {
        // New image selected
        const reqBody = new FormData();

        reqBody.append("username", username);
        reqBody.append("password", password);
        reqBody.append("bio", bio);
        reqBody.append("profile", profile); // must match backend field

        const reqHeader = {
          Authorization: `Bearer ${token}`
        };

        result = await updateUserProfileApi(reqBody, reqHeader);

      } else {
        // No new image
        const reqHeader = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        };

        result = await updateUserProfileApi(
          {
            username,
            password,
            bio,
            profile: existingImage
          },
          reqHeader
        );
      }

      console.log("API RESULT:", result);

      if (result && (result.status === 200 || result.status === 201)) {
        toast.success("Profile updated successfully!");

        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setUserProfileUpdateStatus(result.data);

        setOffCanvasStatus(false);
        handleReset();
      } else {
        toast.error(result?.response?.data?.message || "Something went wrong...");
      }

    } catch (error) {
      console.log("SERVER ERROR:", error);
      toast.error(error?.response?.data?.message || "Server Error!");
    }
  };

  /* ---------------- Load Session ---------------- */
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");

    if (storedToken && storedUser) {
      setToken(storedToken);

      const user = JSON.parse(storedUser);

      setUserDetails({
        username: user.username,
        password: user.password,
        cpassword: user.password,
        bio: user.bio,
        profile: ""
      });

      setExistingImage(user.profile);

    } else {
      console.log("Token or User not found in sessionStorage");
    }
  }, []);

  /* ---------------- Image Source ---------------- */
  const imageSrc = () => {
    if (preview) return preview;

    if (!existingImage)
      return "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg";

    if (
      typeof existingImage === "string" &&
      existingImage.startsWith("https://lh3.googleusercontent.com/")
    ) {
      return existingImage;
    }

    return `${serverURL}/uploads/${existingImage}`;
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={() => setOffCanvasStatus(true)}
        className="text-white bg-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        Edit Profile
      </button>

      {/* Side Panel */}
      {offCanvasStatus && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOffCanvasStatus(false)}
          />

          {/* Drawer */}
          <div className="relative bg-white w-96 h-full shadow-2xl left-0">

            {/* Header */}
            <div className="bg-gray-900 px-5 py-4 text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer hover:text-red-400 transition text-xl"
                onClick={() => setOffCanvasStatus(false)}
              />
            </div>

            {/* Form */}
            <div className="px-6 py-5 flex flex-col gap-5">

              {/* Profile Image */}
              <label htmlFor="imageFile" className="cursor-pointer self-center">
                <input
                  id="imageFile"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <img
  referrerPolicy="no-referrer"
  src={
    preview
      ? preview
      : typeof existingImage === "string" &&
        existingImage.startsWith("https://lh3.googleusercontent.com/")
        ? existingImage + "?sz=400"
        : existingImage
        ? `${serverURL}/uploads/${existingImage}?t=${new Date().getTime()}`
        : "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg"
  }
  alt="avatar"
  className="w-36 h-36 border-4 border-gray-200 rounded-full shadow-md hover:opacity-70 transition object-cover"
/>


              </label>

              {/* Inputs */}
              <input
                type="text"
                placeholder="Username"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                placeholder="New Password"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                value={userDetails.cpassword}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, cpassword: e.target.value })
                }
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                rows="4"
                value={userDetails.bio}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, bio: e.target.value })
                }
                placeholder="Write a short bio..."
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              {/* Buttons in SAME ROW */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow"
                >
                  Submit
                </button>

                <button
                  onClick={handleReset}
                  className="w-1/2 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition shadow"
                >
                  Reset
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
};

export default EditProfile;
