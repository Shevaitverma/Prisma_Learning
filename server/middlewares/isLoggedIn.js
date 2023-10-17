const prisma = require("../prisma/index");

const jwt = require('jsonwebtoken');

const isLoggedIn = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error("you are not logged in")
        }
        //varify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user =await prisma.user.findUnique({
            where:{
                id: decode.userId
            }
        })
        if(!user){
            res.status(401);
            throw new Error("user not found");
        }
        req.user = user
        next()


    } catch (error) {
        res.status(401)
        throw new Error("please login again");
    }

}

module.exports = isLoggedIn;