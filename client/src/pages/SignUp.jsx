import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Oauth from "../components/Oauth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const setGoogleError = (error) => {
    setError("Could not sign in with google: " + error);
  };
  // Handle form changes
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await axios.post("/api/auth/signup", JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      console.log(data);
      if (data.success === "false") {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setSuccess(true);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className="flex justify-center items-center p-3">
      <div className="py-20 flex-1 max-w-[600px]">
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
        <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8">
          Sign Up
        </h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="username" className="flex flex-col">
              <span className="text-myOrange"> Username:</span>
              <input
                required
                id="username"
                name="username"
                onChange={handleForm}
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
                id="email"
                className="border p-2 focus:outline-myOtherGray"
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="password" className="flex flex-col">
              <span className="text-myOrange">Password:</span>
              <input
                required
                onChange={handleForm}
                type="password"
                id="password"
                className="border p-2 focus:outline-myOtherGray"
              />
            </label>
          </div>
          <button
            disabled={loading}
            className="p-2 bg-myOrange text-white uppercase text-lg hover:opacity-80 disabled:opacity-55"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className=" flex justify-between items-center">
            <div className="flex gap-2">
              <p>Already have an account? </p>
              <Link className=" text-myYellow underline" to={"/sign-in"}>
                Sign In
              </Link>
            </div>
            <Oauth error={setGoogleError} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
