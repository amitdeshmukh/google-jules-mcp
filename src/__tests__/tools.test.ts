import { FastMCP, UserError } from 'fastmcp';
import { addTools } from '../tools';
import * as julesApi from '../jules-api';

jest.mock('../jules-api');

const mockedJulesApi = julesApi as jest.Mocked<typeof julesApi>;

describe('MCP Tools', () => {
  let server: FastMCP;
  let toolFunctions: Record<string, (args: any) => Promise<string>>;

  beforeEach(() => {
    server = new FastMCP({ name: 'test-server', version: '1.0.0' });
    addTools(server);
    // This is a bit of a hack to get access to the execute functions
    // In a real-world scenario, you might have a more direct way to test this
    toolFunctions = (server as any).tools.reduce((acc: any, tool: any) => {
      acc[tool.name] = tool.execute;
      return acc;
    }, {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('list_sources should call julesApi.listSources and return the result', async () => {
    const sources = [{ name: 'source1' }];
    mockedJulesApi.listSources.mockResolvedValue(sources);
    const result = await toolFunctions.list_sources({});
    expect(result).toBe(JSON.stringify(sources, null, 2));
    expect(mockedJulesApi.listSources).toHaveBeenCalled();
  });

  it('list_sources should throw a UserError on failure', async () => {
    mockedJulesApi.listSources.mockRejectedValue(new Error('API Error'));
    await expect(toolFunctions.list_sources({})).rejects.toThrow(UserError);
  });

  it('get_source should call julesApi.getSource and return the result', async () => {
    const source = { name: 'source1' };
    mockedJulesApi.getSource.mockResolvedValue(source);
    const result = await toolFunctions.get_source({ sourceName: 'source1' });
    expect(result).toBe(JSON.stringify(source, null, 2));
    expect(mockedJulesApi.getSource).toHaveBeenCalledWith('source1');
  });

  it('create_session should call julesApi.createSession and return the result', async () => {
    const session = { id: 'session1' };
    mockedJulesApi.createSession.mockResolvedValue(session);
    const result = await toolFunctions.create_session({ prompt: 'p', source: 's' });
    expect(result).toBe(JSON.stringify(session, null, 2));
  });

  it('list_sessions should call julesApi.listSessions and return the result', async () => {
    const sessions = [{ id: 'session1' }];
    mockedJulesApi.listSessions.mockResolvedValue(sessions);
    const result = await toolFunctions.list_sessions({});
    expect(result).toBe(JSON.stringify(sessions, null, 2));
  });

  it('get_session should call julesApi.getSession and return the result', async () => {
    const session = { id: 'session1' };
    mockedJulesApi.getSession.mockResolvedValue(session);
    const result = await toolFunctions.get_session({ sessionId: 'session1' });
    expect(result).toBe(JSON.stringify(session, null, 2));
  });

  it('approve_plan should call julesApi.approvePlan and return the result', async () => {
    mockedJulesApi.approvePlan.mockResolvedValue({});
    const result = await toolFunctions.approve_plan({ sessionId: 'session1' });
    expect(result).toBe(JSON.stringify({}, null, 2));
  });

  it('list_activities should call julesApi.listActivities and return the result', async () => {
    const activities = [{ id: 'activity1' }];
    mockedJulesApi.listActivities.mockResolvedValue(activities);
    const result = await toolFunctions.list_activities({ sessionId: 'session1' });
    expect(result).toBe(JSON.stringify(activities, null, 2));
  });

  it('send_message should call julesApi.sendMessage and return the result', async () => {
    mockedJulesApi.sendMessage.mockResolvedValue({});
    const result = await toolFunctions.send_message({ sessionId: 'session1', prompt: 'p' });
    expect(result).toBe(JSON.stringify({}, null, 2));
  });
});
