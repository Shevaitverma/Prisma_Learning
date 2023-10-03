const prisma = require("../prisma/index");
const asyncHandler = require("express-async-handler")
const cookieToken = require("../utils/cookieToken");


const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name, !email, !password){
        res.status(400)
        throw new Error("Please enter required fields");
    }

    const user = await prisma.user.create({
        data:{
            name,
            email, 
            password
        }
    })

    //send user data to cookie
    cookieToken(user, res);
})



module.exports = {
    registerUser
}