import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "../store/user/userSlice";
import { VscError } from "react-icons/vsc";
import axios from "axios";
import Oauth from "../components/Oauth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setGoogleError = (error) => {
    setError("Could not sign in with google: " + error);
  };
  // Handle change in form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("/api/auth/signin", JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = res;

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      dispatch(connect(data));
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center p-3">
      <div className="py-20 flex-1 max-w-[600px]">
        {error && (
          <div className=" bg-red-300 p-3 mb-8 text-red-700 font-semibold text-md flex items-center gap-2 capitalize">
            <div className="">
              <VscError className="text-2xl" />
            </div>

            {error}
          </div>
        )}
        <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8">
          Sign In
        </h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="email" className="flex flex-col">
              <span className=" text-myOrange">Email:</span>
              <input
                onChange={handleChange}
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
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="border p-2 focus:outline-myOtherGray"
              />
            </label>
          </div>
          <button
            disabled={loading}
            className="p-2 bg-myOrange text-white uppercase text-lg hover:opacity-80 disabled:opacity-55"
          >
            {loading ? "signing in..." : "Sign In"}
          </button>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>Don't have an account? </p>
              <Link className=" text-myYellow underline" to={"/sign-up"}>
                Sign Up
              </Link>
            </div>
            <Oauth error={setGoogleError} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
