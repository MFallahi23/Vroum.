import React, { useEffect, useState } from "react";
import image1 from "../assets/undraw_electric_car_b-7-hl.svg";
import image2 from "../assets/pngwing.com.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiCartwheel } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { BsEmojiGrin } from "react-icons/bs";
import { FiCoffee } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";

import axios from "axios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CarItem from "../components/CarItem";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const [rentCars, setRentCars] = useState([]);
  const [saleCars, setSaleCars] = useState([]);
  const [cars, setCars] = useState("sale");
  const isMobile = useMediaQuery({ query: `(max-width:400px)` });

  console.log(saleCars);
  // Get sale cars
  const getSale = async () => {
    try {
      const res = await axios.get("/api/car/get?type=sale&limit=5");
      const { data } = res;
      setSaleCars(data);
      getRent();
    } catch (error) {
      console.log(error);
    }
  };
  // Get rent cars
  const getRent = async () => {
    try {
      const res = await axios.get("/api/car/get?type=rent&limit=5");
      const { data } = res;
      setRentCars(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSale();
  }, []);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="my-10">
      <section className="p-3 flex flex-col gap-10 lg:flex-row items-center max-w-[1200px] mx-auto">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <p className="flex items-center gap-1 text-myOrange text-md capitalize font-semibold">
              <span className="beforeLine"></span>Welcome to vroum
            </p>
            <h1 className="text-5xl font-bold">
              Find the best quality <br />
              <span className=" "> cars with us</span>
            </h1>
            <p className=" text-sm text-slate-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint qui
              dolores voluptatem dolorem deserunt itaque, vitae expedita
              quibusdam iste at fugiat rerum impedit assumenda quisquam placeat!
              Sed tenetur voluptates velit!
            </p>
            <div className="flex flex-col sm:flex-row text-center gap-6 mt-4">
              <Link
                to={"/search"}
                className="orangeButton  bg-myOrange text-white p-2 px-6 rounded-lg"
              >
                Find your car
              </Link>
              <Link
                to={currentUser ? "/profile/posts" : "/sign-in"}
                className="border border-myOrange p-2 px-6 rounded-lg text-myOrange"
              >
                Sell your car
              </Link>
            </div>
          </div>
        </div>
        <img src={image1} alt="car cover" className=" sm:max-w-[500px]" />
      </section>
      <section className="mt-20">
        <div className="flex flex-col items-center gap-3 max-w-[1000px] mx-auto">
          <p className=" text-myOrange font-semibold">How it works</p>
          <h2 className="text-3xl font-bold">Our working steps</h2>
          <div className="flex items-center gap-2">
            <div className="beforeWheel"></div>
            <div className="text-myOrange text-lg">
              <GiCartwheel />
            </div>
            <div className="afterWheel"></div>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 md:gap-32 md:flex-row mt-10">
            <div className="flex flex-col items-center  gap-4 text-center firstBox">
              <div className="w-24 h-24 bg-myOrangeWhite border-white border-4 shadow-lg rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-xl text-myOrange" />
              </div>{" "}
              <h3 className="text-xl font-bold">Choose location</h3>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                eligendi nisi quos nesciunt libero ullam!
              </p>
            </div>
            <div className="flex flex-col items-center  gap-4 text-center secondBox">
              <div className="w-24 h-24 bg-myOrange shadow-lg rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-xl text-white" />
              </div>
              <h3 className="text-xl font-bold">Pick-Up Date</h3>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                eligendi nisi quos nesciunt libero ullam!
              </p>
            </div>
            <div className="flex flex-col items-center  gap-4 text-center">
              <div className="w-24 h-24 bg-myOrangeWhite border-white border-4 shadow-lg rounded-lg flex items-center justify-center">
                <FaCar className="text-xl text-myOrange" />
              </div>
              <h3 className="text-xl font-bold">Book Your Car</h3>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                eligendi nisi quos nesciunt libero ullam!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-32 bg-myGray">
        <div className="flex flex-col max-w-[1200px] mx-auto  p-10 md:flex-row gap-5 py-20 pb-40">
          <img
            src={image2}
            alt="photo of car"
            className="mt-10 max-w-[500px]"
          />
          <div className="flex flex-col gap-2">
            <p className=" text-myOrange font-semibold">About us</p>
            <h2 className="text-3xl font-bold capitalize">
              Feel the best rental experience <br /> with our deals
            </h2>
            <div className="flex items-center gap-2">
              <div className="text-myOrange ">
                <GiCartwheel className=" text-xl" />
              </div>
              <div className="afterWheel"></div>
            </div>
            <p className="mt-8 text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iste
              animi ea libero quae adipisci officia molestiae illum laudantium,
              deleniti ipsum voluptates nemo minima tempora accusantium unde
              cumque nostrum ducimus quas, architecto quibusdam aspernatur! Sint
              corrupti aperiam nisi porro saepe! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Fugiat ullam illo enim iste ad porro
              veniam tempore perspiciatis hic pariatur?
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-8 max-w-[200px] -translate-y-20  justify-around mx-auto md:max-w-[800px] md:flex-row md:-translate-y-1/2">
          <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-md flex-1">
            <div className="">
              <BsEmojiGrin className=" text-5xl text-myOrange" />
            </div>
            <h2 className="text-3xl font-bold mt-1">4784+</h2>
            <p className=" text-xs ">Happy Clients</p>
          </div>
          <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-md flex-1">
            <div className="">
              <FiCoffee className=" text-5xl text-myOrange" />
            </div>
            <h2 className="text-3xl font-bold mt-1">5174+</h2>
            <p className=" text-xs ">Cups of Coffee</p>
          </div>
          <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-md flex-1">
            <div className="">
              <FaCar className=" text-5xl text-myOrange" />
            </div>
            <h2 className="text-3xl font-bold mt-1">7894+</h2>
            <p className=" text-xs ">Car rented</p>
          </div>
          <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-md flex-1">
            <div className="">
              <FaPeopleGroup className=" text-5xl text-myOrange" />
            </div>
            <h2 className="text-3xl font-bold mt-1">9364+</h2>
            <p className=" text-xs ">World Wild Clients</p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center">
          <p className=" text-myOrange font-semibold">Latest Publications</p>
          <h2 className="text-3xl font-bold mt-3 capitalize">
            Explore our top deals+
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="beforeWheel"></div>
            <div className="text-myOrange text-lg">
              <GiCartwheel />
            </div>
            <div className="afterWheel"></div>
          </div>
        </div>
        <div className="mt-16  ">
          <div className="flex justify-center items-center gap-5 my-2 mb-10">
            <button
              className={`${
                cars === "sale" ? "bg-myOrange text-myWhite" : " bg-white"
              }  p-2 px-4 rounded-lg shadow-lg`}
              onClick={() => setCars("sale")}
            >
              Sale
            </button>
            <button
              className={` p-2 px-4 rounded-lg shadow-xl ${
                cars === "rent" ? "bg-myOrange text-myWhite" : " bg-white"
              } `}
              onClick={() => setCars("rent")}
            >
              Rent
            </button>
          </div>
          <div className="p-4">
            <Swiper
              style={{
                "--swiper-pagination-color": "rgb(253, 60, 51)",
                "--swiper-pagination-bullet-inactive-color": "rgb(230,230,230)",
                "--swiper-pagination-size": "10px",

                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "7px",
                // "--swiper-pagination-bullet-horizontal-gap": "6px",
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={isMobile ? 1 : 3}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {cars === "sale" && saleCars
                ? saleCars.map((car, i) => (
                    <SwiperSlide className="slide h-[440px] sm:h-[500px]">
                      <CarItem key={i} car={car} />
                    </SwiperSlide>
                  ))
                : cars === "rent" && rentCars
                ? rentCars.map((car, i) => (
                    <SwiperSlide className="slide h-[440px] sm:h-[500px]">
                      <CarItem key={i} car={car} />
                    </SwiperSlide>
                  ))
                : "Loading..."}
              <SwiperSlide className=" h-[365px] min-[400px]:h-[326px] sm:h-[440px] border rounded-lg bg-myGray ">
                <Link
                  className="w-full h-full flex justify-center items-center"
                  to={"/search"}
                >
                  <h2 className="text-xs sm:text-2xl">Show more</h2>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
