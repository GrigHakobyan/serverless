const {response} = require("../../helpers/response");

const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {USER_TABLE} = require("../../helpers/constants");
const {deleteItem} = require("../../dbfunctions");
module.exports.removeCar = async (event) => {
    try {
        const username = event.requestContext?.authorizer?.claims?.['cognito:username']

        const {carId} = parseBodyToJSON(event.body)

        if(!carId) {
            throw new Error('Invalid request carId' + carId)
        }

        const params = {
            TableName: USER_TABLE,
            Key: {
                userId: username,
                carId: carId
            },
            ReturnValues: 'ALL_OLD'
        }

        const { Attributes } = await deleteItem(params)

        return response(200, {
            data: Attributes
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
