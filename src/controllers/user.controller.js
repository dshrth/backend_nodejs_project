import { asyncHandler } from "../utills/asyncHandler.js";
import { apiErrorHandler } from "../utills/apiErrorHandler.js";
import { User } from "../modals/user.modals.js";
import { uploadOnCloudinary } from "../utills/cloudinary.js";
import { apiResponseHandler } from "../utills/apiResponseHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const {userName, email, fullName, password} = req.body;

    if ([fullName, email, userName, password].some((filed) => 
    filed?.trim() === "")
) {
    throw new apiErrorHandler(400, "All Filedds are required ??")
}

const excitiedUser = await User.findOne({
    $or: [{ userName }, { email }]
})

if(excitiedUser){
    throw new apiErrorHandler(409, "user with email or username is alerdy exist")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.abcd[0]?.path;

if(!avatarLocalPath){
    throw new apiErrorHandler(400, "avatar file is required");
}

let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
    coverImageLocalPath = req.files.coverImage[0].path
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new apiErrorHandler(400, "avatar file is requires");
}

const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
})

const createdUser = await User.findById(user._id).select("-password -refreshToken")

if(!createdUser) {
throw new apiErrorHandler(500, "something went wrong , when registering user")
}

return res.status(201).json(
    new apiResponseHandler(200, createdUser, "user register successFully")
)

})

export {registerUser};