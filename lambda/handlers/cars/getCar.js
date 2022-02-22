const {response} = require("../../helpers/response");
const {authMiddleware} = require("../../middlewares/authMiddleware");
const {scanTable} = require("../../dbfunctions");
const {USER_TABLE} = require("../../helpers/constants");


module.exports.getCar = async (event) => {
    try {
        const {id} = await authMiddleware(event.headers)

        if(!id) {
            throw new Error('Invalid request')
        }

        const carId = event.pathParameters?.carId


        const params = {
            TableName: USER_TABLE,
            FilterExpression: 'metadata =:car',
            ExpressionAttributeValues: {
                ':car': `CAR#${carId}`
            }
        }

        const {Items, Count} = await scanTable(params)

        let car = {}

        if(Count > 0) {
            car = {
                id: Items[0].metadata.split('#')[1],
                carName: Items[0].carName,
                carModel: Items[0].carModel
            }
        } else {
            throw new Error('Car not exist')
        }



        return response(200, {
            data: car
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
