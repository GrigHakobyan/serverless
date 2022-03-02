const {USER_POOL_ID} = require( "../../helpers/constants");
const {response} = require( "../../helpers/response");
const {cognito} = require("../../helpers/cognito");


module.exports.getUsers = async (event) => {
    try {
        const usersParams = {
            UserPoolId: USER_POOL_ID,
            Limit: 25
        }

        const users = await cognito.listUsers(usersParams).promise()

        return response(200, {
            data: users.Users
        })

    } catch (e) {
        return response(400,{
            error: e.message
        })
    }
}
