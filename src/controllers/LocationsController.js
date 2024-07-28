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

const TrainingLocations = require('../models/TrainingLocations');

class LocationsController {

    async create(request, response) {
        try {
            const data = request.body;

            if (!data.name) {
                return response.status(400).json({ mensagem: 'O nome é obrigatório' });
            }

            if (!data.description) {
                return response.status(400).json({ mensagem: 'A descrição é obrigatória' });
            }

            if (!data.coordinates) {
                return response.status(400).json({ mensagem: 'As coordenadas são obrigatórias' });
            }

            const coordinatesExists = await TrainingLocations.findOne({
                where: { coordinates: data.coordinates }
            });

            if (coordinatesExists) {
                return response.status(409).json({ mensagem: 'Um local já foi criado nessas coordenadas' });
            }

            if (!data.cep) {
                return response.status(400).json({ mensagem: 'O CEP é obrigatório' });
            }

            if (!data.user_id) {
                return response.status(400).json({ mensagem: 'O ID de usuário é obrigatório' });
            }

            const newLocation = await TrainingLocations.create(data);
            return response.status(201).json({
                id: newLocation.id,
                name: newLocation.name,
                description: newLocation.description,
                coordinates: newLocation.coordinates,
                cep: newLocation.cep,
                user_id: newLocation.user_id
            });

        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Erro ao cadastrar o local' });
        }
    }

    async listAll(request, response) {
        try {
            const { user_id } = request.query;

            const locations = await TrainingLocations.findAll({
                where: user_id ? { user_id: user_id } : {},
                attributes: [
                    ['name', 'nome'],
                    'user_id'
                ],
                order: [['name', 'DESC']]
            });

            if (locations.length === 0) {
                return response.status(404).json({ mensagem: 'Não foi encontrado nenhum local' });
            }

            return response.json(locations);
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Houve um erro ao listar os locais' });
        }
    }

    async listOne(request, response) {
        try {
            const { id } = request.params;
            const user_id = request.userId;

            const location = await TrainingLocations.findOne({
                where: {
                    id: id,
                    user_id: user_id
                },
                attributes: [
                    ['id', 'identificador'],
                    ['name', 'nome'],
                    ['description', 'descrição'],
                    ['coordinates', 'coordenadas'],
                    ['cep', 'cep'],
                    'user_id'
                ]
            });

            if (!location) {
                return response.status(404).json({ message: 'Local não encontrado' });
            }

            return response.status(200).json(location);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro ao buscar o local' });
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            const user_id = request.userId;

            const location = await TrainingLocations.findOne({
                where: {
                    id: id,
                    user_id: user_id
                }
            });

            if (!location) {
                return response.status(404).json({ message: 'Local não encontrado' });
            }

            await TrainingLocations.destroy({ where: { id } });
            return response.status(200).json({ message: `Local com id ${id} excluído com sucesso!` });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro ao excluir o local' });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
            const user_id = request.userId;
            const data = request.body;

            if (!data.name) {
                return response.status(400).json({ mensagem: 'O nome é obrigatório' });
            }

            if (!data.description) {
                return response.status(400).json({ mensagem: 'A descrição é obrigatória' });
            }

            if (!data.coordinates) {
                return response.status(400).json({ mensagem: 'As coordenadas são obrigatórias' });
            }

            const coordinatesExists = await TrainingLocations.findOne({
                where: { coordinates: data.coordinates }
            });

            if (coordinatesExists) {
                return response.status(409).json({ mensagem: 'Um local já foi criado nessas coordenadas' });
            }

            if (!data.cep) {
                return response.status(400).json({ mensagem: 'O CEP é obrigatório' });
            }

            const location = await TrainingLocations.findOne({
                where: {
                    id: id,
                    user_id: user_id
                }
            });

            if (!location) {
                return response.status(404).json({ message: 'Local não encontrado' });
            }

            location.name = data.name || location.name;
            location.description = data.description || location.description;
            location.coordinates = data.coordinates || location.coordinates;
            location.cep = data.cep || location.cep;

            await location.save();

            return response.status(200).json(location);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro ao atualizar o local' });
        }
    }
}

module.exports = new LocationsController();

