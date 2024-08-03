const TrainingLocations = require('../models/TrainingLocations');
const { getGoogleMapsLinkFromCep } = require('../services/map.service');

class LocationsController {

    // Rota para criação de novo local de treino
    async create(request, response) {
        try {
            const data = request.body;
            const user_id = request.userId; // Obtém o ID do usuário pelo JWT

            if (!data.name) {
                return response.status(400).json({ mensagem: 'O nome é obrigatório' });
            }

            if (!data.description) {
                return response.status(400).json({ mensagem: 'A descrição é obrigatória' });
            }

            if (!data.cep) {
                return response.status(400).json({ mensagem: 'O CEP é obrigatório' });
            }

            const cepExists = await TrainingLocations.findOne({
                where: { cep: data.cep }
            });

            if (cepExists) {
                return response.status(409).json({ mensagem: 'Um local já foi criado nesse CEP.' });
            }

            data.user_id = user_id; // Adiciona o ID do usuário ao objeto de dados

            const newLocation = await TrainingLocations.create(data);
            return response.status(201).json({
                id: newLocation.id,
                name: newLocation.name,
                description: newLocation.description,
                cep: newLocation.cep,
                user_id: newLocation.user_id
            });

        } catch (error) {
            console.error(error);
            response.status(500).json({ mensagem: 'Erro ao cadastrar o local' });
        }
    }

    // Rota para listar todos os locais de treino do usuário

    async listAll(request, response) {
        try {
            const user_id = request.userId; 

            const locations = await TrainingLocations.findAll({
                where: { user_id },
                attributes: ['id', 'name', 'description', 'cep', 'user_id'],
                order: [['name', 'ASC']]
            });

            if (locations.length === 0) {
                return response.status(404).json({ mensagem: 'Não foi encontrado nenhum local' });
            }

            return response.json(locations);
        } catch (error) {
            console.error(error);
            response.status(500).json({ mensagem: 'Houve um erro ao listar os locais' });
        }
    }

    // Rota para listar um local de treino do usuário

    async listOne(request, response) {
        try {
            const { local_id } = request.params;
            const user_id = request.userId; // Obtém o ID do usuário pelo JWT

            const location = await TrainingLocations.findOne({
                where: { id: local_id, user_id },
                attributes: [
                    ['id', 'identificador'],
                    ['name', 'nome'],
                    ['description', 'descrição'],
                    ['cep', 'cep'],
                    'user_id'
                ]
            });

            if (!location) {
                return response.status(404).json({ mensagem: 'Local não encontrado' });
            }

            return response.status(200).json(location);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ mensagem: 'Erro ao buscar o local' });
        }
    }

    // Rota para deletar um local de treino do usuário

    async delete(request, response) {
        try {
            const { local_id } = request.params;
            const user_id = request.userId; // Obtém o ID do usuário pelo JWT

            const location = await TrainingLocations.findOne({
                where: { id: local_id, user_id }
            });

            if (!location) {
                return response.status(404).json({ mensagem: 'Local não encontrado' });
            }

            await TrainingLocations.destroy({ where: { id: local_id } });
            return response.status(200).json({ mensagem: `Local com id ${local_id} excluído com sucesso!` });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ mensagem: 'Erro ao excluir o local' });
        }
    }

    // Rota para atualizar um local de treino do usuário

    async update(request, response) {
        try {
            const { local_id } = request.params;
            const user_id = request.userId; // Obtém o ID do usuário pelo JWT
            const data = request.body;

            if (!data.name) {
                return response.status(400).json({ mensagem: 'O nome é obrigatório' });
            }

            if (!data.description) {
                return response.status(400).json({ mensagem: 'A descrição é obrigatória' });
            }

            if (!data.cep) {
                return response.status(400).json({ mensagem: 'O CEP é obrigatório' });
            }

            const location = await TrainingLocations.findOne({
                where: { id: local_id, user_id }
            });

            if (!location) {
                return response.status(404).json({ mensagem: 'Local não encontrado' });
            }

            if (location.cep !== data.cep) {
                const cepExists = await TrainingLocations.findOne({ where: { cep: data.cep } });

                if (cepExists) {
                    return response.status(409).json({ mensagem: 'Um local já foi criado nesse CEP.' });
                }
            }

            location.name = data.name || location.name;
            location.description = data.description || location.description;
            location.cep = data.cep || location.cep;

            await location.save();

            return response.status(200).json(location);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ mensagem: 'Erro ao atualizar o local' });
        }
    }

    // Função para resgatar link do google maps, disponibilizando a localização de um local de treino específico

    async map(request, response) {
        try {
            const user_id = request.userId; // Obtém o ID do usuário pelo JWT
            const { id } = request.params; // Recebe o ID do local na requisição

            // Busca o local pelo ID e verifica se pertence ao usuário
            const location = await TrainingLocations.findOne({
                where: {
                    id: id,
                    user_id: user_id
                },
                attributes: ['id', 'name', 'description', 'cep', 'user_id']
            });

            if (!location) {
                return response.status(404).json({ mensagem: 'Cep não encontrado' });
            }

            const mapLink = await getGoogleMapsLinkFromCep(location.cep);

            return response.json({
                name: location.name,
                googleMapsLink: mapLink
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ mensagem: 'Houve um erro ao requisitar o link do Google Maps' });
        }
    }

}

module.exports = new LocationsController();