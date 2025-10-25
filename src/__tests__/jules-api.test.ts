import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Jules API Client', () => {
  let mock: MockAdapter;
  let julesApi: typeof import('../jules-api');

  const BASE_URL = 'https://jules.googleapis.com/v1alpha';

  beforeEach(() => {
    jest.resetModules();
    const freshAxios = require('axios');
    mock = new MockAdapter(freshAxios);
    julesApi = require('../jules-api');
  });

  afterEach(() => {
    mock.restore();
  });

  it('should list sources', async () => {
    const sources = [{ name: 'source1' }];
    mock.onGet(`${BASE_URL}/sources`).reply(200, sources);
    const result = await julesApi.listSources();
    expect(result).toEqual(sources);
  });

  it('should get a source', async () => {
    const source = { name: 'source1' };
    mock.onGet(`${BASE_URL}/sources/source1`).reply(200, source);
    const result = await julesApi.getSource('sources/source1');
    expect(result).toEqual(source);
  });

  it('should create a session', async () => {
    const session = { id: 'session1' };
    mock.onPost(`${BASE_URL}/sessions`).reply(200, session);
    const result = await julesApi.createSession('prompt', 'source');
    expect(result).toEqual(session);
  });

  it('should list sessions', async () => {
    const sessions = [{ id: 'session1' }];
    mock.onGet(`${BASE_URL}/sessions`).reply(200, sessions);
    const result = await julesApi.listSessions();
    expect(result).toEqual(sessions);
  });

  it('should get a session', async () => {
    const session = { id: 'session1' };
    mock.onGet(`${BASE_URL}/sessions/session1`).reply(200, session);
    const result = await julesApi.getSession('session1');
    expect(result).toEqual(session);
  });

  it('should approve a plan', async () => {
    mock.onPost(`${BASE_URL}/sessions/session1:approvePlan`).reply(200, {});
    const result = await julesApi.approvePlan('session1');
    expect(result).toEqual({});
  });

  it('should list activities', async () => {
    const activities = [{ id: 'activity1' }];
    mock.onGet(`${BASE_URL}/sessions/session1/activities`).reply(200, activities);
    const result = await julesApi.listActivities('session1');
    expect(result).toEqual(activities);
  });

  it('should send a message', async () => {
    mock.onPost(`${BASE_URL}/sessions/session1:sendMessage`).reply(200, {});
    const result = await julesApi.sendMessage('session1', 'prompt');
    expect(result).toEqual({});
  });

  it('should handle API errors', async () => {
    mock.onGet(`${BASE_URL}/sources`).reply(500, { message: 'Internal Server Error' });
    await expect(julesApi.listSources()).rejects.toThrow();
  });
});
