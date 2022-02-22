const {response} = require("../../helpers/response");
const {authMiddleware} = require("../../middlewares/authMiddleware");
const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {USER_TABLE} = require("../../helpers/constants");
const {updateItem} = require("../../dbfunctions");


module.exports.updateCar = async (event) => {
    try {
        const {id} = await authMiddleware(event.headers)

        if(!id) {
            throw new Error('Invalid request')
        }

        const {carId, carName, carModel} = parseBodyToJSON(event.body)

        if(!carId || !carName || !carModel) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            Key: {
                userId: id,
                metadata: `CAR#${carId}`
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
