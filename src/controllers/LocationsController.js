/* 7. Implementação do Cadastro de Novo Local
Criar a rota para cadastro de Novo Local: POST (/local)
Desenvolver a funcionalidade de cadastro de novos locais de Treino. O local cadastrado deve estar vinculado a um usuário. - Ou seja, ele precisa estar logado
Realizar a validação dos dados enviados pelo usuário e garantir a integridade dos dados no banco de dados.

8 - Implementação das Rotas para Listar Locais do Usuário Autenticado
Criar a rota para listar todos os locais cadastrados pelo usuário autenticado: GET (/local).
Garantir que apenas o usuário autenticado tenha acesso a essas informações.

9 - Implementação das Rotas para Listar Informações de um Local Específico do Usuário
Desenvolver as rotas para listar informações detalhadas de um local específico cadastrado pelo usuário: GET (/local/:local_id).
Garantir que apenas o usuário que cadastrou o local tenha acesso a essas informações.

10 - Implementação das Rotas para Excluir e Alterar Informações de um Local Específico do Usuário
Criar as rotas para excluir e alterar informações de um local específico cadastrado pelo usuário. DELETE(/local/:local_id), PUT(/local/:local_id)
Implementar validações e garantir que apenas o usuário que cadastrou o local possa realizar essas operações.
*/

const TrainingLocations = require('../models/TrainingLocations')

class LocationsController {

    async create(request, response) {
        try {
            const data = request.body;

            if (!data.name) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome é obrigatório' });
            }

            if (!data.description) {
                return response
                    .status(400)
                    .json({ mensagem: 'A descrição é obrigatória' });
            }

            if (!data.coordinates) {
                return response
                    .status(400)
                    .json({ mensagem: 'As coordenadas são obrigatórias' });
            }
            const user = await User.create({
                id: novoLivro.id,
                name: data.name,
                gender: data.gender,
                cpf: data.cpf,
                adress: data.adress,
                birthdate: data.birthdate,
                email: data.email,
                password_hash: data.password
            })
            const coordinatesExists = await TrainingLocations.findOne({
                where: {
                    coordinates: data.coordinates
                }
            });

            if (coordinatesExists) {
                return response
                    .status(409)
                    .json({ mensagem: 'Um local já foi criado nessas coordenadas' });
            }

            if (!data.cep) {
                return response
                    .status(400)
                    .json({ mensagem: 'O CEP é obrigatório' });
            }

            //voltar para pegar o id do usuário automaticamente quando aplicar o JWT

            if (!data.usuario_id) {
                return response
                    .status(400)
                    .json({ mensagem: 'O ID de usuário é obrigatório' });
            }

            const newLocation = await TrainingLocations.create(data);
            return response.status(201).json({
                id: newLocation.id,
                name: newLocation.name,
                description: newLocation.description,
                coordinates: newLocation.coordinates,
                cep: newLocation.cep,
                usuario_id: newLocation.usuario_id
            });

        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Erro ao cadastrar o local' });
        }}

    
}

module.exports = new LocationsController();