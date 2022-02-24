const {response} = require("../../helpers/response");

const {USER_TABLE} = require("../../helpers/constants");
const {queryTable} = require("../../dbfunctions");

module.exports.getUserCars = async (event) => {
    try {
        const {id} = event.requestContext.authorizer

        if(!id) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            KeyConditionExpression: "userId = :userId AND begins_with(metadata, :car)",
            ExpressionAttributeValues: {
                ":userId": id,
                ":car": "CAR"
            },
            Limit: 25
        }

        const { Items } = await queryTable(params)

        const cars = Items.map(car => ({
            id: car.metadata.split('#')[1],
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
