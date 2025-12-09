import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: {
      server,
      port: 5000,
      timeout: 30000,
    },
    allowedHosts: true as true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        if (msg.includes('Critical')) {
          process.exit(1);
        }
      },
    },
    server: serverOptions,
    appType: "custom",
    optimizeDeps: {
      entries: [
        "client/src/**/*.tsx",
        "client/src/**/*.ts",
      ],
      force: true,
    },
  });

  app.use(vite.middlewares);

  app.use((req, res, next) => {
    const url = req.originalUrl;

    if (url.startsWith("/api")) {
      return next();
    }

    if (url.startsWith("/uploads")) {
      return next();
    }

    if (url.endsWith('.map')) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      fs.promises.readFile(clientTemplate, "utf-8")
        .then(template => {
          template = template.replace(
            `src="/src/main.tsx"`,
            `src="/src/main.tsx?v=${nanoid()}"`,
          );
          return vite.transformIndexHtml(url, template);
        })
        .then(page => {
          res.status(200).set({
            "Content-Type": "text/html",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          }).end(page);
        })
        .catch(e => {
          console.error(`Error processing ${url}:`, e);
          vite.ssrFixStacktrace(e as Error);
          next(e);
        });
    } catch (e) {
      console.error(`Error handling ${url}:`, e);
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    index: false,
    etag: false,
    lastModified: false,
  }));

  // SPA fallback: serve index.html for all routes except API and uploads
  app.use((req, res, next) => {
    // Don't serve index.html for API routes or uploads
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }

    // Serve index.html for all other routes (SPA routing)
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
