import mongoose from "mongoose";
import { Shop } from "../models/shops.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getAllShop = asyncHandler(async (req, res) => {
    const shops = await Shop.find()

    if(!shops){
        throw new ApiError(401, "No Shops")
    }

    return res.status(200).json(
        new ApiResponse(201, shops, "All shops fetched successfully")
    )
}) 

export const getShopById = asyncHandler(async (req, res) => {
    const {shopId} = req.params

    if(!shopId){
        throw new ApiError(401, "wrong Id")
    }

    const shop = await Shop.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(shopId)
            }
        },
        {
            $lookup:{
                from:"products",
                localField:"_id",
                foreignField:"shop",
                as:"products"
            }
        }
    ])

    if(!shop){
        throw new ApiError(401, "Shop does not exist")
    }

    return res.status(200).json(
        new ApiResponse(201, shop, "Sop fetched")
    )

})

export const createShop = asyncHandler(async (req, res) => {
    const {shopName} = req.body

    const shop = await Shop.create({
        shopName,
    })

    if(!shop){
        throw new ApiError(501, "Internal server Error")
    }

    return res.status(200)
        .json(
            new ApiResponse(201, shop, "shop created successfully")
        )

})

export const updateShop = asyncHandler()

export const deleteShop = asyncHandler()