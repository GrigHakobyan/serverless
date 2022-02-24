const jwt = require("jsonwebtoken");
module.exports.tokenGenerator = async (payload, expiresIn) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
        expiresIn: expiresIn
    })
}
