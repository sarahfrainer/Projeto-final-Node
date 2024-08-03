const axios = require('axios');
const linkMapApi = 'https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1';

async function getMapCep(cep) {
    try {
        const response = await axios.get(`${linkMapApi}&postalcode=${cep}`);

        if (!response.data || response.data.length === 0) {
            throw new Error('CEP não encontrado');
        }

        const { lat, lon, display_name } = response.data[0];

        return { latitude: lat, longitude: lon, display_name };
    } catch (error) {
        return { erro: 'Erro ao buscar o CEP' };
    }
}

async function getGoogleMaps(coordinates) {
    try {
        const { latitude, longitude } = coordinates;

        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        return googleMapsLink;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao gerar o link do Google Maps');
    }
}

async function MainLink(cep) {
    try {
        const location = await getMapCep(cep);

        if (location.erro) {
            throw new Error('Erro ao processar o CEP');
        }

        const link = await getGoogleMaps(location);
        return link;
    } catch (error) {
        console.error(error);
        return 'Erro ao extrair o link exato do Google Maps';
    }
}

module.exports = MainLink;
