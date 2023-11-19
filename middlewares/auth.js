const moment = require('moment');
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            return res.status(401).json({
                result: null,
                message:  "Not authorized"
            });
        }
    
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IkFudG9uaW8gUGF6IiwiaWQiOiI2NTM5Y2UwMWFiZTYzZjhhMDk1NTJhMTUiLCJyb2wiOiJTRUxMRVIiLCJpYXQiOjE2OTg3MTYyNzksImV4cCI6MTY5ODczMDY3OX0.ko6EHgEMaqKyoH2_61lsX4SwY19HdlwKvGDPNvJE33A
    
        const [bearer, token] = req.headers.authorization.split(" ");
    
        // console.log("bearer:", bearer)
    
        if (bearer !== 'Bearer') {
            return res.status(401).json({
                result: null,
                message:  "Not authorized bearer"
            });
        }
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    
        // console.log("payload:", payload)
    
        if(payload.exp <= moment().unix()) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                message: "Invalid token."
            })
        }
    
        const user = await User.findById(payload.id)
    
        if (!user || !user.token) {
            return res.status(401).json({
                result: null,
                message:  "Not authorized"
            });
        }
    
        // console.log("user:", user)
    
        req.user = user;
    
        next();
    } catch (error) {
        return res.status(401).json({
            result: null,
            message:  "Not authorized"
        });
    }
}

module.exports = {
    auth
}