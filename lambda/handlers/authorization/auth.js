const {generatePolicy} = require("./generatePolicy");
const jwt = require("jsonwebtoken");


module.exports.auth = async (event) => {
        const authorization = event.authorizationToken

        if(!authorization || !authorization.startsWith('Bearer')) {
            return generatePolicy('Deny', {})
        }

    const token = authorization.split(' ')[1] || ""

    const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)


    return generatePolicy('Allow', event['methodArn'],user)
}
