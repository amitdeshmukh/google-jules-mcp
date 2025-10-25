import { FastMCP } from 'fastmcp';
import { addTools } from './tools.js';
/**
 * Namespace export exposing low-level Google Jules REST client helpers.
 */
export * as julesApi from './jules-api.js';

/**
 * Registers all Google Jules tools on the provided FastMCP server instance.
 *
 * Tools included: list_sources, get_source, create_session, list_sessions,
 * get_session, approve_plan, list_activities, send_message.
 */
export { addTools };

type SemVer = `${number}.${number}.${number}`;

/**
 * Create a FastMCP server pre-configured with all Google Jules tools.
 *
 * @param name - Server name shown to MCP clients.
 * @param version - Semantic version string for the server (major.minor.patch).
 * @returns A configured FastMCP instance; call `start({ transportType: 'stdio' })` to run.
 */
export function createStdioServer(name: string = 'google-jules-api-mcp-server', version: SemVer = '1.0.0'): FastMCP {
  const server = new FastMCP({ name, version });
  addTools(server);
  return server;
}
