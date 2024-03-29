const {response} = require("../../helpers/response");

const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {USER_TABLE} = require("../../helpers/constants");
const {updateItem} = require("../../dbfunctions");


module.exports.updateCar = async (event) => {
    try {
        const username = event.requestContext?.authorizer?.claims?.['cognito:username']

        const {carId, carName, carModel} = parseBodyToJSON(event.body)

        if(!carId || !carName || !carModel) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            Key: {
                userId: username,
                carId: carId
            },
            UpdateExpression: "Set carName = :carName, carModel = :carModel",
            ExpressionAttributeValues: {
                ":carName": carName,
                ":carModel": carModel
            },
            ReturnValues: 'ALL_NEW'
        }

        const { Attributes } = await updateItem(params)

        return response(200, {
            data: Attributes
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
