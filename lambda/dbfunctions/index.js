const { dynamo } = require('../helpers/dynamo')

module.exports.getItem = async (params) => {
    return dynamo.get(params).promise()
}

module.exports.getItems = async (params) => {
    return dynamo.get(params).promise()
}

module.exports.putItem = async (params) => {
    return dynamo.put(params).promise()
}

module.exports.updateItem = async (params) => {
    return dynamo.update(params).promise()
}

module.exports.deleteItem = async (params) => {
    return dynamo.delete(params).promise()
}


module.exports.scanTable = async (params) => {
    return dynamo.scan(params).promise()
}

module.exports.queryTable = async (params) => {
    return dynamo.query(params).promise()
}

module.exports.batchWriteItems = async (params) => {
    return dynamo.batchWrite(params).promise()
}
