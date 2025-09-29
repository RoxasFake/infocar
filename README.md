🚗 Projeto CRUD de Carros

Este projeto é um exemplo de CRUD utilizando NestJS, com arquitetura limpa, documentação automática via Swagger, e integração com banco de dados usando TypeORM.

🛠️ Setup do Projeto

Para iniciar o projeto, siga os passos abaixo para criar e configurar o ambiente.

1️⃣ Subir os containers com Docker
docker compose up -d

2️⃣ Gerar e rodar as migrations
# Gerar uma nova migration
npx typeorm-ts-node-commonjs migration:generate ./src/infraestrutura/migrations/NovaEntidadeCarro -d ./src/infraestrutura/migrations-data-source.ts

# Executar as migrations
npx typeorm-ts-node-commonjs migration:run -d ./src/infraestrutura/migrations-data-source.ts

3️⃣ Rodar os testes e iniciar o servidor
npm run test
npm start


Após o start, acesse: http://localhost:3000/swagger

para interagir com a API e visualizar a documentação.

🏗️ Arquitetura do Código

O projeto segue os seguintes princípios e padrões:

🧼 Clean Architecture

📜 Swagger para documentação da API

✅ Validadores para garantir a integridade dos dados

🛠 Code First com TypeORM

📌 Observações Importantes

Seed do Banco de Dados
O ideal seria incluir seeds com modelos e marcas pré-definidas para evitar duplicação causada por diferenças de grafia ao cadastrar carros.

Paginação & Filtros
Atualmente, a listagem de carros não possui paginação ou filtros.
Em produção, o ideal seria:

Paginação baseada na data de criação como campo de ordenação

Controle de itens por página + número da página

Autenticação
Em um ambiente real, deveria existir autenticação para validar o acesso dos usuários (middleware do NestJS).
Como o foco é o CRUD, esse ponto foi ignorado.

Soft Delete
No teste foi implementado um delete simples, mas em produção o recomendado seria soft delete para manter a rastreabilidade dos dados.