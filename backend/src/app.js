import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { ORIGIN } from "./constents.js"
import userRouter from "./routes/user.routes.js"
import shopRouter from "./routes/shop.routes.js"
import productRouter from "./routes/product.routes.js"


const app = express()


app.use(cors({
    origin: ORIGIN,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [''],
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/shops", shopRouter)
app.use("/api/v1/products", productRouter)


export default app