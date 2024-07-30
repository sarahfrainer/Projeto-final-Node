<h1 align="center"> +Hoje </h1>

### Tópicos

- [Descrição do projeto](#descrição-do-projeto)

- [Funcionalidades](#funcionalidades)

- [Ferramentas utilizadas](#ferramentas-utilizadas)

- [Instalação e execução](#instalação-e-execução-do-projeto)

- [Banco de dados](#banco-de-dados)

- [Tabelas](#tabelas-de-dados)

- [JWT como Middleware](#utilizando-o-JWT-como-Middleware)

- [Melhorias possíveis](#melhorias-possíveis)

- [Desenvolvimento](#desenvolvimento)


## Descrição do projeto


+Hoje é um projeto backend desenvolvido para um site de gerenciamento de exercícios e de locais para práticas esportivas. O nome foi inspiração na ideia de criar "mais hojes" (ou seja, mais longevidade) a partir do cuidado com a saúde. Assim, o objetivo do sistema é incentivar a prática de atividade física e o fim do sedentarismo.

O sistema conta com sistema de autenticação e rotas privadas, sendo que este último apenas não inclui a página de login do usuário. Ao logar no sistema, os usuários poderão cadastrar novos locais de exercícios, encontrar pontos próximos, visualizar informações sobre os os exercícios em cada ponto e registrar suas próprias contribuições para o sistema. O sistema já carrega informações prévias, mas o detalhe é que os cadastros de cada usuário são privado. Assim, apenas o usuário que cadastrou um local pode consultá-lo depois, por exemplo.


## Funcionalidades

&#10003; `Funcionalidade 1:` Login e Cadastro de Usuários.

&#10003; `Funcionalidade 2:` Locais de Treino (cadastro, visualização, entre outros).

&#10003; `Funcionalidade 3:` Mecanismo de Autenticação (JWT).

&#10003; `Funcionalidade 4:` Validação via Middleware.

&#10003; `Funcionalidade 5:` Informações críticas do ambiente armazenadas em variáveis (env).


## Ferramentas utilizadas

<img src="https://img.shields.io/badge/API_Rest-005571?style=for-the-badge&logo=api&logoColor=white/">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">

* Swagger;
* Tokens JWT;


## Instalação e execução do projeto

```
git clone https://github.com/sarahfrainer/Projeto-final-Node.git
npm install nodemon
npm install express sequelize pg pg-hstore dotenv bcryptjs cors jsonwebtoken
npm install swagger-ui-express

```

```
Duplicar o arquivo ".env_example"
Renomear para ".env"
Configurar com as suas informações críticas de ambiente
```

```
cd src
node index.js
```

## Banco de dados

Interface utilizada: PgAdmin.

Passo a passo:
1. Criar Repositório DataBase chamado "+Hoje".
2. Rodar migrations com o comando: npx sequelize db:migrate.


## Tabelas de dados

### Tabela de Usuários

| Coluna    | Tipo       | Restrição                 |
|-----------|------------|---------------------------|
| id        | INTEGER    |Auto-increment, Primary Key|
| name      | STRING     | Não nulo                  |
| gender    | ENUM       | Não nulo                  |
| cpf       | STRING     | Não nulo, Único           |
| address   | STRING     | Não nulo                  |
| birthdate | DATE       | Não nulo                  |
| email     | STRING     | Não nulo, Único           |
| password  | STRING     | Não nulo                  |


### Tabela de Locais de Treino

| Coluna         | Tipo              | Restrição                                         |
|----------------|-------------------|---------------------------------------------------|
| id             | INTEGER           | Auto-increment, Primary Key                       |
| name           | STRING            | Não nulo                                          |
| description    | TEXT              | Não nulo                                          |
| locality       | STRING            | Não nulo                                          |
| coordinates    | ARRAY('FLOAT')    | Não nulo                                          |
| CEP            | STRING            | Não nulo                                          |
| userId         | INTEGER           | Não nulo, Referência à tabela de usuários         |


### Relacionamentos

- Um usuário pode ter vários locais de treino associados.
- Um local de treino pertence a um único usuário.


## Utilizando o JWT como Middleware

No projeto, foi utilizado o JWT como Middleware para uma segurança extra. Dessa forma, nas rotas privadas (rotas que envolvem os locais), é preciso utilizar o token para fazer as requisições. No Postman, o passo a passo para isso é:


1. Realize o cadastro de um usuário utilizando a rota criada para este fim (Modo POST + endpoint "/users/register" + informações requisitadas no body);
2. Realize login com esse usuário. Como resposta, aparecerá o token. Copie-o.
3. Selecione a rota de local desejada. No header da requisição, selecione "bearer token" e cole o código JWT. Finalize a requisição com os outros procedimentos que forem necessários (por exemplo, preenchendo o body no caso do cadastro de um local).


## Melhorias possíveis

Melhorias que poderiam ter sido aplicadas ao projeto:

1. 
2. 
3. 
4. 
5. 
6. 


## Desenvolvimento

Projeto desenvolvido por Sarah Beatriz Frainer, como trabalho final do módulo Back-End do curso "FuturoDev", do Sesi-SENAI.