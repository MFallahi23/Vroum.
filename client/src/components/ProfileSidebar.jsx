import React from "react";
import { CgProfile } from "react-icons/cg";
import { BsFilePost } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";

export default function ProfileSidebar() {
  const navigate = useNavigate();
  // Handle Sign out
  const handleSignOut = async () => {
    try {
      const res = await axios.get("/api/auth/signout");
      const { data } = res;
      if (data.success === false) {
        console.log("error during log out");

        return;
      }

      dispatch(disconnect());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside>
      <div className="flex flex-col gap-3 p-3  ">
        <NavLink
          to={"edit"}
          className="flex items-center gap-3 p-1 rounded-lg pr-24  cursor-pointer hover:bg-gray-200  "
        >
          <div className="text-xl">
            <CgProfile />
          </div>
          <h2>Profile</h2>
        </NavLink>
        <NavLink
          to={"posts"}
          className="flex items-center gap-3 p-1 rounded-lg pr-2 cursor-pointer hover:bg-gray-200"
        >
          <div className="text-xl">
            <BsFilePost />
          </div>
          <h2>Posts</h2>
        </NavLink>
        <NavLink
          to={"settings"}
          className="flex items-center gap-3 p-1 rounded-lg pr-2 cursor-pointer hover:bg-gray-200"
        >
          <div className="text-xl">
            <IoIosSettings />
          </div>
          <h2>Settings</h2>
        </NavLink>
        <div
          className="flex items-center gap-2 p-1 px-4 rounded-lg border border-red-600 text-red-600 font-semibold cursor-pointer"
          onClick={handleSignOut}
        >
          <div className="">
            <PiSignOutBold />
          </div>
          <span> Sign out</span>
        </div>
      </div>
    </aside>
  );
}
