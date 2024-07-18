// jest.config.js
module.exports = {
    // Faz o jest compilar os arquivos .ts
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Encontra os testes em qualquer lugar que tenha __tests__ na pasta e que termine com .test.js
    // ou em arquivos que tenham a extensão .spec.ts
    testMatch: [
        '**/__tests__/**/*.test.ts',
        '**/*.spec.ts',
    ],
    verbose: true,
  };