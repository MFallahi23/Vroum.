import axios from "axios";
import React, { useEffect, useState } from "react";

const Contact = ({ car }) => {
  const [user, setUser] = useState(null);

  // Get user who is the author of the publication
  const getUser = async () => {
    try {
      const res = await axios.get(`/api/user/${car.userRef}`);
      const data = res.data;
      setUser(data);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {user && (
        <div className="mt-5">
          <h2 className="text-xl">
            Contact information of{" "}
            <span className=" font-semibold">{user.username}:</span>
          </h2>
          <div className="mt-2">
            Email: <span>{user.email}</span>
          </div>

          {user.phoneNumber && (
            <div className="">
              Phone: <span>{ph}</span>
            </div>
          )}
        </div>
      )}
      {user === null && <div className="">Loading...</div>}
    </div>
  );
};

export default Contact;
