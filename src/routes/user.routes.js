const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRoutes = new Router();

// Rota para cadastro de usuários
usersRoutes.post('/register', UserController.register);

/*
swagger.tags = ['Users']
#swagger.description = 'Endpoint para cadastrar um usuário',
#swagger.parameters['newUser'] = {
    in: 'body',
    description: 'Informações do usuário',
    required: true,
    schema: { 
        $name: 'Sarah Frainer',
        $gender: 'Feminino',
        $cpf: '123.456.789-00',
        $address: 'Rua Exemplo, 123, Bairro, Cidade, Estado, CEP 12345-678',
        $birthdate: '1990-01-01',
        $email: 'sarah@example.com',
        $password: 'Sarah123'
    }
},
#swagger.responses[201] = {
    description: 'Usuário criado!',
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            gender: { type: 'string' },
            cpf: { type: 'string' },
            address: { type: 'string' },
            birthdate: { type: 'string', format: 'date' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
        }
    }
},
#swagger.responses[400] = {
    description: 'Erro na validação dos dados',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
},
#swagger.responses[409] = {
    description: 'Conflito: CPF ou e-mail já existente',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
},
#swagger.responses[500] = {
    description: 'Problema no servidor',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
}
*/

// Rota para login de usuários
usersRoutes.post('/login', UserController.login);

/*
swagger.tags = ['Users']
#swagger.description = 'Endpoint para logar o usuário',
#swagger.parameters['loginUser'] = {
    in: 'body',
    description: 'Informações de login',
    required: true,
    schema: { 
        $email: 'sarah@example.com',
        $password: 'Sarah123'
    }
},
#swagger.responses[200] = {
    description: 'Login feito!',
    schema: {
        type: 'object',
        properties: {
            token: { type: 'string' },
            name: { type: 'string' }
        }
    }
},
#swagger.responses[400] = {
    description: 'Erro na validação dos dados',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
},
#swagger.responses[404] = {
    description: 'Conta não encontrada ou senha incorreta',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
},
#swagger.responses[500] = {
    description: 'Problema no servidor',
    schema: {
        type: 'object',
        properties: {
            mensagem: { type: 'string' }
        }
    }
}
*/

module.exports = usersRoutes;
