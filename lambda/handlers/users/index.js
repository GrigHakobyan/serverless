const { registerUser } = require( './registerUser')
const { loginUser } = require( './loginUser')
const { getUser } = require( './getUser')
const { getUsers } = require( './getUsers')
const { updateUser } = require( './updateUser')
const { removeUser } = require( './removeUser')

module.exports = {
    registerUser,
    loginUser,
    removeUser,
    getUsers,
    getUser,
    updateUser
}
