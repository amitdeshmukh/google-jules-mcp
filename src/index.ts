import { FastMCP } from 'fastmcp';
import { addTools } from './tools';

const server = new FastMCP({
  name: 'google-jules-api-mcp-server',
  version: '1.0.0',
});

addTools(server);

server.start({
  transportType: 'stdio',
});

console.log('Google Jules API MCP Server started with STDIO transport.');
