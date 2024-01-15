import React from "react";
import { useNavigate } from "react-router-dom";

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col gap-1 border rounded-lg">
      <div className="overflow-hidden">
        <img
          onClick={() => navigate(`/car/${car._id}`)}
          src={car.imageUrls[0]}
          alt="photo of car"
          className="w-full sm:w-60 sm:h-60 hover:scale-110 transition rounded-t-lg cursor-pointer min-h-32"
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div
          onClick={() => navigate(`/car/${car._id}`)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <h1 className="text-2xl capitalize max-w-58 sm:max-w-40 truncate">
            {car.title}
          </h1>
          <sup className="bg-myYellow border p-2 rounded-lg">{car.type}</sup>
        </div>
        <div className="sm:max-w-56">
          <p className="truncate">{car.description}</p>
        </div>
        <p className="capitalize underline sm:max-w-56 truncate">
          {car.carModel}
        </p>
        <span className="text-2xl font-semibold truncate">
          {car.price} {car.type === "rent" ? "$/month" : "$"}
        </span>
        <button
          onClick={() => navigate(`/car/${car._id}`)}
          className=" bg-myOrangeWhite p-1 rounded-lg truncate"
        >
          Show details
        </button>
      </div>
    </div>
  );
};

export default CarItem;
