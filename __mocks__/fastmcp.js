class FastMCP {
  constructor(config) {
    this.config = config;
    this.tools = [];
    this.startCalls = [];
    FastMCP.instances.push(this);
  }

  addTool(tool) {
    this.tools.push(tool);
  }

  start(options) {
    this.startCalls.push(options);
  }

  static reset() {
    FastMCP.instances = [];
  }
}

FastMCP.instances = [];

class UserError extends Error {}

module.exports = { FastMCP, UserError };


