class FastMCP {
  constructor(config) {
    this.config = config;
    this.tools = [];
  }

  addTool(tool) {
    this.tools.push(tool);
  }
}

class UserError extends Error {}

module.exports = { FastMCP, UserError };


