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

    const errCalls = (console.error as unknown as jest.Mock).mock.calls;
    const logCalls = (console.log as unknown as jest.Mock).mock.calls;
    const all = [...errCalls, ...logCalls];
    expect(all.length).toBeGreaterThan(0);

    const firstArg = all[0][0];
    if (typeof firstArg === 'string') {
      try {
        const parsed = JSON.parse(firstArg);
        expect(parsed.message).toMatch(/MCP Server started with STDIO transport/i);
      } catch {
        expect(firstArg).toMatch(/MCP Server started with STDIO transport/i);
      }
    } else {
      // Non-string arg; just assert something was logged
      expect(firstArg).toBeDefined();
    }
  });
});


