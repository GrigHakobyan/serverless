const { DynamoDB } = require("aws-sdk");

module.exports.dynamo = new DynamoDB.DocumentClient()
