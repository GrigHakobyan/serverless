const jwt = require('jsonwebtoken')

module.exports.authMiddleware = async (headers) => {
    try {
        const token = headers['Authorization'].split(' ')[1] || ""

        const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        return user
    } catch (e) {
        throw new Error('Invalid request')
    }
}
