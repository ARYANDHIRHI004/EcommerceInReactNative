import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

export const DBNAME = "Ecommerce"
export const PORT = process.env.PORT
export const ORIGIN = process.env.ORIGIN
export const MONGO_URI = process.env.MONGO_URI

