import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const generateRefreshAndAccessToke = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(501, "Something went wrong while token generation ");
  }
};

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

export const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(401, "Token not found");
  }

  const user = await User.findOne({
    emailVerificationToken: verificationToken,
  });

  if (!user) {
    throw new ApiError(402, "Invalid Token");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({});

  return res.status(200).json(new ApiResponse(201, user, "Email verified"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "User does not exist.");
  }

  const { accesstoken, refreshToken } = generateRefreshAndAccessToke(user);

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user, accesstoken, refreshToken },
        "User LoggedIn successfully",
      ),
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user;

  if (!userId) {
    throw new ApiError(402, "Unauthorized Request");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new ApiError(401, "user does not exist");
  }

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201, {}, "User LoggedOut successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(401, "User does not exist");
  }

  return res.status(200).json(new ApiResponse(201, user, "Current user"));
});

export const refresAccessToken = asyncHandler();

export const resetPasswordToken = asyncHandler();

export const resetPassword = asyncHandler();

export const changePassword = asyncHandler();

export const googleLogin = asyncHandler();
