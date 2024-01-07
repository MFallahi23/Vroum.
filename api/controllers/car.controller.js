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
