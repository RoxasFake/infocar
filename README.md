- Requisitos do Teste
1. Criar um projeto backend utilizando Node.js (preferencialmente com NestJS);  Check
 
2. Implementar um CRUD de veículos com os seguintes atributos: id, placa, chassi, renavam, modelo, marca e ano. Os dados podem ser armazenados em arquivos ou banco de dados; Check

3. Criar testes unitários para os principais casos de uso do backend utilizando Jest;

4. Criar recursos RESTful para acesso e manipulação dos dados dos veículos; Check

5. (Opcional) Criar um projeto frontend utilizando Angular 16+.

6. (Opcional) Implementar uma tela de listagem de veículos. Os dados devem ser consumidos via endpoints REST do backend;

7. Disponibilizar o projeto em um repositório público no GitHub; Check

8. (Desejável) Utilizar NestJS para o backend e Angular 16+ para o frontend (caso opte por fazer o frontend);

9. (Bônus) Dockerizar toda a aplicação, garantindo que seja possível rodá-la via containers com Docker Compose;

10. (Extra) Faça implementação de micro serviços que processe as chamadas enviadas pelo seu backend usando algum broker como Kaffa, RabbitMQ ou SQS.


- Setup do projeto

Para inciar o projeto execute:

Comandos do Docker:
docker compose up -d
npm start
npm run test

Comandos da Migration:

npx typeorm-ts-node-commonjs migration:generate ./src/infraestrutura/migrations/NovaEntidadeCarro -d ./src/infraestrutura/migrations-data-source.ts
npx typeorm-ts-node-commonjs migration:run -d ./src/infraestrutura/migrations-data-source.ts

- Arquitetura do codigo
    - Clean Architecture 
    - Swagger
        -
    - Validadores
    - Code First

- Obs: 
    - O ideal para o projeto seria ter a Seed do banco de dados com padrões de modelos e marcas pre definidas no banco de dados para seleção do usuario ao realizar o cadastro, evitando duplicatas incoretas pelo fator de letras diferenciadas na criação de um carro

    - Em desenvolvimento, por ser um teste, ao realizar o buscar carros não utilizei nenhum limite de paginação e nenhum tipo de filtro para buscar o carro, mas que em produção isso seria nescessario
        - O ideal seria realizar a paginação utilizando a Data de criação como campo de ordenação, e utilizaria o itens por pagina mais o numero da pagina para calcular e retornar a quantidade de registros corretos para o cliente.

    - Em produção ideal seria ter criado uma autenticação para validar os acesso dos usuarios, porem como estamos em um teste e o foco e o crud esse ponto foi ignorado, a forma correta de autenticação seria utilizando o middleware do nest para isso 

    - Por se tratar de um teste foi realizado um delete objetivo e mais simples, porem o em um ambiente de produção o ideal seria um soft delete, para manter a rastreabilidade dos dados.


Continuar a implementação dos use case e repositorios, implementar os testes unitarios em jest, criar a comunicação por mensagem utilizando o Brooken, organização do Readme, finalizando com a implementação do projeto rodando dentro do docker, rodar as migrations assim que o projeto foi iniciado.

Resalva que cada ponto do use case e das demais implementações seja feita em comites diferentes