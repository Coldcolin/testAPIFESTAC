const userModel = require('../model/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        const hasAuthorization = req.headers.authorization;
        if (!hasAuthorization) {
            return res.status(400).json({
                message: 'Invalid authorization',
            })
        }
        const token = hasAuthorization.split(" ")[1];
        // console.log("token found")
        if (!token) {
            return res.status(404).json({
                message: "Token not found",
            });
        }
        const decodeToken = jwt.verify(token, process.env.secret_key)
        
        
        const user = await userModel.findById(decodeToken.id);
        if (!user) {
            // console.log("hello 3")
            return res.status(404).json({
                message: "Not authorized: User not found",
            });
        }

        // console.log("hello 4")
        req.user = decodeToken;

        next();
        
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError){
            return res.status(501).json({
                message: 'Session timeout, please login to continue',
            })
        }
        return res.status(500).json({
            Error: "Authentication error:  " + err.message,
        })        
    }
};



// Authorized users to getAll
const admin = (req, res, next) => {
    authenticate(req, res, async () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(400).json({
                message: "Not an Admin! User not authorized"
            })
        }
    })
}


module.exports = {
    admin,
}