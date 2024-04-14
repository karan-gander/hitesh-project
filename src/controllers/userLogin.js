import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import { generateAccessTokenAndRefreshTOken } from "./genrateAccessTokenAndRefresh.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const userLogin = asyncHandler(async (req, res) => {
  console.log("hiii");
  const { username, email, password } = req.body;
  console.log(username, password, email);

  if (!(username || email)) {
    throw new ApiError(400, "userneame or emeail is not found");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ApiError(401, "Invaild username or password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is incorrect");
  }
  console.log(user._id);

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshTOken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "user is logged in successfully"
      )
    );
});

export { userLogin };
