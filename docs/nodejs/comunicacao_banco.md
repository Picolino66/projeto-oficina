# Comunicação com Banco de Dados

Para comunicação com bancos de dados em uma aplicação Node.js, você pode usar vários módulos e ORMs. Neste exemplo, abordaremos o uso do **Prisma** com **MySQL**.

## Prisma

**Prisma** é um ORM moderno para Node.js e TypeScript que simplifica o acesso a bancos de dados. Ele gera um cliente para interagir com seu banco de dados e oferece uma maneira de definir seu esquema de banco de dados.

### Instalação e Configuração

### 1. Instale o Prisma e o cliente Prisma:

```bash
npm install @prisma/client
npm install prisma --save-dev
```

### 2. Inicialize o Prisma:

```bash
npx prisma init
```
Isso criará um diretório prisma com um arquivo schema.prisma e um arquivo .env para configuração do banco de dados.

### 3. Configure o Banco de Dados:

No arquivo .env, configure a URL de conexão com o MySQL:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

### 4. Defina o Esquema:

No arquivo schema.prisma, defina seu esquema de banco de dados. Exemplo:
```bash
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Usuario {
  id    Int    @id @default(autoincrement())
  nome  String
  email String @unique
}
```

### 5. Gere o Cliente Prisma:

```bash
npx prisma generate
```

## Usando o Cliente Prisma

Aqui está um exemplo de como usar o cliente Prisma para interagir com o banco de dados:

```bash
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar um novo usuário
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome: 'João',
      email: 'joao@example.com'
    }
  });
  console.log('Novo Usuário:', novoUsuario);

  // Buscar todos os usuários
  const usuarios = await prisma.usuario.findMany();
  console.log('Usuários:', usuarios);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

O Prisma facilita a interação com bancos de dados, oferecendo uma API intuitiva e gerando um cliente altamente tipado para trabalhar com dados.