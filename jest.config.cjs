module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFiles: ['./jest.setup.cjs'],
  // CJS transform with ts-jest
  moduleNameMapper: {
    '^fastmcp$': '<rootDir>/__mocks__/fastmcp.js',
    '^\.\/jules-api\.js$': '<rootDir>/src/jules-api.ts',
    '^\.\/index\.js$': '<rootDir>/src/index.ts'
  },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json'
      },
    ],
  },
};
