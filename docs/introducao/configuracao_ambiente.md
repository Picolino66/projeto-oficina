# Configuração do Ambiente

Antes de começar a desenvolver com Angular e Node.js, é necessário configurar o ambiente de desenvolvimento. A seguir estão os passos para instalar e configurar as ferramentas necessárias.

## Requisitos

- **Node.js**: Ambiente de execução para JavaScript.
- **npm**: Gerenciador de pacotes para Node.js, que é instalado junto com o Node.js.
- **Angular CLI**: Ferramenta de linha de comando para gerenciar projetos Angular.
- **Editor de Código**: Recomenda-se o uso do Visual Studio Code, mas qualquer editor que suporte JavaScript/TypeScript pode ser utilizado.

## Instalando Node.js e npm

1. Acesse o site oficial do Node.js [nodejs.org](https://nodejs.org) e baixe o instalador para o seu sistema operacional.
2. Siga as instruções do instalador para concluir a instalação. Isso instalará tanto o Node.js quanto o npm.

Para verificar se a instalação foi bem-sucedida, execute os comandos abaixo no terminal:

```bash
node -v
npm -v
```

Esses comandos devem retornar a versão instalada do Node.js e do npm.

## Instalando Angular CLI

A Angular CLI (Command Line Interface) facilita a criação e o gerenciamento de projetos Angular. Para instalá-la, execute o seguinte comando:

```bash
npm install -g @angular/cli
```

Para verificar se a instalação foi bem-sucedida, execute:

```bash
ng version
```

Isso mostrará a versão instalada do Angular CLI.

## Criando um Novo Projeto Angular

Após instalar o Angular CLI, você pode criar um novo projeto Angular com o comando:

```bash
ng new nome-do-projeto
```

Siga as instruções no terminal para configurar as opções iniciais do projeto. Isso criará um diretório com o nome do projeto, contendo a estrutura básica de um projeto Angular.

## Executando o Projeto Angular

Navegue até o diretório do projeto e execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Abra o navegador e acesse http://localhost:4200 para ver o projeto Angular em execução.

## Preparando o Ambiente para Node.js

Para começar a trabalhar com Node.js, você pode criar um novo diretório para seu projeto e inicializar um novo package.json com o comando:

```bash
npm init -y
```

Isso criará um arquivo package.json básico que gerenciará as dependências e scripts do projeto.

## Configuração Adicional

Dependendo das necessidades do seu projeto, você pode precisar instalar outras dependências, como o Express para a criação de servidores ou o Prisma para a comunicação com bancos de dados. Essas dependências podem ser instaladas usando o npm:

```bash
npm install express
npm install @prisma/client
```

Com essas ferramentas configuradas, você estará pronto para começar a desenvolver suas aplicações com Angular e Node.js.