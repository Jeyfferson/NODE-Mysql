#CRUD Simples com Node.js, MySQL e Express

Descrição do Projeto

Este é um projeto simples de CRUD (Create, Read, Update, Delete) desenvolvido utilizando Node.js para o backend e Express Handlebars para o frontend. O objetivo é demonstrar a conexão com MySQL, o uso do framework Express e a implementação de upload de arquivos, garantindo um sistema funcional e organizado.

Tecnologias Utilizadas

Node.js - Ambiente de execução JavaScript no servidor.

MySQL - Banco de dados relacional utilizado para armazenar informações.

Express.js - Framework para criar e gerenciar rotas no backend.

Express-Handlebars - Template engine para renderizar o frontend.

Bootstrap - Biblioteca CSS para estilização responsiva.

Multer - Middleware para manipulação de upload de arquivos.

Instalação

Antes de iniciar, é necessário ter o Node.js e o MySQL instalados em sua máquina.

Clone este repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Acesse a pasta do projeto:

cd nome-do-projeto

Instale as dependências:

npm install

Configure o banco de dados MySQL:

Crie um banco de dados chamado crud_db.

Execute o script SQL localizado em database/script.sql para criar as tabelas.

Configure as credenciais do banco no arquivo .env.

Inicie o servidor:

npm start

Acesse no navegador:

http://localhost:3000

Funcionalidades Implementadas

Backend:

Conexão com MySQL: Configurado utilizando mysql2.

Express.js: Rotas criadas para gerenciar as operações CRUD.

Manipulação de SQL: Uso de consultas para inserir, atualizar, listar e excluir dados.

Upload de Arquivos: Implementado com Multer para armazenar arquivos enviados pelos usuários.

Frontend:

Express-Handlebars: Utilizado para renderizar as páginas dinâmicas.

Bootstrap: Aplicado para estilização responsiva e componentes prontos.

Estrutura do Projeto

├── database
│   ├── script.sql          # Script para criar tabelas no MySQL
├── public
│   ├── uploads             # Pasta para armazenar arquivos enviados
│   ├── css                 # Arquivos CSS
├── views
│   ├── layouts
│   │   ├── main.handlebars # Layout principal
│   ├── home.handlebars     # Tela inicial
├── routes
│   ├── index.js            # Arquivo de rotas do Express
├── .env                    # Configuração de credenciais do banco
├── app.js                  # Arquivo principal do servidor
├── package.json            # Dependências e scripts do projeto

Contribuição

Sinta-se à vontade para contribuir com melhorias, relatando problemas ou sugerindo novas funcionalidades. Basta fazer um fork do repositório e enviar um pull request.

Licença

Este projeto está sob a licença MIT - consulte o arquivo LICENSE para mais detalhes.

