const {response} = require("../../helpers/response");

const {USER_TABLE} = require("../../helpers/constants");
const {queryTable} = require("../../dbfunctions");

module.exports.getUserCars = async (event) => {
    try {
        const username = event.requestContext?.authorizer?.claims?.['cognito:username']

        const params = {
            TableName: USER_TABLE,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": username
            },
            Limit: 25
        }

        const { Items } = await queryTable(params)

        const cars = Items.map(car => ({
            id: car.carId,
            carName: car.carName,
            carModel: car.carModel
        }))

        return response(200, {
            data: cars
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
