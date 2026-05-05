import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { registerHandler, loginHandler } from "./auth.controller";
import { authSchema } from "./auth.schema";

export const authRoutes = new Elysia({prefix: '/auth'})
    .use(jwt({name: 'jwt', secret: process.env.JWT_SECRET!}))
    .post("/register", registerHandler, authSchema)
    .post("/login", loginHandler, authSchema);