// src/middleware/auth.middleware.ts
import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const isAuthenticated = (app: any) =>
    app.use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
        .derive(async ({ jwt, request: { headers }, set }: any) => {
            const auth = headers.get("authorization");
            const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

            if (!token) {
                set.status = 401;
                throw new Error("Unauthorized: Missing Token");
            }

            const payload = await jwt.verify(token);
            if (!payload || typeof payload !== "object") {
                set.status = 401;
                throw new Error("Unauthorized: Invalid Token");
            }

            return {
                user: payload
            };
        });