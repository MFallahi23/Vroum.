import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { VscError } from "react-icons/vsc";
import { disconnect } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function ProfileSetting() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = currentUser._id;
  const [error, setError] = useState(null);

  // Handle delete
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/user/delete/${id}`);
      const { data } = res;
      if (data.success === false) {
        setError(data.message);
        return;
      }
      dispatch(disconnect());
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="py-10 flex-1 max-w-[600px]">
      {error && (
        <div className=" bg-red-300 p-3 mb-8 text-red-700 font-semibold text-md flex items-center gap-2 capitalize">
          <div className="">
            <VscError className="text-2xl" />
          </div>

          {error}
        </div>
      )}
      <div className="flex flex-col">
        <button
          onClick={handleDelete}
          className="border-2 border-red-600 text-red-600 p-2 rounded-lg font-semibold hover:bg-red-600 hover:text-myWhite transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
