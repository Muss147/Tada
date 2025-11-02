import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
