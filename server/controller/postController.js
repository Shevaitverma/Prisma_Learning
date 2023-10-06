const AsyncHandler = require("express-async-handler")
const prisma = require("../prisma/index")

// create a new post 
const createPost = AsyncHandler(async(req, res)=>{
    try {
        const {slug, title, body, authorId} = req.body;
        // validation

        const postResult = await prisma.post.create({
            data:{
                slug,
                title,
                body,
                author: {connect:{id: authorId}}
            }
        });
        res.status(200).json(postResult)
    } catch (error) {
        throw new Error(error);
    }
});


// update post
const updatePost = AsyncHandler(async(req, res)=>{
    const {id} = req.params;
    const {title, body} =  req.body;

    try {
        const postResult = await prisma.post.update({
            where:{
                id: id
            },
            data:{
                title,
                body
            }
        });
        res.status(200).json(postResult)
    } catch (error) {
        throw new Error("Post not exists")
    }
})

// delete post 
const deletePost = AsyncHandler(async(req, res)=>{
    const {id} = req.params;
    
    try {
        const postResult = await prisma.post.delete({
            where:{id: id}
        });
        res.status(200).json({message: "Deleted successfully"})
    } catch (error) {
        throw new Error("Post not exists");
    }
})

//get all posts 
const getAllPost = AsyncHandler(async(req, res)=>{
    try {
        const postResult = await prisma.post.findMany();
        res.status(200).json(postResult)
    } catch (error) {
        throw new Error("No posts found")
    }
})

// get one post
const getPost = AsyncHandler(async(req, res)=>{
    const {id} = req.params;
    
    try {
        const postResult = await prisma.post.findUnique({
            where: {id: id}
        })
        res.status(200).json(postResult)
    } catch (error) {
        throw new Error("Post not exists");
    }
})

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPost,
    getPost
}