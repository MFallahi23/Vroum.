import React, { useEffect, useRef, useState } from "react";
import { CgMail } from "react-icons/cg";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

import { SlSocialVkontakte } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { disconnect } from "../store/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isMobile = useMediaQuery({ query: `(max-width:700px)` });
  const [menuClicked, setMenuClicked] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    menuClicked ? setMenuClicked(false) : "";
    navigate(`/search?${searchQuery}`);
  };

  // Handle menu click
  const handleMenuClick = () => {
    if (menuClicked) {
      setMenuClicked(false);
    } else {
      setMenuClicked(true);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  // Handle Sign out
  const handleSignOut = async () => {
    try {
      const res = await axios.get("/api/auth/signout");
      const { data } = res;
      if (data.success === false) {
        console.log("error during log out");
        setMenuClicked(false);
        return;
      }
      setMenuClicked(false);
      dispatch(disconnect());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <section className="upper__header bg-myBlack text-myWhite p-3">
        <div className="flex flex-col  gap-4 items-center max-w-[1000px] mx-auto  sm:justify-between sm:flex-row">
          <div className="flex  flex-col items-center sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <CgMail className=" scale-150" />
              <span>mygmail@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <span>+70000000</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/fallahimouhcine/"
              target="_blank"
            >
              <FaInstagram className="hover:text-myOrange" />
            </a>
            <a href="https://twitter.com/FallahiMouhcine" target="_blank">
              <FaTwitter className="hover:text-myOrange" />
            </a>
            <a href="https://vk.com/cephalosporin" target="_blank">
              <SlSocialVkontakte className="hover:text-myOrange" />
            </a>
          </div>
        </div>
      </section>
      <section className="bottom__header p-3">
        <div className="max-w-[1000px] mx-auto flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="logo font-bold text-3xl">
              <span className=" text-myOrange text-4xl">V</span>roum.
            </h1>
          </Link>

          {isMobile ? (
            <div
              onClick={handleMenuClick}
              className={` menu flex flex-col gap-1 items-end cursor-pointer z-20 
              ${menuClicked ? "translate-y-1 fixed right-2" : ""}`}
            >
              <div
                className={`line1 w-[25px] h-[3px] bg-myOrange rounded-2xl transition ${
                  menuClicked ? "activeHeader" : ""
                }`}
              ></div>
              <div
                className={`line2 w-[20px] h-[3px] bg-myOrange rounded-2xl ${
                  menuClicked ? "activeHeader" : ""
                }`}
              ></div>
              <div
                className={`line3 w-[15px] h-[3px] bg-myOrange rounded-2xl transition ${
                  menuClicked ? "activeHeader" : ""
                }`}
              ></div>
            </div>
          ) : currentUser ? (
            <div className="flex items-center gap-6 relative">
              <ul
                className={`flex gap-6 orange-links ${
                  isSearch ? "hidden" : ""
                }`}
              >
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
              </ul>

              <form
                action=""
                name="search"
                className=" search-box relative"
                onSubmit={handleSubmit}
              >
                <button
                  onClick={() => setIsSearch(true)}
                  type="submit"
                  className="btn-search w-[40px] h-[40px]  bg-myOrange rounded-full cursor-pointer  text-white flex justify-center items-center hover:bg-myYellow"
                >
                  <FaSearch className="faSearch" />
                </button>
                <input
                  type="text"
                  className="desktop-search  w-[100px] h-[40px]  bg-transparent rounded-[25px] transition-all duration-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearch(true)}
                  onBlur={() => setTimeout(() => setIsSearch(false), 400)}
                />
              </form>
              <div
                className=" relative cursor-pointer"
                onClick={() =>
                  profileClick ? setProfileClick(false) : setProfileClick(true)
                }
              >
                <img
                  src={currentUser.avatar}
                  className="h-[40px] w-[40px] rounded-full object-cover hover:opacity-60"
                  alt="avatar"
                />
              </div>
              {profileClick && (
                <div className="absolute  right-0 top-14">
                  <div className="relative">
                    <div className="arrow-up absolute right-2  -top-2"></div>
                    <div className=" bg-slate-100  p-4 rounded-lg flex flex-col gap-2">
                      <Link
                        onClick={() => setProfileClick(false)}
                        to={"profile/edit"}
                        className="flex items-center gap-2 p-1 px-4 rounded-lg hover:bg-slate-200"
                      >
                        <div className="">
                          <CgProfile />
                        </div>
                        <span>Profile</span>
                      </Link>
                      <div
                        className="flex items-center gap-2 p-1 px-4 rounded-lg border  cursor-pointer"
                        onClick={handleSignOut}
                      >
                        <div className="">
                          <PiSignOutBold />
                        </div>
                        <span> Sign out</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <ul
                className={`flex gap-6 orange-links ${
                  isSearch ? "hidden" : ""
                }`}
              >
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>

                <li>
                  <Link to={"/sign-in"}>Sign in</Link>
                </li>
              </ul>

              <form
                action=""
                name="search"
                className=" search-box relative"
                onSubmit={handleSubmit}
              >
                <button
                  onClick={() => setIsSearch(true)}
                  type="submit"
                  className="btn-search w-[40px] h-[40px]  bg-myOrange rounded-full cursor-pointer  text-white flex justify-center items-center"
                >
                  <FaSearch className="faSearch" />
                </button>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="desktop-search  w-[100px] h-[40px]  bg-transparent rounded-[25px] transition-all duration-500"
                  placeholder="Search..."
                  onFocus={() => setIsSearch(true)}
                  onBlur={() => setTimeout(() => setIsSearch(false), 400)}
                />
              </form>
            </div>
          )}
          {menuClicked && !currentUser ? (
            <div className="fixed top-0 left-0 w-full h-full  z-10 bg-myWhite flex flex-col pt-48 items-center ">
              <form
                onSubmit={handleSubmit}
                className="search flex items-center gap-1 bg-white border p-3 rounded-lg"
              >
                <input
                  id="search"
                  type="text"
                  placeholder="search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" focus:outline-none"
                />
                <button>
                  <FaSearch className=" text-myOrange cursor-pointer" />
                </button>
              </form>
              <ul className="mt-8 flex flex-col gap-8 w-full items-center text-2xl">
                <li>
                  <Link
                    className=" "
                    onClick={() => setMenuClicked(false)}
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMenuClicked(false)} to={"/about"}>
                    About Us
                  </Link>
                </li>

                <li>
                  <Link onClick={() => setMenuClicked(false)} to={"/sign-in"}>
                    Sign-in
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            menuClicked && (
              <div className="fixed top-0 left-0 w-full h-full  z-10 bg-myWhite flex flex-col pt-48 items-center ">
                <div className="flex items-center gap-3 my-8">
                  <Link
                    to={"/profile/edit"}
                    onClick={() => setMenuClicked(false)}
                  >
                    <img
                      src={currentUser.avatar}
                      className="h-[50px] w-[50px] rounded-full"
                      alt=""
                    />
                  </Link>
                  <Link
                    to={"/profile/edit"}
                    onClick={() => setMenuClicked(false)}
                  >
                    <h1 className=" text-xl">{currentUser.username}</h1>
                  </Link>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="search flex items-center gap-1 bg-white border p-3 rounded-lg"
                >
                  <input
                    id="search"
                    type="text"
                    placeholder="search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" focus:outline-none"
                  />
                  <button type="submit">
                    <FaSearch className=" text-myOrange cursor-pointer" />
                  </button>
                </form>
                <ul className="mt-8 flex flex-col gap-8 w-full items-center text-2xl">
                  <li>
                    <Link
                      className=" "
                      onClick={() => setMenuClicked(false)}
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setMenuClicked(false)} to={"/about"}>
                      About Us
                    </Link>
                  </li>

                  <li>
                    <div
                      className="flex items-center gap-2 p-1 px-4 rounded-lg border border-red-600 text-red-600 font-semibold cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <div className="">
                        <PiSignOutBold />
                      </div>
                      <span> Sign out</span>
                    </div>
                  </li>
                </ul>
              </div>
            )
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
