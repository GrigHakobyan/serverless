const {response} = require("../../helpers/response");

const {scanTable} = require("../../dbfunctions");
const {USER_TABLE, GSI_CARNAME} = require("../../helpers/constants");


module.exports.getCars = async (event) => {
    try {

        const params = {
            TableName: USER_TABLE,
            IndexName: GSI_CARNAME,
            Limit: 25,
            AttributesToGet: ['carId', 'carName', 'carModel']
        }

        let cars = await scanTable(params)

        cars = cars.Items.map(car => {
            return {
                id: car.carId,
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
