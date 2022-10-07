const { CognitoIdentityServiceProvider } = require('aws-sdk')


const cognito = new CognitoIdentityServiceProvider()

module.exports.cognito = cognito
