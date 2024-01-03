import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { VscError } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch } from "react-redux";
import { connect } from "../store/user/userSlice";
import axios from "axios";
import { app } from "../firebase";
export default function ProfileEdit() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();
  const refFocus = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  useEffect(() => {
    refFocus.current.focus();
  }, []);
  // Handle File Upload
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setForm({ ...form, avatar: downloadURL })
        );
      }
    );
  };
  // Handle change in form input
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  // Hanlde form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    if (Object.keys(form).length === 0) {
      ref.current.focus();
      setLoading(false);
      return;
    }
    const id = currentUser._id;
    try {
      const res = await axios.post(
        `/api/user/update/${id}`,
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setSuccess(true);
      dispatch(connect(data));
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="py-20 flex-1 max-w-[600px] ">
      {error && !success && (
        <div className=" bg-red-300 p-3 mb-8 text-red-700 font-semibold text-md flex items-center gap-2 capitalize">
          <div className="">
            <VscError className="text-2xl" />
          </div>

          {error}
        </div>
      )}
      {success && (
        <div className=" bg-green-300 p-3 mb-8 text-green-700 font-semibold text-md flex items-center gap-2 capitalize">
          <div className="">
            <FaCheckCircle className="text-2xl" />
          </div>
          Successfully Updated
        </div>
      )}
      <div className=" flex justify-center my-3">
        <div
          className="profilepic cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={form.avatar || currentUser.avatar}
            alt="avatar"
            className="profilepic__image"
          />
          <div className="profilepic__content">
            <span className="profilepic__icon">
              <MdAddAPhoto />
            </span>
            <span className="profilepic__text">Edit Profile</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8 ">
          Your Profile
        </h1>
      </div>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="">
          <label htmlFor="username" className="flex flex-col">
            <span className="text-myOrange"> Username:</span>
            <input
              ref={refFocus}
              required
              id="username"
              name="username"
              onChange={handleForm}
              defaultValue={currentUser.username}
              type="text"
              className="border p-2 focus:outline-myOtherGray"
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="email" className="flex flex-col">
            <span className=" text-myOrange">Email:</span>
            <input
              required
              onChange={handleForm}
              type="email"
              name="email"
              defaultValue={currentUser.email}
              id="email"
              className="border p-2 focus:outline-myOtherGray"
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="phoneNumber" className="flex flex-col">
            <span className=" text-myOrange">Phone Number:</span>
            <input
              required
              onChange={handleForm}
              type="phoneNumber"
              name="phoneNumber"
              defaultValue={currentUser.phoneNumber || "+000000000"}
              id="phoneNumber"
              className="border p-2 focus:outline-myOtherGray"
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="password" className="flex flex-col">
            <span className="text-myOrange">Password:</span>
            <input
              onChange={handleForm}
              type="password"
              id="password"
              name="password"
              defaultValue={currentUser.password}
              className="border p-2 focus:outline-myOtherGray"
            />
          </label>
        </div>
        <button
          disabled={loading}
          className="p-2 bg-myYellow text-white uppercase text-lg hover:opacity-80 disabled:opacity-55"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
