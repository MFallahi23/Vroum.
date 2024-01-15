import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import { useMediaQuery } from "react-responsive";
export default function ProfilePosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width:639px)` });
  const [changed, setChanged] = useState(true);
  // Get user car publication
  const fetchCars = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`/api/user/getcars/${currentUser._id}`);
      const { data } = res;
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setCars(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Delete car publication
  const deleteCar = async (id) => {
    try {
      console.log("start");
      const res = await axios.delete(`/api/car/delete/${id}`);
      console.log("hey");
      const { data } = res;
      if (data.success === false) {
        setError(data.message);
        return;
      }
      console.log("top");
      setCars((prev) => prev.filter((car) => car._id !== id));

      console.log("bottom");
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="flex-1 max-w-[800px]">
      <div className="flex flex-col my-20 sm:my-8 gap-2">
        <div className="flex justify-center">
          <h1 className="sign-up-title text-4xl font-semibold pb-2 mb-8 ">
            Your Posts
          </h1>
        </div>
        <div className="flex justify-between p-3">
          <button
            onClick={() => (edit ? setEdit(false) : setEdit(true))}
            className={`  p-2 px-6 rounded-lg flex items-center gap-2   transition hover:opacity-70 ${
              edit
                ? "bg-transparent border-2 border-green-500 text-green-500"
                : "bg-myYellow text-orange-700"
            }`}
          >
            <div className="text-2xl">
              {edit ? <FaCheck /> : <FaEdit className="" />}
            </div>
            <span>{edit ? "Done" : "Edit"}</span>
          </button>
          <Link
            to={"/create-post"}
            className=" bg-green-200 p-2 px-4 flex items-center gap-2 rounded-lg text-green-700  transition hover:opacity-70"
          >
            <div className="text-3xl">
              <CiCirclePlus className="" />
            </div>
            <span>Create</span>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center ">Loading...</div>
        ) : (
          <div className="flex flex-col mt-3 gap-5">
            {cars &&
              cars.map((car) => (
                <div
                  className="flex  flex-col sm:flex-row border rounded-lg items-center  justify-between"
                  key={car._id}
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <img
                      src={car.imageUrls[0]}
                      alt="cover of publication"
                      className=" w-full   sm:w-36 sm:h-36 rounded-lg"
                    />
                    <div className="flex flex-col gap-1 sm:max-w-[200px] md:max-w-[300px] lg:max-w-[500px] p-2">
                      <div className="flex items-center gap-2">
                        <h1 className="text-3xl capitalize truncate font-semibold  text-myBlack">
                          {car.title}
                        </h1>
                        <span className="border rounded-full bg-slate-100 text-xs p-1 text-myYellow">
                          {" "}
                          {car.type}
                        </span>
                      </div>
                      <p className=" text-slate-700 text-sm max-h-[40px] overflow-scroll">
                        {car.description}
                      </p>
                      <p className="text-2xl mt-2">
                        {car.type === "rent"
                          ? `${car.price} $/month`
                          : `${car.price} $`}
                      </p>
                    </div>
                  </div>

                  {edit ? (
                    <Link
                      to={`/update-post/${car._id}`}
                      className="w-full sm:w-auto p-3"
                    >
                      <button className="p-3 mr-2 rounded-md bg-myYellow text-orange-700 flex items-center w-full justify-center hover:opacity-55 gap-2">
                        <FaEdit className="text-xl" />
                        {isMobile ? <span>Edit </span> : ""}
                      </button>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 w-full sm:w-auto gap-2">
                      <Link
                        to={`/car/${car._id}`}
                        className="w-full sm:w-20 sm:p-3"
                      >
                        <button className="border p-3 mr-2 rounded-md bg-slate-200 hover:opacity-55 w-full flex justify-center items-center gap-2">
                          <FaEye className="text-xl" />
                          {isMobile ? <span>View</span> : ""}
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteCar(car._id)}
                        className="w-full sm:w-14 p-3 rounded-md flex items-center justify-center  bg-red-100 text-red-500 gap-2"
                      >
                        <MdDelete className=" text-xl" />
                        {isMobile ? <span>Delete</span> : ""}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            {cars.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <h1 className="text-xl">You have not posted yet!</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
