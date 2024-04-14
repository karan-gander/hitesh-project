import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getCurruntUser = asyncHandler(async (req,res)=>{

    return res.satatus(200).json(new ApiResponse(200,req.user,"User details fetched successfully"))
})
