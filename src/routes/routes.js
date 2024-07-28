const { Router } = require('express')
const usersRoutes = require ("./user.routes")
const LocationsRoutes = require ("./locations.routes")

const routes = new Router()

routes.use('/users', usersRoutes)
routes.use('/locations', LocationsRoutes)

module.exports = routes