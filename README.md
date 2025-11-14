# Google Jules API MCP Server

An MCP server that integrates with Google Jules API. Provides tools to list sources, manage sessions, approve plans, and send messages.

## Requirements

- Node.js >= 18
- Google Jules API key

## Usage

Run with npx (recommended for MCP clients):

```bash
npx @amitdeshmukh/google-jules-mcp
```

## Environment Variables

- `JULES_API_KEY` (required): Your Google Jules API key.

Example `.env`:

```
JULES_API_KEY=your_api_key_here
```

## Run (CLI)

```bash
npx @amitdeshmukh/google-jules-mcp
```

## MCP Client Configuration

### Claude Desktop

```json
{
  "mcpServers": {
    "google-jules": {
      "command": "npx",
      "args": ["@amitdeshmukh/google-jules-mcp"],
      "env": { "JULES_API_KEY": "your_api_key_here" }
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "google-jules": {
      "command": "npx",
      "args": ["@amitdeshmukh/google-jules-mcp"],
      "env": { "JULES_API_KEY": "your_api_key_here" }
    }
  }
}
```

## Tools

All tools return JSON strings and call the Jules API under the hood.

- **list_sources** — List available sources
- **get_source** — Get a source by name (params: `{ sourceName: string }`)
- **create_session** — Create a new session (params: `{ prompt: string, source: string }`)
- **list_sessions** — List all sessions
- **get_session** — Get a session by ID (params: `{ sessionId: string }`)
- **approve_plan** — Approve a session's plan (params: `{ sessionId: string }`)
- **list_activities** — List all activities in a session (params: `{ sessionId: string }`)
- **send_message** — Send a message to the agent in a session (params: `{ sessionId: string, prompt: string }`)

## Usage Examples

### Natural Language Prompts

- "List all Jules sources I can use."
- "Show details for the source named `sources/github`."
- "Create a Jules session to refactor my repo `my-repo` for better type-safety."
- "Approve the proposed plan for session `12345`."
- "List activities for session `12345`."
- "Send a message to session `12345`: Continue with implementing the tests."

### Tool Call Params

List sources:
```json
{
  "tool": "list_sources",
  "params": {}
}
```

Get a source:
```json
{
  "tool": "get_source",
  "params": { "sourceName": "sources/github/my-org/my-repo" }
}
```

Create a session:
```json
{
  "tool": "create_session",
  "params": {
    "prompt": "Refactor the codebase to improve type safety and add tests",
    "source": "sources/github/my-org/my-repo",
    "requirePlanApproval": true
  }
}
```

List sessions:
```json
{
  "tool": "list_sessions",
  "params": {}
}
```

Get a session:
```json
{
  "tool": "get_session",
  "params": { "sessionId": "12345" }
}
```

Approve a plan:
```json
{
  "tool": "approve_plan",
  "params": { "sessionId": "12345" }
}
```

List activities:
```json
{
  "tool": "list_activities",
  "params": { "sessionId": "12345" }
}
```

Send a message:
```json
{
  "tool": "send_message",
  "params": {
    "sessionId": "12345",
    "prompt": "Continue with implementing the tests"
  }
}
```

## Development

```bash
npm install
npm test
npm run build
```

Release:

```bash
npm run release
```

## License

MIT
