import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User Already exist");
  }

  const user = User.create({
    fullname,
    email,
    username,
    password,
  });

  if (!user) {
    throw new ApiError(501, "Internal Server error");
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const mailOption = {
    email: user.email,
    subject: "Email verification",
    mailGenContent: emailVerificationMailGenContent(
      username,
      `http://localhost:8000/api/v1/user/verifyEmail/${emailVerificationToken}`,
    ),
  };
  const isMailsend = await sendMail(mailOption);

  if (!isMailsend) {
    throw new ApiError(500, "email send get failed");
  }
  user.emailVerificationToken = emailVerificationToken;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(201, user, "User Registered Successfully"));
});
