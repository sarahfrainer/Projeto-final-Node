const { verify } = require('jsonwebtoken')

function validateJWT(request, response, next) {
    try {
        const token = request.headers.authorization
      
        if (!token) {
            return response
                .status(400)
                .json({ mensagem: 'Código do JWT não consta' })
        }

        const jwt = token.split(" ")
    
        // Verifica o token JWT
        const result = verify(jwt[1], process.env.JWT_SECRET)
        
         // Adiciona o ID do usuário na requisição
        request.userId = result.id

        next()
    } catch (error) {
        console.log(error)
        if(error.message === "jwt malformed" || error.message === "jwt expired") {
            response.status(401).json({ mensagem: 'O Código do JWT é inválido' })
        } else {
            response.status(500).json({ mensagem: 'A requisição falhou' })
        }
    }

}

module.exports = validateJWT