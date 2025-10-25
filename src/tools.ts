import { FastMCP, UserError } from 'fastmcp';
import { z } from 'zod';
import * as julesApi from './jules-api.js';

export const addTools = (server: FastMCP) => {
  server.addTool({
    name: 'list_sources',
    description: 'List available sources',
    parameters: z.object({}),
    execute: async () => {
      try {
        const sources = await julesApi.listSources();
        return JSON.stringify(sources, null, 2);
      } catch (error: any) {
        throw new UserError(`Error listing sources: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'get_source',
    description: 'Get a source by name',
    parameters: z.object({
      sourceName: z.string(),
    }),
    execute: async ({ sourceName }) => {
      try {
        const source = await julesApi.getSource(sourceName);
        return JSON.stringify(source, null, 2);
      } catch (error: any) {
        throw new UserError(`Error getting source: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'get_session',
    description: 'Get a session by ID',
    parameters: z.object({
      sessionId: z.string(),
    }),
    execute: async ({ sessionId }) => {
      try {
        const session = await julesApi.getSession(sessionId);
        return JSON.stringify(session, null, 2);
      } catch (error: any) {
        throw new UserError(`Error getting session: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'create_session',
    description: 'Create a new session',
    parameters: z.object({
      prompt: z.string(),
      source: z.string(),
    }),
    execute: async ({ prompt, source }) => {
      try {
        const session = await julesApi.createSession(prompt, source);
        return JSON.stringify(session, null, 2);
      } catch (error: any) {
        throw new UserError(`Error creating session: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'list_sessions',
    description: 'List all sessions',
    parameters: z.object({}),
    execute: async () => {
      try {
        const sessions = await julesApi.listSessions();
        return JSON.stringify(sessions, null, 2);
      } catch (error: any) {
        throw new UserError(`Error listing sessions: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'approve_plan',
    description: "Approve a session's plan",
    parameters: z.object({
      sessionId: z.string(),
    }),
    execute: async ({ sessionId }) => {
      try {
        const result = await julesApi.approvePlan(sessionId);
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        throw new UserError(`Error approving plan: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'list_activities',
    description: 'List all activities in a session',
    parameters: z.object({
      sessionId: z.string(),
    }),
    execute: async ({ sessionId }) => {
      try {
        const activities = await julesApi.listActivities(sessionId);
        return JSON.stringify(activities, null, 2);
      } catch (error: any) {
        throw new UserError(`Error listing activities: ${error.message}`);
      }
    },
  });

  server.addTool({
    name: 'send_message',
    description: 'Send a message to the agent in a session',
    parameters: z.object({
      sessionId: z.string(),
      prompt: z.string(),
    }),
    execute: async ({ sessionId, prompt }) => {
      try {
        const result = await julesApi.sendMessage(sessionId, prompt);
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        throw new UserError(`Error sending message: ${error.message}`);
      }
    },
  });
};
