# Tech Challenge - FIAP - Arquitetura de Software

Este projeto foi implementado para o Tech Challenge da primeira fase da Pós Graduação de Arquetitura de Software pela FIAP. O projeto tem o objetivo de fazer o controle de uma lanchonete, onde é possivel gerenciar os produtos, categorias, pedidos e pagamentos.

### Estrutura do Projeto

- `src`

  - `modules`: Os módulos da aplicação, cada um responsável por uma parte específica do sistema, como categorias, clientes, pedidos e produtos. Cada módulo configura suas próprias entidades, repositórios e controladores.

  - `core`

    - `domain`: Contém as entidades, portas (ports), e interfaces que representam a lógica de domínio do sistema. Também inclui objetos de valor, DTOs entre outros recursos.
    - `application`: Aqui estão os casos de uso (use-cases) que implementam a lógica de negócios. Eles interagem com os repositórios por meio de ports para fazer a persistencia dos dados.

  - `adapter`

    - `driven`: Contém os repositórios responsáveis pela persistência de dados.
    - `driver`: Aqui estão os controladores que recebem as requisições HTTP e chamam os casos de uso apropriados.

  - `config`: Armazena arquivos de configuração, como variáveis de ambiente e os 'symbol' usados para injeção de dependência do NestJS.

## Arquitetura Hexagonal

A arquitetura hexagonal é uma abordagem que enfatiza a separação das preocupações em camadas distintas e prove uma estrutura organizada e testável para sua aplicação. As camadas bem definidas facilitam a manutenção, testes e evolução do sistema.

1. Camada de Domínio (Core - Domain):

   - Contém as entidades de domínio que representam os objetos principais do sistema.
   - Define portas (ports) e interfaces que descrevem a interação com componentes externos, como repositórios.
   - Contém objetos de valor (value objects) que representam conceitos imutáveis do domínio.
   - Define DTOs (Data Transfer Objects) para transferir dados entre as camadas.

2. Camada de Aplicação (Core - Application):

   - Implementa os casos de uso (use-cases) que representam a lógica de negócios da aplicação.
   - Os casos de uso interagem com as portas definidas na camada de domínio para acessar os dados.

3. Camada de Adaptadores (Adapter):

   - A camada de repositórios (driven) é responsável por persistir os dados no banco de dados. Ela implementa as portas definidas no domínio.
   - A camada de controladores (driver) trata as requisições HTTP, chama os casos de uso apropriados e retorna respostas HTTP.

## Banco de Dados

A imagem abaixo mostra um diagrama ER (Entidade e Relacionamento) do banco de dados utilizado no projeto `docs/portal.drawio`:

![Arquitetura do Banco](docs/images/DB-ER-Diagram.png "Arquitetura do Banco")

## Setup do ambiente de desenvolvimento

### Pré-requisitos

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
  - Instale também o [Docker Compose](https://docs.docker.com/compose/)
- [Visual Studio Code](https://code.visualstudio.com/) ou [WebStorm](https://www.jetbrains.com/webstorm/)

## Configuração do Projeto

Antes de iniciar o projeto, siga as etapas abaixo para configurá-lo corretamente:

1. Copie o arquivo `settings.template` e renomeie-o para `settings.json`. O arquivo `settings.json` está localizado na pasta `src/config/`. Este arquivo contém as configurações essenciais do projeto, como variáveis de ambiente e configurações específicas. Certifique-se de definir as configurações apropriadas, como credenciais de banco de dados, portas e outras variáveis necessárias.

## Docker e Docker Compose

O projeto utiliza Docker e Docker Compose para facilitar a criação e execução do ambiente de desenvolvimento. Aqui estão os arquivos relevantes:

### Dockerfile

O arquivo Dockerfile define a imagem do contêiner do Node.js a ser usada para executar o projeto. Ele inclui a instalação do NestJS CLI para gerenciar o projeto. Certifique-se de que a versão do Node.js e do NestJS CLI seja apropriada para o seu projeto.

```dockerfile
FROM node:21-slim

RUN apt update -y  && \
    apt install procps -y && \
    yarn add -g @nestjs/cli@9.0.0 -y

WORKDIR /home/node/app

USER node

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]
```

### Docker Compose

O arquivo docker-compose.yml define os serviços a serem executados usando o Docker Compose. Ele inclui os serviços do aplicativo (Node.js) e do banco de dados (PostgreSQL).

```yaml
services:
  app:
    build: .
    ports:
      - 3000:3000
    volumes:
      - .:/home/node/app
    mem_limit: 2g
    networks:
      - tech-challenge

  db:
    image: postgres:13-alpine
    ports:
      - 5432:5432
    environment:
      POSTGRES_PASSWORD: root
      POSTGRES_DB: postgres
    networks:
      - tech-challenge

networks:
  tech-challenge:
```

Para iniciar o projeto, siga estas etapas:

1. Certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.

2. No diretório raiz do seu projeto, onde o arquivo docker-compose.yml está localizado, execute o seguinte comando para iniciar os serviços:

```bash
docker-compose up -d
```

Isso criará os contêineres para o aplicativo e o banco de dados.

3. Após a inicialização bem-sucedida, a aplicação estará disponível em `http://localhost:3000`. Certifique-se de que a porta 3000 esteja mapeada corretamente no arquivo `docker-compose.yml`.

4. Você pode acessar o contêiner do aplicativo para executar a aplicação:

```bash
docker-compose exec <nome-do-contêiner-do-aplicativo> bash
```

Substitua `<nome-do-contêiner-do-aplicativo>` pelo nome do contêiner do aplicativo, que você pode obter usando `docker ps`.

5. Dentro do contêiner, você pode iniciar a aplicação usando o seguinte comando:

```bash
yarn start:dev
```

Com isso, seu projeto estará configurado e em execução dentro de um ambiente Dockerizado, facilitando o desenvolvimento e a execução da aplicação
