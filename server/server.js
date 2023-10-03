const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();
const userRouter = require("./routes/userRoute");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie middleware
app.use(cookieParser());

// route
app.get("/",(req, res)=>{
    res.send("server is working")
})

// routing middlewares
app.use("/users", userRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})