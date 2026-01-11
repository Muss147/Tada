import { serve } from "@hono/node-server";
import { openapi } from "./openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { env } from "./env";
import { mobileRoutes } from "./routes/v1/mobile";


// Routes API

// Health global
openapi.get("/health", (c) => c.json({ ok: true }));

// Mobile API
openapi.route("/v1/mobile", mobileRoutes);

// Swagger
openapi.get(
  "/docs",
  swaggerUI({
    url: "/openapi.json",
  })
);

// OpenAPI JSON
openapi.doc("/openapi.json", {
  openapi: "3.0.3",
  info: {
    title: "Tada Mobile API",
    version: "1.0.0",
  },
});

serve({
  fetch: openapi.fetch,
  port: env.API_PORT,
});