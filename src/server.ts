#!/usr/bin/env node
import { createStdioServer } from './index.js';

const server = createStdioServer();

server.start({
  transportType: 'stdio',
});

console.log('Google Jules API MCP Server started with STDIO transport.');


