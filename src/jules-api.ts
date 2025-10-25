import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const JULES_API_KEY = process.env.JULES_API_KEY;
const JULES_API_BASE_URL = 'https://jules.googleapis.com/v1alpha';

if (!JULES_API_KEY) {
  throw new Error('JULES_API_KEY environment variable not set.');
}

const apiClient = axios.create({
  baseURL: JULES_API_BASE_URL,
  headers: {
    'X-Goog-Api-Key': JULES_API_KEY,
    'Content-Type': 'application/json',
  },
});

export const listSources = async () => {
  const response = await apiClient.get('/sources');
  return response.data;
};

export const getSource = async (sourceName: string) => {
  const response = await apiClient.get(`/${sourceName}`);
  return response.data;
};

export const createSession = async (prompt: string, source: string) => {
  const response = await apiClient.post('/sessions', {
    prompt,
    sourceContext: {
      source,
      githubRepoContext: {
        startingBranch: 'main',
      },
    },
    automationMode: 'AUTO_CREATE_PR',
  });
  return response.data;
};

export const listSessions = async () => {
  const response = await apiClient.get('/sessions');
  return response.data;
};

export const getSession = async (sessionId: string) => {
  const response = await apiClient.get(`/sessions/${sessionId}`);
  return response.data;
};

export const approvePlan = async (sessionId: string) => {
  const response = await apiClient.post(`/sessions/${sessionId}:approvePlan`);
  return response.data;
};

export const listActivities = async (sessionId: string) => {
  const response = await apiClient.get(`/sessions/${sessionId}/activities`);
  return response.data;
};

export const sendMessage = async (sessionId: string, prompt: string) => {
  const response = await apiClient.post(`/sessions/${sessionId}:sendMessage`, {
    prompt,
  });
  return response.data;
};
