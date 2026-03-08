import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const envPort = process.env.PORT;
  const parsedEnvPort = envPort ? Number(envPort) : undefined;
  const hasExplicitPort = Number.isInteger(parsedEnvPort);
  const startPort = hasExplicitPort ? (parsedEnvPort as number) : 3000;
  const maxAttempts = 20;

  const listenOnPort = (port: number, attempt = 0) => {
    const server = createServer(app);

    server.once("error", (error: NodeJS.ErrnoException) => {
      const shouldRetry =
        error.code === "EADDRINUSE" &&
        !hasExplicitPort &&
        attempt < maxAttempts;

      if (shouldRetry) {
        const nextPort = port + 1;
        console.warn(
          `Port ${port} is in use. Retrying on port ${nextPort}...`,
        );
        listenOnPort(nextPort, attempt + 1);
        return;
      }

      console.error(`Failed to start server on port ${port}:`, error);
      process.exit(1);
    });

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  };

  listenOnPort(startPort);
}

startServer().catch(console.error);
