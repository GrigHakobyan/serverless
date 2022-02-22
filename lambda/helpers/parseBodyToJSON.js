module.exports.parseBodyToJSON = (body) => {

    if(typeof body === 'object')
        return body

    try {
        return JSON.parse(body)
    } catch (e) {
        throw new Error('Invalid body')
    }

}
