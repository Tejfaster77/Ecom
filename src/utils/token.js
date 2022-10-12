const jwt = require('jsonwebtoken')

const refreshToken = (payload) => {
    return jwt.sign(
        {
            id: payload[0],
            usertype: payload[1],
            name: payload[2]
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"3d"
        }
    )
}

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    const cookies = req.cookies.token
    if(authHeader || cookies){
        const token = authHeader.split(" ")[1] || cookies
        jwt.verify(token.process.env.JWT_SECRET_KEY,(err,user) => {
            if(err) res.status(403).json({status:false,message:"Token isn't valid!"})
            req.user = user
            next()
        })
    }else{
        return res.status(401).json({status:false,message:"you are not authenticated!"})
    }
}

const verifyTokenAndSeller = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.usertype === "SELLER"){
            next()
        }else{
            res.status(403).json({status:false,message:"you are not allowed to do this!"})
        }
    })
}

module.exports = {
    refreshToken,
    verifyToken,
    verifyTokenAndSeller
}