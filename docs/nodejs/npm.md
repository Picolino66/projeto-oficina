# Gerenciamento de Pacotes (npm)

O **npm** (Node Package Manager) é o gerenciador de pacotes padrão para Node.js. Ele facilita a instalação, atualização e gerenciamento de pacotes e bibliotecas.

## Comandos Básicos do NPM

- **Instalar Pacotes**: 
```bash
  npm install nome-do-pacote
```

 Instala o pacote e suas dependências.

 - **Instalar Pacotes Globalmente**:

```bash
 npm install -g nome-do-pacote
```
Instala o pacote globalmente, disponível para qualquer projeto.

 - **Adicionar Dependências ao package.json**:

```bash
npm install nome-do-pacote --save
```
Adiciona a dependência ao package.json do projeto.

 - **Atualizar Pacotes**:

```bash
npm update
```
Atualiza os pacotes para a versão mais recente.

- **Remover Pacotes**:

```bash
npm uninstall nome-do-pacote
```
Remove o pacote do projeto.

- **Verificar Dependências**:

```bash
npm list
```
Lista os pacotes instalados e suas versões.

## `package.json`
O **`package.json`** é um arquivo crucial em projetos Node.js, que contém metadados sobre o projeto, como nome, versão, dependências e scripts. Exemplo de um package.json:

```bash
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Descrição do projeto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Erro: nenhum teste especificado\" && exit 1"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

O **`package.json`** também pode definir scripts que facilitam tarefas comuns, como iniciar o servidor ou rodar testes.