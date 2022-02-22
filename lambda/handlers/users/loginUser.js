const bcrypt = require('bcrypt')

const {response} = require("../../helpers/response");
const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {USER_TABLE, GSI_USERNAME} = require("../../helpers/constants");
const {queryTable} = require("../../dbfunctions");
const {tokenGenerator} = require("../../helpers/tokenGenerator");


module.exports.loginUser = async (event) => {
    try {
        const {username, password} = parseBodyToJSON(event.body)

        const params = {
            TableName: USER_TABLE,
            IndexName: GSI_USERNAME,
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username
            }
        }

        const user = await queryTable(params)

        if(user.Count === 0) {
            throw new Error('User not found')
        }

        const comparedPassword = await bcrypt.compare(password, user.Items[0].password)

        if(user.Items[0].username !== username || !comparedPassword){
            throw new Error('Invalid username or password')
        }

        const payload = {
            id: user.Items[0].userId,
            username: user.Items[0].username,
            email: user.Items[0].email
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
