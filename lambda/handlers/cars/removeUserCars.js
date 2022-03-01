const {response} = require("../../helpers/response");
const {batchWriteItems, queryTable} = require("../../dbfunctions");
const {USER_TABLE} = require("../../helpers/constants");
const {parseBodyToJSON} = require("../../helpers/parseBodyToJSON");

module.exports.removeUserCars = async (event) => {
    try {
        const username = event.requestContext?.authorizer?.claims?.['cognito:username']

        const {carsId} = parseBodyToJSON(event.body)


        const deleteParams = {
            RequestItems: {}
        }

        const deleteObject = carsId.map(id => ({
            DeleteRequest: {
                Key: {
                    userId: username,
                    carId: id
                }
            }
        }))

        deleteParams.RequestItems[USER_TABLE] = [
            ...deleteObject
        ]

        await batchWriteItems(deleteParams)

        return response(200, {
            data: 'SUCCESS'
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
