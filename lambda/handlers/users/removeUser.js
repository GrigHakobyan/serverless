const {response} = require( "../../helpers/response");
const {USER_TABLE} = require( "../../helpers/constants");
const {deleteItem} = require( "../../dbfunctions");
const {authMiddleware} = require("../../middlewares/authMiddleware");

module.exports.removeUser = async (event) => {
    try {

        const {id} = await authMiddleware(event.headers)

        if(!id){
            throw new Error('Invalid request')
        }

        const userParams = {
            TableName: USER_TABLE,
            Key: {
                userId: id,
                metadata: `USER#${id}`
            },
            ReturnValues: 'ALL_OLD'
        }

        const { Attributes } = await deleteItem(userParams)

        return response(200, {
            data: Attributes
        })

    } catch (e) {
        return response(400, {
            error: e.message
        })
    }
}
