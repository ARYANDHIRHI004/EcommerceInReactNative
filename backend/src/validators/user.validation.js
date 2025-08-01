import { body } from "express-validator";

export const userRegistrationValidation = () => {
  return[
    body('fullname')
        .notEmpty().withMessage("Fullname is required"),
    
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),
    body('username')
        .notEmpty().withMessage("Username is required"),
    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({min:6}).withMessage("atleast 6 char")
  ]
}
