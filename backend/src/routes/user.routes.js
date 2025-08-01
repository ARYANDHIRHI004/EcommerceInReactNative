import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { userRegistrationValidation } from "../validators/user.validation.js";
import { validator } from "../middlewares/vlidator.middlewares.js";

const userRouter = Router()

userRouter.route("/register").post(userRegistrationValidation(),validator, registerUser)

export default userRouter