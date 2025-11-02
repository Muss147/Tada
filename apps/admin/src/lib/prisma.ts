import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Création du pool de connexion
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Initialisation du client Prisma avec l'adaptateur Neon
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});

export { prisma };
