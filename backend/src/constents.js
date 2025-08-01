import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

export const DBNAME = "Ecommerce"
export const PORT = process.env.PORT
export const ORIGIN = process.env.ORIGIN
export const MONGO_URI = process.env.MONGO_URI

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY

export const REFRESH_TOKEN_SECRET =process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRY =process.env.REFRESH_TOKEN_EXPIRY
