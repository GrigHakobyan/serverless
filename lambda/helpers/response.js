module.exports.response = (statusCode, body) => {
    const {data = {}, error = '', ...otherParams} = body

    const config = {
        isBase64Encoded: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }

    if(error)
        return {
            statusCode,
            body: JSON.stringify(error),
            ...config,
            ...otherParams
        }

    return {
        statusCode,
        body: JSON.stringify(data),
        ...config,
        ...otherParams
    }


}
