import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { VscError } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfileEdit() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);
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
          Successfully registred
        </div>
      )}
      <div className="flex justify-center my-3">
        <img
          src={currentUser.avatar}
          alt=""
          className=" rounded-full h-[100px] w-[100px]"
        />
      </div>
      <div className="flex justify-center">
        <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8 ">
          Your Profile
        </h1>
      </div>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="username" className="flex flex-col">
            <span className="text-myOrange"> Username:</span>
            <input
              ref={ref}
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
