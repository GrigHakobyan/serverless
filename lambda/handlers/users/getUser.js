const {response} = require("../../helpers/response");
const {USER_TABLE, USER_POOL_ID} = require("../../helpers/constants");
const {queryTable} = require("../../dbfunctions");
const {cognito} = require("../../helpers/cognito");


module.exports.getUser = async (event) => {
    try {

        const id = event.pathParameters?.id

        const params = {
            UserPoolId: USER_POOL_ID,
            Filter: `username = "${id}"`
        }

        const user = await cognito.listUsers(params).promise()

        if(user.Users.length === 0) {
            throw new Error('User not found')
        }

        return response(200, {
            data: user.Users[0]
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
