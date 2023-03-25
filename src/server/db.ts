import { PrismaClient } from "@prisma/client";

import { env } from "@/env.mjs";
import argon2 from "argon2";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "create")
      params.args.data.password = await argon2.hash(params.args.data.password);
    return next(params);
  });

  prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "findFirst") {
      const password = params.args.where?.password;
      if (password) delete params.args.where.password;

      const user = await next(params);

      if (password) {
        try {
          if (user && (await argon2.verify(user.password, password)))
            return user;
        } catch (error) {
          return null;
        }
        return null;
      } else {
        return user;
      }
    }

    return next(params);
  });

  globalForPrisma.prisma = prisma;
}
