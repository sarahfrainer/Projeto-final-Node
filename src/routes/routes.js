const { Router } = require('express')
const usersRoutes = require ("./user.routes")
const LocationsRoutes = require ("./locations.routes")
const validateJWT = require('../middlewares/validateJWT')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')

const routes = new Router()

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



routes.use('/users', usersRoutes)
routes.use('/locations', validateJWT, LocationsRoutes)

module.exports = routes