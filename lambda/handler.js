const {removeUser, loginUser,registerUser, updateUser, getUser, getUsers} = require('./handlers/users')
const {getCar, getCars, createCar, getUserCars, updateCar, removeCar} = require('./handlers/cars')


module.exports = {
    // User methods
    registerUser,
    loginUser,
    removeUser,
    updateUser,
    getUser,
    getUsers,

    // Car methods
    getCar,
    getCars,
    createCar,
    getUserCars,
    updateCar,
    removeCar
}

