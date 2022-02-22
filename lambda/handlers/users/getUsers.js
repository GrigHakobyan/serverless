const {USER_TABLE} = require( "../../helpers/constants");
const {scanTable} = require( "../../dbfunctions");
const {response} = require( "../../helpers/response");
const {authMiddleware} = require("../../middlewares/authMiddleware");

module.exports.getUsers = async (event) => {
    try {

        const {id} = await authMiddleware(event.headers)

        if(!id){
            throw new Error('Invalid request')
        }

        const usersParams = {
            TableName: USER_TABLE,
            Limit: 25,
            AttributesToGet: ['userId', 'username', 'email']
        }

        const users = await scanTable(usersParams)

        return response(200, {
            data: users.Items
        })

    } catch (e) {
        return response(400,{
            error: e.message
        })
    }
}
