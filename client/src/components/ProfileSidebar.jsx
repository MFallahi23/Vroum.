import React from "react";
import { CgProfile } from "react-icons/cg";
import { BsFilePost } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function ProfileSidebar() {
  return (
    <aside>
      <div className="flex flex-col gap-3 p-3  ">
        <NavLink
          to={"profile/edit"}
          className="flex items-center gap-3 p-1 rounded-lg pr-24  cursor-pointer hover:bg-gray-200  "
        >
          <div className="text-xl">
            <CgProfile />
          </div>
          <h2>Profile</h2>
        </NavLink>
        <NavLink
          to={"profile/posts"}
          className="flex items-center gap-3 p-1 rounded-lg pr-2 cursor-pointer hover:bg-gray-200"
        >
          <div className="text-xl">
            <BsFilePost />
          </div>
          <h2>Posts</h2>
        </NavLink>
        <NavLink
          to={"profile/settings"}
          className="flex items-center gap-3 p-1 rounded-lg pr-2 cursor-pointer hover:bg-gray-200"
        >
          <div className="text-xl">
            <IoIosSettings />
          </div>
          <h2>Settings</h2>
        </NavLink>
      </div>
    </aside>
  );
}
