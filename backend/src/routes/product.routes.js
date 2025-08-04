import { Router } from "express";
import { createProduct, getAllProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

productRouter.route("/create-product").post(createProduct)
productRouter.route("/get-all-products").post(getAllProduct)
// productRouter.route("/get-products-by-id/:productId").post(getProductById)
// productRouter.route("/get-my-products").post(getMyProduct)
// productRouter.route("update-products/:productId").post(updateProduct)
// productRouter.route("delete-products/:productId").post(deleteProduct)

export default productRouter