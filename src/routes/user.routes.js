const { Router } = require('express');
const UserController = require('../controllers/UserController')

const usersRoutes = new Router;

usersRoutes.post('/register', UserController.register

    /*
    swagger.tags = ['Users']
    #swagger.description = 'Endpoint para cadastrar um usuário',
        #swagger.parameters['newUser'] = {
            in: 'body',
            description: 'Informações do usuário',
            required: true,
            schema: { 
                $nome: 'Sarah Frainer',
                $gender: 'Feminino',
                $cpf: '123.456.789-00',
                $address: 'Rua Exemplo, 123, Bairro, Cidade, Estado, CEP 12345-678',
                $birthdate: '1990-01-01',
                $email: 'sarah@examplo.com',
                $password: 'Sarah123'
            }
        },
    */

);
usersRoutes.post('/login', UserController.login

    /*
swagger.tags = ['Users']
#swagger.description = 'Endpoint para logar o usuário',
    #swagger.parameters['loginUser'] = {
        in: 'body',
        description: 'Informações de login',
        required: true,
        schema: { 
            $email: 'sarah@gmail.com',
            $password: 'Sarah123'
        }
    },

*/
);

module.exports = usersRoutes