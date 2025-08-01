import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validator = (req, res, next) => {
  const error = validationResult(req)

  if(error.isEmpty()){
    return next()
  }

  const extractError = []
  error.array().map((err)=>(extractError.push({
    [err.path]:err.msg
  })))

  throw new ApiError(422, "Recived data is not valid", extractError)
}

