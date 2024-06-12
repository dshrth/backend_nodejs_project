import { apiErrorHandler } from "../utills/apiErrorHandler";
import { asyncHandler } from "../utills/asyncHandler";
import jwt from "json-web-token"
import { User } from "../modals/user.modals";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header(("Authorization")?.replace("Bearer ", ""))

    if(!token) {
     throw new apiErrorHandler(401, "unauthorized request")
    }
 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
 
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
    if(!user) {
     throw new apiErrorHandler(401, "invalid access token")
    }
 
    req.user = user;
    next()
  } catch(error) {
    throw new apiErrorHandler(401, error?.message || "invalid access token")
  }
})