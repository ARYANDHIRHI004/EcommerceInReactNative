import mongoose from "mongoose";
import { Product } from "../models/products.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createProduct = asyncHandler(async (req, res) => {
    const {productName, description} = req.body

    const product = await Product.create({
        productName,
        description,
        shop: new mongoose.Types.ObjectId("688d9f3ecb248b6056d37844")
    })

    if(!product){
        throw new ApiError(501, "Internal server error")
    }

    return res.status(201).json(
        new ApiResponse(200, product, "Product create successfully")
    )


})

export const getAllProduct = asyncHandler(async (req, res) => {
    
})