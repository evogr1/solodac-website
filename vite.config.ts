import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

const PROJECT_ROOT = import.meta.dirname;

function vitePluginTickerApi(): Plugin {
  return {
    name: "solodac-ticker-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/ticker", async (_req, res) => {
        const { getTicker } = await server.ssrLoadModule(path.join(PROJECT_ROOT, "shared/ticker.ts"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await getTicker()));
      });
    },
  };
}

export default defineConfig(() => {
  return {
  plugins: [react(), tailwindcss(), vitePluginTickerApi()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  };
});
