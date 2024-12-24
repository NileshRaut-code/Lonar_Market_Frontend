import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateProfile,
  updateProfileimage,
  updateuserpassword,
} from "../../utils/userutils";
import { CiEdit } from "react-icons/ci";


export const Profile = () => {
  const data = useSelector((store) => store.user.data);
  const [edit, setedit] = useState(false);
  const email = useRef(null);
  const fullName = useRef(null);
  const phoneno = useRef(null);

  const newPassword = useRef(null);
  const oldPassword = useRef(null);
  const confirmPassword = useRef(null);
  const [err, seterr] = useState(null);
  const [errp, seterrp] = useState(null);

  const [profileimage, setprofileimage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.avatar);
  const productImage = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleupdateprofile = () => {
    const body = {
      email: email.current.value || data.email,
      fullName: fullName.current.value || data.fullName,
      phoneno: phoneno.current.value || data.phoneno,
    };
    updateProfile(body, seterr);
  };

  const handleupdateprofileimage = () => {
    if (!productImage.current.files[0]) {
      seterr("To update Avatar Image is required");
      return;
    }
    const body = new FormData();
    body.append("productImage", productImage.current.files[0]);
    updateProfileimage(body, seterr);
  };

  const handleupdatepassword = () => {
    if (
      !oldPassword.current.value ||
      !newPassword.current.value ||
      !confirmPassword.current.value
    ) {
      seterrp("All fields should be filled properly");
      return;
    }
    if (newPassword.current.value !== confirmPassword.current.value) {
      seterrp("New password and Confirm Password do not match");
      return;
    }
    const body = {
      newPassword: newPassword.current.value,
      oldPassword: oldPassword.current.value,
    };
    updateuserpassword(body, seterrp);
  };

  if (profileimage) {
    return (
      <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">
            Update Avatar
          </h1>
          {selectedImage && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Selected Image:
              </label>
              <img
                src={selectedImage}
                alt="Selected"
                className="mt-2 p-2 border rounded-md bg-gray-300 w-32 h-32 object-cover"
              />
            </div>
          )}
          <input
            id="image"
            type="file"
            className="bg-gray-100 p-2 rounded-md"
            ref={productImage}
            onChange={handleImageChange}
          />
          {err && (
            <p className="mt-4 text-sm text-red-800 bg-red-100 p-3 rounded-md">
              {err}
            </p>
          )}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleupdateprofileimage}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setprofileimage(false);
                seterr(null);
                seterrp(null);
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
            >
              Go Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (edit) {
    return (
      <>
        <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col justify-center items-center">
          <div className="m-5 p-5 bg-white rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl text-gray-800 font-semibold mb-4">
              Update Profile
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="New Name"
                id="fullName"
                ref={fullName}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="New Email"
                id="email"
                ref={email}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone No
              </label>
              <input
                type="number"
                placeholder="New Phone No"
                name="phoneno"
                id="phoneno"
                ref={phoneno}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            {err && (
              <p className="mt-4 text-sm text-red-800 bg-red-100 p-3 rounded-md">
                {err}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleupdateprofile}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setedit(false);
                  seterr(null);
                  seterrp(null);
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
              >
                Go Profile
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 flex flex-col justify-center items-center">
          <div className="m-5 p-5 bg-white rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl text-gray-800 font-semibold mb-4">
              Update Password
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Old Password
              </label>
              <input
                type="text"
                name="oldPassword"
                placeholder="Old Password"
                id="oldPassword"
                ref={oldPassword}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                placeholder="New Password"
                id="newPassword"
                ref={newPassword}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                ref={confirmPassword}
                className="bg-gray-100 p-3 w-full rounded-md border-0 focus:ring-2 focus:ring-teal-600"
              />
            </div>
            {errp && (
              <p className="mt-4 text-sm text-red-800 bg-red-100 p-3 rounded-md">
                {errp}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleupdatepassword}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-w-[70vw] mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 ">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Profile</h1>

      <div className="m-5 p-8 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row relative">
        {/* Edit Icon */}
        <button
          className="absolute top-4 right-4 p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
          onClick={() => setedit(true)}
        >
          <CiEdit/>
        </button>

        {/* Left Column - User Info */}
        <div className="flex flex-col items-center sm:w-1/3 sm:mr-6 mb-6 sm:mb-0">
          <img
            src={data.avatar || "default-avatar-url"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg transition-transform duration-200 hover:scale-105"
          />
          <button
            className="mt-4 text-sm text-teal-600 hover:text-teal-700"
            onClick={() => setprofileimage(true)}
          >
            Change Avatar
          </button>
        </div>

        {/* Right Column - Form Fields */}
        <div className="flex flex-col sm:w-2/3">
          <div className="mb-4 flex items-center">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600 w-1/3"
            >
              First Name
            </label>
            <p className="mt-2 text-lg text-gray-800 w-2/3 break-words">
              {data.fullName || "Some address example"}
            </p>
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600 w-1/3"
            >
              Last Name
            </label>
            <p className="mt-2 text-lg text-gray-800 w-2/3 break-words">
              {data.email || "Some address example"}
            </p>
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-600 w-1/3"
            >
              Address
            </label>
            <p className="mt-2 text-lg text-gray-800 w-2/3 break-words">
              {data.phoneno || "Some address example"}
            </p>
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-600 w-1/3"
            >
              Address
            </label>
            <p className="mt-2 text-lg text-gray-800 w-2/3 break-words">
  {(data.address || 
    `Pune, Maharashtra
    District: Pune
    Pin Code: 411001
    India`)
    .split("\n")
    .map((line, index) => (
      <span key={index}>
        {line}
        <br /> {/* This will create a new line */}
      </span>
    ))}
</p>

          </div>
        </div>
      </div>
    </div>
  );
};
