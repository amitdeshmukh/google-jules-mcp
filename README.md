# Google Jules API MCP Server

This is an MCP server for the Google Jules API, built with the FastMCP framework.

## Prerequisites

- Node.js
- A Google Jules API key

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/example/google-jules-mcp-server.git
    cd google-jules-mcp-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Create a file named `.env` in the root of the project and add your Google Jules API key to it:

    ```
    JULES_API_KEY=your_api_key_here
    ```

## Running the Server

To run the server, use the following command:

```bash
npx ts-node src/index.ts
```

The server will start and listen for requests on STDIN.
