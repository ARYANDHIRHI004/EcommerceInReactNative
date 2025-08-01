import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopName:{
        Type:String,
        required:true,
    },
    owner:{
        Type:mongoose.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true})

export const Shop = mongoose.model('Shop', shopSchema)