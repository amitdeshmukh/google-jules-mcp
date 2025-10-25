module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFiles: ['./jest.setup.cjs'],
  moduleNameMapper: {
    '^fastmcp$': '<rootDir>/__mocks__/fastmcp.js',
    '^\.\/jules-api\.js$': '<rootDir>/src/jules-api.ts',
  },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
};
