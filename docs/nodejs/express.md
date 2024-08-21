# Express.js

**Express.js** é um framework de aplicativo web para Node.js, projetado para simplificar o desenvolvimento de servidores e APIs. Ele fornece uma série de funcionalidades robustas e flexíveis para criar aplicações web e APIs.

## Principais Características

- **Middleware**: Express usa uma arquitetura baseada em middleware, onde funções podem ser encadeadas para processar requisições e respostas.
- **Roteamento**: Fornece um sistema de roteamento fácil de usar para mapear URLs para funções específicas.
- **Facilidade de Uso**: Simplicidade na criação de servidores HTTP e APIs RESTful.

## Exemplo Básico de Uso

Instale o Express usando npm:

```bash
npm install express
```

Crie um arquivo **`index.js`** com o seguinte código:

```bash
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

## Middleware

Os middlewares são funções que têm acesso ao objeto de requisição (**`req`**), ao objeto de resposta (**`res`**) e à próxima função middleware no ciclo de solicitação-resposta. Exemplo de middleware:

```bash
app.use((req, res, next) => {
  console.log('Request received');
  next();
});
```

## Roteamento

Define rotas para lidar com diferentes URLs. Exemplo de uma rota POST:

```bash
app.post('/login', (req, res) => {
  // Lógica de login
  res.send('Login realizado!');
});
```

Express é uma escolha popular para construir aplicações web e APIs devido à sua simplicidade e flexibilidade.