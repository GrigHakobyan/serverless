const bcrypt = require('bcrypt')

const {response} = require("../../helpers/response");
const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {USER_TABLE, GSI_USERNAME} = require("../../helpers/constants");
const {updateItem, queryTable} = require("../../dbfunctions");



module.exports.updateUser = async (event) => {
    try {

        const {id} = event.requestContext.authorizer

        if(!id) {
            throw new Error('Invalid request')
        }

        const {username, email, password} = parseBodyToJSON(event.body)

        if(!username || !password || !email){
            throw new Error('Invalid request')
        }

        const param = {
            TableName: USER_TABLE,
            IndexName: GSI_USERNAME,
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username
            }
        }


        const isUserExist = await queryTable(param)

        if(isUserExist.Count > 0) {
            throw new Error('Username already exists')
        }


        const hashedPassword = await bcrypt.hash(password, 8)

        const updateParams = {
            TableName: USER_TABLE,
            Key: {
                userId: id,
                metadata: `USER#${id}`
            },
            UpdateExpression: "Set username = :username, password = :password, email = :email",
            ExpressionAttributeValues: {
                ":username": username,
                ":password": hashedPassword,
                ":email": email
            },
            ReturnValues: 'ALL_NEW'
        }

        const { Attributes } = await updateItem(updateParams)

        return response(200, {
            data: {id, username, email}
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
