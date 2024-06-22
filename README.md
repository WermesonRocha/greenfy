# Greenfy - To-Do List API

## Descrição do Projeto

O **Greenfy - To-Do List API** é uma API RESTful desenvolvida em NestJS para gerenciamento de tarefas (To-Do List). Esta API permite que os usuários criem, listem, atualizem e excluam tarefas. Além disso, ela suporta autenticação de usuários, multi-tenancy (suporte para múltiplos inquilinos com diferentes conexões de banco de dados) e documentação completa via Swagger.

## Funcionalidades da API

- **Criação de Tarefas**: Permite que os usuários criem novas tarefas com um título, descrição e status (pendente ou concluída).
- **Listagem de Tarefas**: Permite a listagem de todas as tarefas, com possibilidade de filtrar por status.
- **Atualização de Tarefas**: Permite atualizar o título, descrição ou status de uma tarefa existente.
- **Exclusão de Tarefas**: Permite excluir tarefas existentes.
- **Autenticação de Usuários**: Implementa autenticação baseada em JWT com a estratégia Passport.
- **Multi-tenancy**: Suporte para múltiplos inquilinos com diferentes conexões de banco de dados.
- **Documentação Swagger**: Documentação interativa da API acessível via Swagger UI.

## Tecnologias Utilizadas

- **NestJS**: Framework de Node.js para a construção de aplicações escaláveis e eficientes.
- **TypeORM**: ORM para o TypeScript e JavaScript, utilizado para interagir com o banco de dados MySQL.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados das tarefas e usuários.
- **Redis**: Banco de dados em memória utilizado para caching e gerenciamento de sessão.
- **JWT (JSON Web Token)**: Implementado via Passport para autenticação de usuários.
- **Swagger**: Ferramenta para documentação da API.

## Configuração e Execução do Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- Redis

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:WermesonRocha/greenfy.git
   cd greenfy
   ```

2. **Instale as dependências**:

```bash
$ npm install
```

3. **Configuração do Banco de Dados**:

- Crie uma base de dados no MySQL para o projeto
- Configure as variáveis de ambiente com as credenciais do banco de dados. Você pode usar um arquivo `.env` ou configurar diretamente no arquivo `ormconfig.json`.

Exemplo de .env:

```makefile
PORT=3000
JWT_SECRET=your_secret
JWT_EXPIRES_IN=3600
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=todo_list
DB_PREFIX=todo_list
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
```

4. **Configuração do Redis**:

   Configure as variáveis de ambiente para o Redis

```makefile
REDIS_HOST=localhost
REDIS_PORT=6379
```

5. **Inicie o servidor**:

```bash
$ npm run start

```

Ou para iniciar em modo de desenvolvimento:

```bash
$ npm run start:dev

```

6. **Acesse a documentação do Swagger**:

   Abra seu navegador e vá para http://localhost:3000/api/docs para ver a documentação interativa da API.
