const { getUser, getUsers} = require('./handlers/users')
const {getCar, getCars, createCar, getUserCars, updateCar, removeCar, removeUserCars} = require('./handlers/cars')
const {auth, check} = require('./handlers/authorization')

console.log(11)

module.exports = {
    // User methods
    getUser,
    getUsers,

    // Car methods
    getCar,
    getCars,
    createCar,
    getUserCars,
    updateCar,
    removeCar,
    removeUserCars,

    // Authorization methods
    auth,
    check
}

