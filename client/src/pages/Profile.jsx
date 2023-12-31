import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ProfileSidebar from "../components/ProfileSidebar";

const Profile = () => {
  const isMobile = useMediaQuery({ query: `(max-width:700px)` });

  return (
    <section className="my-8">
      <div className={`flex ${isMobile ? "flex-col" : ""}`}>
        <div className="">
          <ProfileSidebar />
        </div>
        <div className="flex justify-center items-center p-3 flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Profile;
