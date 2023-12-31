import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect } from "../store/user/userSlice";
import axios from "axios";
export default function Oauth({ error }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorGoogle = (err) => {
    error(err);
  };
  const handleOauth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "/api/auth/google",
        JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res;
      if (data.success === false) {
        errorGoogle(data.message);
        return;
      }
      dispatch(connect(data));
      navigate("/");
    } catch (error) {
      errorGoogle(error.message);
    }
  };
  return (
    <div
      onClick={handleOauth}
      className="bg-myWhite rounded-full p-2 hover:opacity-50 cursor-pointer "
    >
      <FcGoogle className="text-2xl" />
    </div>
  );
}
