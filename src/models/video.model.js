import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Schema,model } from "mongoose";

const videoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:string,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0

    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

const Video = model("Video",videoSchema)