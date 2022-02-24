const {response} = require("../../helpers/response");
const {USER_TABLE} = require("../../helpers/constants");
const {queryTable} = require("../../dbfunctions");


module.exports.getUser = async (event) => {
    try {

        const id = event.pathParameters?.id

        const {id: userId} = event.requestContext.authorizer

        if(!userId) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            KeyConditionExpression: "userId = :userId AND begins_with(metadata, :user)",
            ExpressionAttributeValues: {
                ':userId': id,
                ':user': 'USER'
            },
            ProjectionExpression: ['userId', 'username', 'email']
        }

        const user = await queryTable(params)

        if(!user.Count === 0) {
            throw new Error('User not found')
        }

        return response(200, {
            data: user.Items[0]
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
