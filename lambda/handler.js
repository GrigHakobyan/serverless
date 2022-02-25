const {removeUser, loginUser,registerUser, updateUser, getUser, getUsers, userProfile} = require('./handlers/users')
const {getCar, getCars, createCar, getUserCars, updateCar, removeCar} = require('./handlers/cars')
const {auth, check} = require('./handlers/authorization')


module.exports = {
    // User methods
    registerUser,
    loginUser,
    removeUser,
    updateUser,
    getUser,
    getUsers,
    userProfile,

    // Car methods
    getCar,
    getCars,
    createCar,
    getUserCars,
    updateCar,
    removeCar,

    // Authorization methods
    auth,
    check
}

