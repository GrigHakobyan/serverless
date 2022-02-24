const { v4 } = require( 'uuid')
const bcrypt = require('bcrypt')

const {putItem, queryTable} = require( "../../dbfunctions")
const {USER_TABLE, GSI_USERNAME} = require( "../../helpers/constants")
const {parseBodyToJSON} = require( "../../helpers/parseBodyToJSON")
const {response} = require( "../../helpers/response")
const {tokenGenerator} = require("../../helpers/tokenGenerator");

module.exports.registerUser = async (event) => {
    if(!event.body) {
        throw new Error(`Invalid body ${event.body}`)
    }

    try {
        const {username, email, password} = parseBodyToJSON(event.body)

        if(!username) {
            throw new Error('Param username does not exists')
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
            throw new Error('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const id = v4()

        const newUserParams = {
            TableName: USER_TABLE,
            Item: {
                userId: id,
                metadata: `USER#${id}`,
                username,
                email,
                password: hashedPassword
            }
        }

        await putItem(newUserParams)

        const payload = {
            id: newUserParams.Item.userId,
            email: newUserParams.Item.email,
            username: newUserParams.Item.email
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
