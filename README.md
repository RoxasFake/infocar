- Setup do projeto

Para inciar o projeto execute:

Comandos do Docker:
docker compose up -dnpm 

Comandos da Migration:

npx typeorm-ts-node-commonjs migration:generate ./src/infraestrutura/migrations/NovaEntidadeCarro -d ./src/infraestrutura/migrations-data-source.ts
npx typeorm-ts-node-commonjs migration:run -d ./src/infraestrutura/migrations-data-source.ts

Comandos para startar o ambiente:

npm run test
npm start

Acesse o http://localhost:3000/, onde sera possivel realizar as ações do projeto e verificar a documentação gerada pelo Swagger.

- Arquitetura do codigo
    - Clean Architecture 
    - Swagger
    - Validadores
    - Code First

- Obs: 
    - O ideal para o projeto seria ter a Seed do banco de dados com padrões de modelos e marcas pre definidas no banco de dados para seleção do usuario ao realizar o cadastro, evitando duplicatas incoretas pelo fator de letras diferenciadas na criação de um carro

    - Em desenvolvimento, por ser um teste, ao realizar o buscar carros não utilizei nenhum limite de paginação e nenhum tipo de filtro para buscar o carro, mas que em produção isso seria nescessario
        - O ideal seria realizar a paginação utilizando a Data de criação como campo de ordenação, e utilizaria o itens por pagina mais o numero da pagina para calcular e retornar a quantidade de registros corretos para o cliente.

    - Em produção ideal seria ter criado uma autenticação para validar os acesso dos usuarios, porem como estamos em um teste e o foco e o crud esse ponto foi ignorado, a forma correta de autenticação seria utilizando o middleware do nest para isso 

    - Por se tratar de um teste foi realizado um delete objetivo e mais simples, porem o em um ambiente de produção o ideal seria um soft delete, para manter a rastreabilidade dos dados.