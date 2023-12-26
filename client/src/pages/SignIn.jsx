import React from "react";
import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <section className="flex justify-center items-center p-3">
      <div className="py-20 flex-1 max-w-[600px]">
        <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8">
          Sign In
        </h1>
        <form action="" className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="" className="flex flex-col">
              <span className=" text-myOrange">Email:</span>
              <input
                type="email"
                name="email"
                id="email"
                className="border p-2 focus:outline-myOtherGray"
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="" className="flex flex-col">
              <span className="text-myOrange">Password:</span>
              <input
                type="password"
                id="password"
                className="border p-2 focus:outline-myOtherGray"
              />
            </label>
          </div>
          <button className="p-2 bg-myOrange text-white uppercase text-lg hover:opacity-80 disabled:opacity-55">
            Sign In
          </button>
          <div className="flex gap-2">
            <p>Don't have an account? </p>
            <Link className=" text-myYellow underline" to={"/sign-up"}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
