const {getCar} = require('./getCar')
const {getCars} = require('./getCars')
const {createCar} = require('./createCar')
const {getUserCars} = require('./getUserCars')
const {updateCar} = require('./updateCar')
const {removeCar} = require('./removeCar')
const {removeUserCars} = require('./removeUserCars')

module.exports = {
    getCars,
    getCar,
    createCar,
    getUserCars,
    updateCar,
    removeCar,
    removeUserCars
}
