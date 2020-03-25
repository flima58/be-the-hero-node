const crypto = require('crypto');
const connection = require('../database/connection')


module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs)
    },


    async create(request, response) {
          //Estou pegando todos os parâmetros que estão sendo enviados pela URL
            const { name, email, whatsapp, city, uf } = request.body;

            const id = crypto.randomBytes(4).toString('HEX') // Gerando um ID 

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            })

    //Criação de um arquivo JSON
    return response.json({ id });
    }
};