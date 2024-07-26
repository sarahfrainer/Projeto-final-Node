<h1 align="center"> +Hoje </h1>

### Tópicos

- [Descrição do projeto](#descrição-do-projeto)

- [Funcionalidades](#funcionalidades)

- [Ferramentas utilizadas](#ferramentas-utilizadas)

- [Instalação e execução](#instalação-e-execução-do-projeto)

- [Tabelas](#tabelas-de-dados)

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


## Tabelas de dados


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