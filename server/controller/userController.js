const prisma = require("../prisma/index");
const asyncHandler = require("express-async-handler")
const cookieToken = require("../utils/cookieToken");
const { json } = require("express");

// user registeration
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;

    // check if user enter data 
    if(!name, !email, !password){
        res.status(400)
        throw new Error("Please enter required fields");
    }

    // check if email exists.
    const isEmail = await prisma.user.findFirst({
        where:{
            email
        }
    })
    if(isEmail){
        res.status(400)
        throw new Error("Emamil already exists")
    }

    // Creating user
    const user = await prisma.user.create({
        data:{
            name,
            email, 
            password
        }
    })

    //send user data to cookie
    cookieToken(user, res);
});

// user login



module.exports = {
    registerUser
}