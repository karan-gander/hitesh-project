import { User } from "../models/users.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const updateUserDetails = asyncHandler(async (req,res)=>{
    
    const {fullName,email} = req.body;

    if(!fullName || email){
        throw new ApiError(401,"email or fullname is required")

    }

    const user = await User.findByIdAndUpdate(
                req.user?._id,
                {
                    email,
                    fullName
                },
                {
                    new:true
                }

    ).select("-password")

})