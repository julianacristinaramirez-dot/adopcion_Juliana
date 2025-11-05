import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API - Proyecto PIAD-301",
      version: "1.0.0",
      description: "DOCUMENTACIÓN DE API REST CON EXPRESS, PRISMA Y POSTGRESQL",
      contact: {
        email: "julianaramirezmoreano@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  // 🔥 Usa ruta absoluta para evitar el error
  apis: [path.join(__dirname, "./routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
