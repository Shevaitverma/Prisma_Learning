const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHamdler")


const app = express();
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoutes");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//cookie middleware
app.use(cookieParser());

// error middleware
app.use(errorHandler);

// testing route
app.get("/",(req, res)=>{
    res.send("server is working")
})

// routing middlewares
app.use("/users", userRouter);
app.use("/post", postRouter);



// listening server
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})