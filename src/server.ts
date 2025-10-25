#!/usr/bin/env node
// Polyfill minimal File for Node < 20 to satisfy libraries expecting web File
(() => {
  const g: any = globalThis as any;
  if (typeof g.File === 'undefined') {
    try {
      class PolyfillFile extends Blob {
        public readonly name: string;
        public readonly lastModified: number;
        constructor(parts: any[] = [], name: string, options: { type?: string; lastModified?: number } = {}) {
          super(parts, options);
          this.name = String(name);
          this.lastModified = typeof options.lastModified === 'number' ? options.lastModified : Date.now();
        }
        get [Symbol.toStringTag]() {
          return 'File';
        }
      }
      g.File = PolyfillFile;
    } catch {
      // If Blob is not available for some reason, provide a very small fallback
      class PolyfillFileFallback {
        public readonly name: string;
        public readonly size: number;
        public readonly type: string;
        public readonly lastModified: number;
        private readonly content: Uint8Array;
        constructor(parts: any[] = [], name: string, options: { type?: string; lastModified?: number } = {}) {
          this.name = String(name);
          const buffers = parts.map((p) => (typeof p === 'string' ? Buffer.from(p) : Buffer.from(p ?? '')));
          this.content = Buffer.concat(buffers);
          this.size = this.content.length;
          this.type = options.type ?? '';
          this.lastModified = typeof options.lastModified === 'number' ? options.lastModified : Date.now();
        }
        get [Symbol.toStringTag]() {
          return 'File';
        }
        arrayBuffer() { return Promise.resolve(this.content.buffer.slice(this.content.byteOffset, this.content.byteOffset + this.content.byteLength)); }
        text() { return Promise.resolve(Buffer.from(this.content).toString('utf8')); }
        stream() { const { Readable } = require('stream'); return Readable.from([this.content]); }
      }
      g.File = PolyfillFileFallback;
    }
  }
})();

// Defer loading server dependencies until after polyfills are in place
export async function bootstrap(createServerFactory?: () => { start: (options: { transportType: 'stdio' }) => void }) {
  const factory = createServerFactory ?? (() => {
    // dynamic import so polyfills are applied first
    const mod = (void 0) as unknown as { createStdioServer: () => { start: (options: { transportType: 'stdio' }) => void } };
    return mod as any;
  });

  let serverInstance: { start: (options: { transportType: 'stdio' }) => void };
  if (createServerFactory) {
    serverInstance = factory();
  } else {
    const { createStdioServer } = await import('./index.js');
    serverInstance = createStdioServer();
  }

  serverInstance.start({
    transportType: 'stdio',
  });
  console.error(JSON.stringify({
    level: 'info',
    message: 'Google Jules API MCP Server started with STDIO transport.'
  }));
}

if (!process.env.JEST_WORKER_ID) {
  void bootstrap();
}
