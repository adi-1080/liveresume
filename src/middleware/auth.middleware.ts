// src/middleware/auth.middleware.ts
import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const isAuthenticated = new Elysia()
    .use(jwt({name:"jwt",secret: process.env.JWT_SECRET!}))
    .derive(async ({jwt, request: {headers}, set})=> {
        const auth = headers.get('authorization');
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

        if(!token){
            set.status = 401;
            throw new Error("Unauthorized: Missing Token");
        }

        const payload = await jwt.verify(token);
        if(!payload){
            set.status = 401;
            throw new Error("Unauthorized: Invalid Token");
        }

        return {
            user: payload
        };
    });