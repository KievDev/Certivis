import { PrismaClient } from "../generated/prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;

// In production, the code creates a new Prisma client from scratch every time it runs. This is because on a real server, you want a fresh start every time.

// In development, the code checks if it already created a Prisma client before. If it did, it uses the old one. If not, it creates a new one and stores it in a special place called the "global scope". This helps when you're writing code and testing it, because it allows the Prisma client to stay the same even when you make changes to your code.

// In summary, the code creates a new Prisma client in development if it hasn't been created yet, and uses the existing one in production.
