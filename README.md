# 🏁 Infocar

Projeto de requisitos (teste) para Infosistemas — API CRUD de carros com **NestJS**, **TypeORM** e **Clean Architecture**.


## 🧐 Sobre

Este projeto foi criado como parte de um teste para a empresa Infosistemas.  
O objetivo é construir uma API para gerenciar **carros** (modelos, marcas, operações de CRUD), com validações, documentação e boas práticas arquiteturais.

---

## 🛠 Tecnologias

Aqui estão as principais tecnologias e ferramentas utilizadas:

- **NestJS**
- **TypeScript**
- **TypeORM** (com abordagem *Code First*)
- **Swagger** para documentação automática da API
- **Docker / Docker Compose**
- **DTOs e Validadores** para integridade dos dados
- **Clean Architecture** para separação de responsabilidades

---

## ✅ Funcionalidades

- Criar / ler / atualizar / deletar (CRUD) registros de carros  
- Documentação de API via Swagger  
- Validações nos dados de entrada  
- Migrações com TypeORM  

---

## 🏛 Arquitetura

O projeto adota princípios de **Clean Architecture**, com separação entre camadas:

- **Controller / Routes** — recebimento e resposta HTTP  
- **Service / Use Cases** — lógica de negócio  
- **Repositories / Infra** — acesso a dados via TypeORM  
- **Entity / Models / DTOs** — definição de entidades e validações  

Clone este repositório


git clone https://github.com/RoxasFake/infocar.git

cd infocar

Suba os containers com Docker

docker compose up -d

Gere e execute as migrations


# Gerar nova migration
npx typeorm-ts-node-commonjs migration:generate ./src/infraestrutura/migrations/NovaEntidadeCarro -d ./src/infraestrutura/migrations-data-source.ts

# Executar migrations
npx typeorm-ts-node-commonjs migration:run -d ./src/infraestrutura/migrations-data-source.ts


# Rode os testes e inicie o servidor

npm run test

npm start

Acesse a UI do Swagger

Visite: http://localhost:3000/swagger

Lá você poderá ver e testar todos os endpoints.

# 📡 Uso / Endpoints
No Swagger você verá todas as rotas disponíveis, por exemplo:

POST /carros — criar um carro

GET /carros — listar carros

GET /carros/:id — obter um carro por id

PUT /carros/:id — atualizar carro

DELETE /carros/:id — excluir carro

(O Swagger disponibiliza os schemаs de request / response, exemplos e testes interativos.)

# 🔧 Melhorias Futuras

-Seed de dados (marcas e modelos padrão) para evitar duplicidades

- Paginação e filtros nas rotas de listagem

- Autenticação / autorização (JWT, roles, middlewares)

- Soft delete em vez de delete permanente

- Logs / auditoria

- Tratamento de erros refinado e mensagens padronizadas

- Testes de integração mais completos

- CI/CD (GitHub Actions, pipelines, etc.)

# 📝 Observações
O projeto foi desenvolvido como teste, logo algumas funcionalidades consideradas “essenciais” em produção — como autenticação e paginação — ficaram de fora para focar no CRUD básico.

O delete implementado é direto; idealmente em ambiente real se usaria soft delete para manter histórico.

Ao buscar todos os carros, não há filtros ou paginação no momento.