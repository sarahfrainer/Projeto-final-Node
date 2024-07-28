const { Router } = require('express')
const usersRoutes = require ("./user.routes")
const LocationsRoutes = require ("./locations.routes")
const validateJWT = require('../middlewares/validateJWT')

const routes = new Router()

routes.use('/users', usersRoutes)
routes.use('/locations', validateJWT, LocationsRoutes)

module.exports = routes