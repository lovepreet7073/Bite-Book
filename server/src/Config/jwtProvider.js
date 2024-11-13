const jwt = require("jsonwebtoken")
const generateToken=(userId)=>{
    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"1d"})
    return token;
}

const getUserIdByToken=(token)=>{
    const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
    return decodedToken.userId;
}

module.exports = {
    generateToken,getUserIdByToken
}