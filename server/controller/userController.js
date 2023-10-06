const prisma = require("../prisma/index");
const asyncHandler = require("express-async-handler")
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcryptjs");


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

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating user
    const user = await prisma.user.create({
        data:{
            name,
            email, 
            password: hashedPassword
        }
    })

    //send user data to cookie
    cookieToken(user, res);
});

// user login
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    // check if user enter data
    if(!email, !password){
        res.status(400)
        throw new Error("Please enter email and password")
    }

    // get user exists
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });

    // if user not found
    if(!user){
        throw new Error("User not found");
    }

    // check if password is correct
    const isPassword = await bcrypt.compare(password, user.password);

    if(user && isPassword){
        cookieToken(user, res);
    }else{
        throw new Error("password is incorrect");
    }

})

// logout user 
const logoutUser = asyncHandler(async(req, res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true
        });
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {
    registerUser,
    loginUser,
    logoutUser
}