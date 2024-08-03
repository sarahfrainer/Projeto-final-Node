const { Router } = require('express');
const LocationsController = require('../controllers/LocationsController');

const locationsRoutes = new Router();

locationsRoutes.post('/', LocationsController.create
    /*
    swagger.tags = ['TrainingLocations']
    #swagger.description = 'Criação de local para treino',
    #swagger.parameters['LocationCreate'] = {
        in: 'body',
        description: 'Informações sobre o local de treino',
        required: true,
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Academia +' },
                description: { type: 'string', example: 'Academia de artes marciais' },
                locality: { type: 'string', example: 'Centro' },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
    #swagger.responses[201] = {
        description: 'Local de treino criado!',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Academia +' },
                description: { type: 'string', example: 'Academia de artes marciais' },
                locality: { type: 'string', example: 'Centro' },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'O nome é obrigatório' }
            }
        }
    },
    #swagger.responses[409] = {
        description: 'CEP já cadastrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Um local já foi criado nesse CEP.' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao criar o local de treino',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Erro ao cadastrar o local' }
            }
        }
    }
    */
);

locationsRoutes.get('/', LocationsController.listAll
    /*
    swagger.tags = ['TrainingLocations']
    #swagger.description = 'Solicitar locais para treino por usuário',
    #swagger.security = [{
        bearerAuth: []
    }]
    #swagger.responses[200] = {
        description: 'Locais de treino encontrados',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Academia +' },
                    description: { type: 'string', example: 'Academia de artes marciais' },
                    locality: { type: 'string', example: 'Centro' },
                    cep: { type: 'string', example: '12345-678' },
                    user_id: { type: 'integer', example: 1 }
                }
            }
        }
    },
    #swagger.responses[404] = {
        description: 'Nenhum local encontrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Não foi encontrado nenhum local' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao listar os locais',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Houve um erro ao listar os locais' }
            }
        }
    }
    */
);

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
        description: 'Local de treino encontrado!',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Academia +' },
                description: { type: 'string', example: 'Academia de artes marciais' },
                locality: { type: 'string', example: 'Centro' },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Local não encontrado' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao buscar o local',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Erro ao buscar o local' }
            }
        }
    }
    */
);

locationsRoutes.get('/:id/maps', LocationsController.map
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
        description: 'Link do Google Maps do local resgatado',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Academia +' },
                googleMapsLink: { 
                    type: 'string',
                    example: 'https://www.google.com/maps?q=40.0000,-74.0000'
                }
            }
        }
    },
    #swagger.responses[404] = {
        description: 'CEP não encontrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Cep não encontrado' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao resgatar o link do Google Maps',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Houve um erro ao requisitar o link do Google Maps' }
            }
        }
    }
    */
);

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
    #swagger.responses[200] = {
        description: 'Local excluído!',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Local com id 1 excluído com sucesso!' }
            }
        }
    },
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Local não encontrado' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao excluir o local',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Erro ao excluir o local' }
            }
        }
    }
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
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Academia XYZ' },
                description: { type: 'string', example: 'Academia completa com todos os equipamentos necessários' },
                locality: { type: 'string', example: 'Centro' },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
    #swagger.responses[200] = {
        description: 'Local atualizado!',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Academia XYZ' },
                description: { type: 'string', example: 'Academia completa com todos os equipamentos necessários' },
                locality: { type: 'string', example: 'Centro' },
                cep: { type: 'string', example: '12345-678' },
                user_id: { type: 'integer', example: 1 }
            }
        }
    },
    #swagger.responses[404] = {
        description: 'Local não encontrado',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Local não encontrado' }
            }
        }
    },
    #swagger.responses[400] = {
        description: 'Dados inválidos para atualização',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Dados inválidos' }
            }
        }
    },
    #swagger.responses[500] = {
        description: 'Erro ao atualizar o local',
        schema: {
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Erro ao atualizar o local' }
            }
        }
    }
    */
);

module.exports = locationsRoutes;
