import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    

},{timestamps:true})

export const Shop = mongoose.model('Shop', shopSchema)