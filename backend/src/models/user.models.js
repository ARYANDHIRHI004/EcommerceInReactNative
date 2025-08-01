import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "../constents.js";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        requires:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        require:true,
        lowercase: true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:{
            url:String,
            localPath:String
        },
        default:{
            url:``,
            localPath:""
        },
        required:[true, "Avater is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationToken:{
        type: String,
    },
    emailVerificationTokenExpiry:{
        type: Date,
    },
    forgotPasswordToken:{
        type: String,
    },
    forgotPasswordExpity:{
        type: Date,
    },
    refreshToken:{
        type: String,

    },
    refreshPasswordExpity:{
        type: Date,
    },

}, {timestamps:true})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }   
})

userSchema.methods.comparePassword = async function(password){
    const isMatched = await bcrypt.compare(password, this.password)
    return isMatched
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id:this.id,
        username:this.username,
        email:this.email
    },
        ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id:this.id,
    },
        REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateTemproryToken = function(){
    const unHashedToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000)
    return {unHashedToken, hashedToken, tokenExpiry}
}

export const User = mongoose.model('User', userSchema) 