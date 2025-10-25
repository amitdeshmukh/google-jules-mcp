/*
  Tests for the server entrypoint. We mock ./index.js to control the
  FastMCP instance returned by createStdioServer, then require the
  entrypoint to assert it starts with the correct transport and logs.
*/

const startMock = jest.fn();
const serverFactory = () => ({ start: startMock });

describe('server entrypoint', () => {
  let originalConsoleLog: typeof console.log;
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    jest.resetModules();
    startMock.mockReset();
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  it('creates the server, starts with stdio, and logs startup message', async () => {
    const mod = await import('../server.ts');
    await mod.bootstrap(serverFactory);

    expect(startMock).toHaveBeenCalledTimes(1);
    expect(startMock).toHaveBeenCalledWith({ transportType: 'stdio' });

    const calls = (console.error as unknown as jest.Mock).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][0]).toMatch(/MCP Server started with STDIO transport/i);
  });
});


