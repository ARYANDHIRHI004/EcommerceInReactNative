import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { ORIGIN } from "./constents.js"
import userRouter from "./routes/user.routes.js"


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


export default app