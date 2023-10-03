const getJwtToken = require("./token");

const cookieToken = (user, res) =>{
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000 // 3 days
        ),
        httpOnly: true,
    }
    user.password = undefined;

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieToken;