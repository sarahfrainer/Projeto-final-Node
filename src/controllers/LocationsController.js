const TrainingLocations = require('../models/TrainingLocations');
const { getGoogleMapsLinkFromCep } = require('../services/map.service');

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

            if (!data.cep) {
                return response.status(400).json({ mensagem: 'O CEP é obrigatório' });
            }

            const cepExists = await TrainingLocations.findOne({
                where: { cep: data.cep }
            });

            if (cepExists) {
                return response.status(409).json({ mensagem: 'Um local já foi criado nesse CEP.' });
            }

            if (!data.user_id) {
                return response.status(400).json({ mensagem: 'O ID de usuário é obrigatório' });
            }

            const newLocation = await TrainingLocations.create(data);
            return response.status(201).json({
                id: newLocation.id,
                name: newLocation.name,
                description: newLocation.description,
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
            console.log(error);
            response.status(500).json({ mensagem: 'Houve um erro ao listar os locais' });
        }
    }

    async listOne(request, response) {
        try {
            const { local_id } = request.params;
            const user_id = request.userId;

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
            const { local_id } = request.params;
            const user_id = request.userId;

            const location = await TrainingLocations.findOne({
                where: { id: local_id, user_id }
            });

            if (!location) {
                return response.status(404).json({ message: 'Local não encontrado' });
            }

            await TrainingLocations.destroy({ where: { id: local_id } });
            return response.status(200).json({ message: `Local com id ${local_id} excluído com sucesso!` });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Erro ao excluir o local' });
        }
    }

    async update(request, response) {
        try {
            const { local_id } = request.params;
            const user_id = request.userId;
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
                return response.status(404).json({ message: 'Local não encontrado' });
            }

            // Verifica se o novo CEP já existe para outro local
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
            console.log(error);
            return response.status(500).json({ message: 'Erro ao atualizar o local' });
        }
    }

    async Map (request, response) {
        try {
            const user_id = request.userId;
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

            const mapLink = await MainLink(location.cep);

            return response.json({
                name: location.name,
                googleMapsLink: mapLink
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Houve um erro ao requisitar o link do Google Maps' });
        }
    }

}

module.exports = new LocationsController();