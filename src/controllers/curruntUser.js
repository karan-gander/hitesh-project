import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCurruntUser = asyncHandler(async (req,res)=>{

    return res.satatus(200).json(new ApiResponse(200,req.user,"User details fetched successfully"))
})
