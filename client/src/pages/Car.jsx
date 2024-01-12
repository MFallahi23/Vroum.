import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

import axios from "axios";
import Contact from "../components/Contact";

const Car = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showContact, setShowContact] = useState(false);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const navigate = useNavigate();

  // Get user car publication
  const fetchCars = async () => {
    setLoading(true);
    setError(false);
    try {
      const carId = params.id;
      const res = await axios.get(`/api/car/${carId}`);
      const { data } = res;
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setCar(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [params.id]);
  return (
    <section className="my-16">
      <div className=" ">
        {loading ? (
          <div className="">Loading...</div>
        ) : car ? (
          <div className="flex flex-col  gap-5 max-w-[800px] mx-auto">
            <Swiper navigation className=" w-full sm:w-[400px]">
              {car.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <img
                    className="h-[300px] w-full min-w-[400px] rounded-md"
                    src={url}
                    alt="images of the car"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="p-3">
              <div className="flex flex-col">
                <h1 className="text-5xl capitalize mb-2">{car.title}</h1>
                <span className="border rounded-full p-1 text-myYellow self-start bg-slate-50">
                  {car.type}
                </span>
              </div>
              <p className="mt-2">
                <span className="font-semibold text-xl">city:</span> {car.city}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Description: </span>
                {car.description}
              </p>
              <p
                onClick={() =>
                  showDetails ? setShowDetails(false) : setShowDetails(true)
                }
                className="flex items-center gap-1 text-blue-600 mt-3 w-32 cursor-pointer"
              >
                show details
                <span>
                  <IoIosArrowDown />
                </span>
              </p>
              {showDetails && (
                <div className="mt-2 flex flex-col gap-2">
                  <p>
                    <span className=" font-semibold">Model: </span>{" "}
                    {car.carModel}
                  </p>
                  <p>
                    <span className=" font-semibold">Fuel: </span>{" "}
                    {car.fuelType}
                  </p>
                  <p>
                    <span className=" font-semibold">Engine: </span>{" "}
                    {car.engine}
                  </p>
                  <p>
                    <span className=" font-semibold">Transmission: </span>{" "}
                    {car.Transmission}
                  </p>
                  <p>
                    <span className=" font-semibold">Color: </span> color
                  </p>
                </div>
              )}
              <div className=" text-3xl text-slate-700 font-semibold mt-5">
                {car.type === "sale" && `${car.price} $`}
                {car.type === "rent" && `${car.price} $/month`}
              </div>
              <div
                onClick={() => {
                  if (currentUser !== null) {
                    showContact ? setShowContact(false) : setShowContact(true);
                  } else {
                    navigate("/sign-up");
                  }
                }}
                className="mt-3 bg-myYellow p-2 text-center capitalize text-white text-xl rounded-lg hover:opacity-55 cursor-pointer"
              >
                Contact Owner
              </div>
              {showContact && <Contact car={car} />}
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </section>
  );
};

export default Car;
