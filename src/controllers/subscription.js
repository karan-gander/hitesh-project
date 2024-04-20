import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getUserProfile = asyncHandler(async(req,res)=>{
    const {username} = req.params

    if(!username){
        throw new ApiError(401,"Could not find the username")


    }

    
    const channel = await User.aggregate([
        {
            $match:{
                username:username
            }
        },
        {
            $lookup:{
                from:"subscripations",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },,
        {
            $lookup:{
                from:"subscripations",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            }
        },
        {
            $addFields:{
                subscribersCount:{
                    $size:"$subscribers"
                },
                channelsSubscribersTo:{
                    $size:"$subscribedTo"
                },
                isSubscribeD:{
                    if:{$in:[req.user?._id,"$subscriberssubscriber."]},
                    then:true,
                    else:false
                }
            }
        
        }
        ,{
            $project:{
                fullname:1,
                username:1,
                subscribersCount:1,
                email:1

            }
        }
    ])
    
        if(!channel){
            throw new ApiError(401,"Channel is not found")

        }

        res.status(200).json(ApiResponse(200,channel,"User Details send successfuly"))
        

})


