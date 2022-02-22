const { DynamoDB } = require("aws-sdk");
const { REGION } = require('./constants')

module.exports.dynamo = new DynamoDB.DocumentClient({region: REGION})
