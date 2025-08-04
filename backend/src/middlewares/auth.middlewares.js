import { ACCESS_TOKEN_SECRET } from "../constents.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "") ;

    if (!accessToken) {
      throw new ApiError(401, "Invalid Token");
    }

    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    req.user = decodedToken.id;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized Request");
  }
});
