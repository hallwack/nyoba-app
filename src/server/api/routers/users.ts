import { registerSchema } from "@/pages/auth/register";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  register: publicProcedure.input(registerSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.user.create({
      data: input,
    });
  }),
});
