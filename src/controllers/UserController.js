/* Implementação das Rotas de Usuário
Criar a rota para login: POST (/login)
Criar a rota para de novos usuários: POST (/usuario).
Garantir a validação adequada dos dados. */

const User = require("../models/User")
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const cpfPattern = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/);
const allowedGenders = ['Masculino', 'Feminino', 'Outro'];

function isValidDate(dateString) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar horas, minutos, segundos e milissegundos para comparação de datas

    if (date > today) {
        return false;
    }

    return dateString === date.toISOString().split('T')[0];
}

class UserController {

    async login(request, response) {
        try {
            const data = request.body

            if (!data.email || !data.password) {
                return response
                    .status(400)
                    .json({ mensagem: 'Nome e senha são obrigatórios' })
            }

            const user = await User.findOne({
                where: {
                    email: data.email
                }
            })

            if (!user) {
                return response
                    .status(404)
                    .json({ mensagem: 'Conta não encontrada' })
            }

            const passwordOk = compareSync(data.password, user.password_hash)

            if (!passwordOk) {
                return response
                    .status(404)
                    .json({
                        mensagem: 'Senha incorreta'
                    })
            }

            // editar essa parte na hora do JWT
            const token = sign({
                id: user.id
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            response.json({
                token: token,
                name: user.name
            })

        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: 'Erro ao realizar login' })
        }
    }

    async register(request, response) {
        try {
            const data = request.body

            if (!data.name) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome é obrigatório' })
            }

            if (!allowedGenders.includes(data.gender)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O gênero é obrigatório' });
            }

            if (!data.cpf) {
                return response
                    .status(400)
                    .json({ mensagem: 'O cpf é obrigatório' })
            }

            if (cpfPattern.test(data.cpf) === false) {
                return response
                    .status(400)
                    .json({ mensagem: 'Por favor, insira um cpf válido' })
            }

            if (!data.adress) {
                return response
                    .status(400)
                    .json({ mensagem: 'O endereço é obrigatório' })
            }

            if (!data.birthdate) {
                return response
                    .status(400)
                    .json({ mensagem: 'A data de nascimento é obrigatória' })
            }

            if (!isValidDate(data.birthdate)) {
                return response
                    .status(400)
                    .json({ mensagem: 'Por favor, insira uma data de nascimento válida' });
            }

            if (!data.email) {
                return response
                    .status(400)
                    .json({ mensagem: 'O e-mail é obrigatório' })
            }

            if (emailPattern.test(data.email) === false) {
                return response
                    .status(400)
                    .json({ mensagem: 'Por favor, insira um e-mail válido' })
            }

            if (!(data.password?.length >= 6 && data.password?.length <= 18)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A senha deve ter entre 6 e 18 dígitos' })
            }

            const emailExist = await User.findOne({
                where: {
                    email: data.email
                }
            })

            if (emailExist) {
                return response
                    .status(409)
                    .json({ mensagem: 'Uma conta já foi criada nesse e-mail' })
            }

            const cpfExist = await User.findOne({
                where: {
                    cpf: data.cpf
                }
            })

            if (cpfExist) {
                return response
                    .status(409)
                    .json({ mensagem: 'Uma conta já foi criada nesse CPF' })
            }

            const user = await User.create({
                name: data.name,
                gender: data.gender,
                cpf: data.cpf,
                adress: data.adress,
                birthdate: data.birthdate,
                email: data.email,
                password_hash: data.password
            })

            response.status(201).json({
                name: user.name,
                gender: user.gender,
                cpf: user.cpf,
                adress: user.adress,
                birthdate: user.birthdate,
                email: user.email,
                createdAt: user.createdAt
            })

        } catch (error) {
            console.log(error)
            response
                .status(500)
                .json({
                    mensagem: 'Erro na hora de criar a conta'
                })
        }
    }
}

module.exports = new UserController()
