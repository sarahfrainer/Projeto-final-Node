const {Router} = require('express');
const LocationsController = require('../controllers/LocationsController')

const locationsRoutes = new Router;

locationsRoutes.post('/', LocationsController.create);
locationsRoutes.get('/', LocationsController.listAll);
locationsRoutes.get('/:id', LocationsController.listOne)
locationsRoutes.delete('/:id', LocationsController.delete)
locationsRoutes.put('/:id', LocationsController.update)


module.exports = usersRoutes