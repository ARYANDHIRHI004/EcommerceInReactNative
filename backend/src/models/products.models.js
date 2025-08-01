import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        Type:String,
        required:true,
    },
    description:{
        Type:String,
        required:true,
    },
    category:{
        Type:mongoose.Types.ObjectId,
        required:"Category",
    },
    owner:{
        Type:mongoose.Types.ObjectId,
        required:"User",
    },
    shop:{
        Type:mongoose.Types.ObjectId,
        required:"Shop",
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