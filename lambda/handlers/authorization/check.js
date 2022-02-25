const {response} = require("../../helpers/response");
const {tokenGenerator} = require("../../helpers/tokenGenerator");
module.exports.check = async (event) => {
    try {
        const {id, username, email} = event.requestContext.authorizer

        if(!id) {
            throw new Error('Invalid request')
        }

        const payload = {
            id,
            username,
            email
        }

        const token = await tokenGenerator(payload, '1h')

        return response(200, {
            data: { token }
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
