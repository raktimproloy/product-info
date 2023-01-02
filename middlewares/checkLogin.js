const jwt = require("jsonwebtoken")

const checkLogin = (req, res, next) => {
    const token = req.cookies.htmlEcheckToken;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userName, userEmail} = decoded;
        req.userName = userName;
        req.userEmail = userEmail;
        next()
        return true;
    }catch{
        next("Authentication failure")
    }
}

module.exports = checkLogin