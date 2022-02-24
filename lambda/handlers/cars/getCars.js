const {response} = require("../../helpers/response");

const {scanTable} = require("../../dbfunctions");
const {USER_TABLE, GSI_CARNAME} = require("../../helpers/constants");


module.exports.getCars = async (event) => {
    try {
        const {id} = event.requestContext.authorizer

        if(!id) {
            throw new Error('Invalid request')
        }

        const params = {
            TableName: USER_TABLE,
            IndexName: GSI_CARNAME,
            Limit: 25,
            AttributesToGet: ['metadata', 'carName', 'carModel']
        }

        let cars = await scanTable(params)

        cars = cars.Items.map(car => {
            return {
                id: car.metadata.split('#')[1],
                carName: car.carName,
                carModel: car.carModel
            }
        })

        return response(200, {
            data: cars
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
