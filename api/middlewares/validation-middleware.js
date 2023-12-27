import validator from "../helper/validate.js";
const signupValidation = async (req, res, next) => {
  const validationRule = {
    username: "required|string",
    email: "required|string|email",
    password: "required|string",
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};
export default signupValidation;
