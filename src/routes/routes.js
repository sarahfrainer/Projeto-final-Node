const { Router } = require('express')
const usersRoutes = require ("./user.routes")
const LocationsRoutes = require ("./locations.routes")
const validateJWT = require('../middlewares/validateJWT')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')

const routes = new Router()

// Cria rota para saída da documentação Swagger. É possível acessá-la localmente quando rodar o sistema

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Rota de usuários. É pública, pois só envolve login e registro do usuário

routes.use('/users', usersRoutes)

/* 
Rotas de locais. São particulares, pois todas as rotas só podem ser cadastradas por usuário e é apenas esse usuário, depois,
que pode acessá-las, editá-las, etc.
*/

routes.use('/locations', validateJWT, LocationsRoutes)


module.exports = routes