import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    shop:{
        type:mongoose.Types.ObjectId,
        ref:"Shop",
    },
    productImage:{
        type:{
            url:String,
            localPath:String
        },
        default:{
            url:``,
            localPath:""
        },
        required:[true, "Image is required"]
    },
    

},{timestamps:true})

export const Product = mongoose.model('Product', productSchema)