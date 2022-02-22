const { v4 } = require( 'uuid')

const {response} = require("../../helpers/response");
const {authMiddleware} = require("../../middlewares/authMiddleware");
const {GSI_CARNAME, USER_TABLE} = require("../../helpers/constants");
const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");
const {queryTable, putItem, updateItem} = require("../../dbfunctions");


module.exports.createCar = async (event) => {
    try {
        const {id} = await authMiddleware(event.headers)

        if(!id) {
            throw new Error('Invalid request')
        }

        const {carName, carModel} = parseBodyToJSON(event.body)

        const params = {
            TableName: USER_TABLE,
            IndexName: GSI_CARNAME,
            KeyConditionExpression: "#carName = :carName",
            ExpressionAttributeValues: {
                ":carName": carName
            },
            ExpressionAttributeNames: {
                "#carName": "carName"
            }
        }

        const isCarExist = await queryTable(params)

        if(isCarExist.Count > 0) {
            throw new Error('Car already exist')
        }

        const carId = v4()

        const newCarParams = {
            TableName: USER_TABLE,
            Item: {
                userId: id,
                metadata: `CAR#${carId}`,
                carName: carName,
                carModel: carModel
            }
        }

        await putItem(newCarParams)

        const car = {
            id: carId,
            carName,
            carModel
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
