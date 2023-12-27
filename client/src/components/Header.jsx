import React, { useEffect, useRef, useState } from "react";
import { CgMail } from "react-icons/cg";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useMediaQuery({ query: `(max-width:700px)` });
  const [menuClicked, setMenuClicked] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleMenuClick = () => {
    if (menuClicked) {
      setMenuClicked(false);
    } else {
      setMenuClicked(true);
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
              <span>+7123547484</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <SlSocialVkontakte />
          </div>
        </div>
      </section>
      <section className="bottom__header p-3">
        <div className="max-w-[1000px] mx-auto flex justify-between items-center">
          <h1 className="logo font-bold text-3xl">
            <span className=" text-myOrange text-4xl">V</span>roum.
          </h1>
          {isMobile ? (
            <div
              onClick={handleMenuClick}
              className={` menu flex flex-col gap-1 items-end cursor-pointer z-20 
              ${menuClicked ? "translate-y-1" : ""}`}
            >
              <div
                className={`line1 w-[25px] h-[3px] bg-myOrange rounded-2xl transition ${
                  menuClicked ? "active" : ""
                }`}
              ></div>
              <div
                className={`line2 w-[20px] h-[3px] bg-myOrange rounded-2xl ${
                  menuClicked ? "active" : ""
                }`}
              ></div>
              <div
                className={`line3 w-[15px] h-[3px] bg-myOrange rounded-2xl transition ${
                  menuClicked ? "active" : ""
                }`}
              ></div>
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
                  <Link to={"/"}>Blog</Link>
                </li>
                <li>
                  <Link to={"/sign-in"}>Sign in</Link>
                </li>
              </ul>

              <form action="" name="search" className=" search-box relative">
                <button
                  onClick={() => setIsSearch(true)}
                  type="submit"
                  className="btn-search w-[40px] h-[40px]  bg-myOrange rounded-full cursor-pointer  text-white flex justify-center items-center"
                >
                  <FaSearch className="faSearch" />
                </button>
                <input
                  type="text"
                  className="desktop-search  w-[100px] h-[40px]  bg-transparent rounded-[25px] transition-all duration-500"
                  placeholder="Search..."
                  onFocus={() => setIsSearch(true)}
                  onBlur={() => setTimeout(() => setIsSearch(false), 350)}
                />
              </form>
            </div>
          )}
          {menuClicked && (
            <div className="fixed top-0 left-0 w-full h-full  z-10 bg-myWhite flex flex-col pt-48 items-center ">
              <form
                action="/f"
                className="search flex items-center gap-1 bg-white border p-3 rounded-lg"
              >
                <input id="search" type="text" placeholder="search..." />
                <Link
                  to={`/search`}
                  onClick={() => {
                    setMenuClicked(false);
                  }}
                >
                  <FaSearch className=" text-myOrange cursor-pointer" />
                </Link>
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
                  <Link onClick={() => setMenuClicked(false)} to={"/blog"}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMenuClicked(false)} to={"/sign-in"}>
                    Sign-in
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
