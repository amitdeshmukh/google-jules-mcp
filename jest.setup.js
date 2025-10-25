process.env.JULES_API_KEY = 'test-key';
// Use CommonJS style here to avoid ESM in setup file
require('jest-mock');
jest.mock('fastmcp');
