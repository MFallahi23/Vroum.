import React from "react";
import { FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <section className="upper-footer bg-myBlack text-white">
        <div className="flex flex-col max-w-[1000px] mx-auto py-10 px-4  gap-6 sm:flex-row justify-center">
          <div className="flex flex-col gap-6">
            <div className="fixedByQuerie border-b pb-8">
              <h1 className="font-bold text-3xl">
                <span className="text-myOrange text-4xl">V</span>roum.
              </h1>
              <p className=" text-[14px] sm:text-[16px] h-[108px] max-w-[400px]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut,
                unde voluptatum. Et, similique voluptates tenetur soluta minus
                molestias dolorum ullam quibusdam accusantium eveniet itaque
                doloribus, quae eos, harum a deleniti?
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="footer__headings">Mail</h2>
              <div className="flex items-center gap-2">
                <div className=" bg-myOrange p-2 rounded-full">
                  <CgMail />
                </div>
                <p>info@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-6 border-b pb-8 sm:pb-20">
              <h2 className="footer__headings">Our Links</h2>
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="footer__headings">Call Now</h2>
              <div className="flex items-center gap-2">
                <div className=" bg-myOrange p-2 rounded-full">
                  <FaPhoneAlt />
                </div>
                <p>+70000000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bottom-footer bg-myOtherGray text-white p-2">
        <div className="flex flex-col gap-3 justify-between max-w-[1000px] mx-auto items-center sm:flex-row">
          <p>
            Copyright &#169; 2024
            <span className=" text-myOrange mx-1">Vroum.</span> All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-gray-500 p-2 rounded-full">
              <a
                href="https://www.instagram.com/fallahimouhcine/"
                target="_blank"
              >
                <FaInstagram className="hover:text-myOrange" />
              </a>
            </div>
            <div className="bg-gray-500 p-2 rounded-full">
              <a href="https://twitter.com/FallahiMouhcine" target="_blank">
                <FaTwitter className="hover:text-myOrange" />
              </a>
            </div>
            <div className="bg-gray-500 p-2 rounded-full">
              <a href="https://vk.com/cephalosporin" target="_blank">
                <SlSocialVkontakte className="hover:text-myOrange" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
