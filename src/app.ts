import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { resumeRoutes } from "./modules/resume/resume.routes";
import { authRoutes } from "./modules/auth/auth.routes";

export const app = new Elysia()
    .use(cors())
    .get("/", () => "Resume API is running securely")
    .use(resumeRoutes)
    .use(authRoutes);