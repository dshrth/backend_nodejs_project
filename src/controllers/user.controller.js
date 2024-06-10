import { asyncHandler } from "../utills/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "backend with chai or code"
    })
})

export {registerUser};