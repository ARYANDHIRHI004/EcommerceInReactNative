import { Router } from "express";
import { createShop, getAllShop, getShopById } from "../controllers/shop.controllers.js";

const shopRouter = Router()

shopRouter.route("/get-all-shops").get(getAllShop)
shopRouter.route("/get-shop-by-id/:shopId").get(getShopById)
shopRouter.route("/create-shop").post(createShop)

export default shopRouter