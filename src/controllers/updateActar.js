import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/users.model";
import { fileUploadOnCloud } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";


export const updateAvtarImage = asyncHandler(async(req,res)=>{

    const avtarLoacalPath = req.file?.path;

    if(!avtarLoacalPath){
        throw new ApiError(401,"avtar img is missing")

    }

    const avtar = await fileUploadOnCloud(avtarLoacalPath)

    if(!avtar.url){
        throw new ApiError(401,"Error Whole uplading Avatar")

    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avtar:avtar.url
            }

        },{
            new:true
        }
    ).select("-password")

    return res.status(200).json(ApiResponse(200,user,"Avatar is updated successfully"))


})