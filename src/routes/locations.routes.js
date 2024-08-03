const {Router} = require('express');
const LocationsController = require('../controllers/LocationsController')

const locationsRoutes = new Router;

locationsRoutes.post('/', LocationsController.create
    /* swagger.tags = ['TrainingLocations']
    #swagger.description = 'Criação de local para treino',
    #swagger.parameters['LocationCreate'] = {
        in: 'body',
        description: 'Informações sobre o local de treino',
        required: true,
        schema: {
            $id: 1,
            $name: 'Academia +',
            $description: 'Academia de artes marciais',
            $locality: 'Centro',
            $coordinates: [40.0000, -74.0000],
            $cep: '12345-678',
            $user_id: 1
    }
}, */

    
);
locationsRoutes.get('/', LocationsController.listAll
     /*  swagger.tags = ['TrainingLocations']
    #swagger.description = 'Solicitar locais para treino por usuário',
    #swagger.security = [{
        bearerAuth: []
    }]
    #swagger.responses[200] = {
        description: 'Lista todos os locais de treino',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Academia +' },
                    description: { type: 'string', example: 'Academia de artes marciais' },
                    locality: { type: 'string', example: 'Centro' },
                    coordinates: { type: 'array', items: { type: 'number' }, example: [40.0000, -74.0000] },
                    cep: { type: 'string', example: '12345-678' },
                    user_id: { type: 'integer', example: 1 }
                }
            }
        }
    }, */
)
locationsRoutes.get('/:id', LocationsController.listOne

/* 
    swagger.tags = ['TrainingLocations']
    #swagger.description = 'Solicitar um local de treino específico por ID',
    #swagger.security = [{
        bearerAuth: []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer',
        example: 1
    },
    #swagger.responses[200] = {
        description: 'Detalhes do local de treinamento',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Academia +' },
                description: { type: 'string', example: 'Academia de artes marciais' },
                locality: { type: 'string', example: 'Centro' },
                coordinates: { type: 'array', items: { type: 'number' }, example: [40.0000, -74.0000] },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
*/

)

locationsRoutes.get('/:id/maps', LocationsController.Map

    /* 
        swagger.tags = ['TrainingLocations']
        #swagger.description = 'Solicitar o link do local no Google Maps',
        #swagger.security = [{
            bearerAuth: []
        }]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do local de treino',
            required: true,
            type: 'integer',
            example: 1
        },
        #swagger.responses[200] = {
        description: 'Link do Google Maps do local solicitado',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Academia +' },
                googleMapsLink: { 
                    type: 'string',
                    example: 'https://www.google.com/maps?q=-23.5505,-46.6333'
                }
            }
        }
    },
    */
    
    )

locationsRoutes.delete('/:id', LocationsController.delete
    /* 
    swagger.tags = ['TrainingLocations']
    #swagger.description = 'Excluir um local de treino específico por ID',
    #swagger.security = [{
        bearerAuth: []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer',
        example: 1
    },
    */
);

locationsRoutes.put('/:id', LocationsController.update
    /* 
    swagger.tags = ['TrainingLocations']
    #swagger.description = 'Atualizar um local de treino específico por ID',
    #swagger.security = [{
        bearerAuth: []
    }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do local de treino',
        required: true,
        type: 'integer',
        example: 1
    },
    #swagger.parameters['updateLocation'] = {
        in: 'body',
        description: 'Informações atualizadas do local de treinamento',
        required: true,
        schema: {
            $name: 'Academia XYZ',
            $description: 'Academia completa com todos os equipamentos necessários',
            $locality: 'Centro',
            $coordinates: [40.7128, -74.0060],
            $cep: '12345-678',
            $user_id: 1
        }
    },
    */
)


module.exports = locationsRoutes