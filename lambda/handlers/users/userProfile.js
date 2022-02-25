const {response} = require("../../helpers/response");
const {USER_TABLE} = require("../../helpers/constants");
const {getItem} = require("../../dbfunctions");


module.exports.userProfile = async (event) => {
    try {
        const {id} = event.requestContext.authorizer

        if(!id) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            Key: {
                userId: id,
                metadata: `USER#${id}`
            },
            AttributesToGet: ['username', 'email']
        }


        const user = await getItem(params)

        if(!user.Item) {
            throw new Error('User not found')
        }

        return response(200, {
            data: user.Item
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
