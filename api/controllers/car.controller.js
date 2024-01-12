import Car from "../models/car.model.js";
import { errorHandler } from "../helper/error.js";

// CREATE CAR PUBLICATION
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    return res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

// DELETE CAR PUBLICATION
export const deleteCar = async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(errorHandler(404, "Car publication not found"));
  }

  if (req.user.id !== car.userRef) {
    return next(
      errorHandler(401, "You can only delete your own Car publications!")
    );
  }

  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("successfully deleted");
  } catch (error) {
    next(error);
  }
};

// UPDATE CAR PUBLICATION
export const updateCar = async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    return next(errorHandler(404, "Car publication not found"));
  }
  if (req.user.id !== car.userRef) {
    return next(errorHandler(401, "You can only update your own publications"));
  }

  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};

// GET CAR PUBLICATION
export const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return next(errorHandler(404, "Car publication not found"));
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

// GET PUBLICATIONS
export const getCars = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    let engine = req.query.engine;
    if (engine === undefined || engine === "all") {
      engine = {
        $in: [
          "Twin-cylinder",
          "Three-cylinder",
          "Four-cylinder",
          "Five-cylinder",
          "Six-cylinder",
          "Eight-cylinder or more",
        ],
      };
    }
    let fuelType = req.query.fuelType;
    if (fuelType === undefined || fuelType === "all") {
      fuelType = {
        $in: ["Gasoline", "Diesel", "Bio-diesel", "Ethanol", "Electric"],
      };
    }
    let Transmission = req.query.Transmission;
    if (Transmission === undefined || Transmission === "all") {
      Transmission = {
        $in: [
          "Manual",
          "Torque Converter",
          "Continuously Variable",
          "Semi-Automatic",
          "Dual-Clutch",
          "Tiptronic",
        ],
      };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const cars = await Car.find({
      title: { $regex: searchTerm, $options: "i" },
      engine,
      fuelType,
      Transmission,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
