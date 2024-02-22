const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(400).json('The token is not available')
    } else {
        jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
            if (error) return res.json('Token is invalid')
            next()
        })
    }
}

module.exports = verifyUser;