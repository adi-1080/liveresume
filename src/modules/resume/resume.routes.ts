import { Elysia } from "elysia";
import { getResumeHandler, upsertResumeHandler } from "./resume.controller";
import { upsertResumeSchema } from "./resume.schema";

export const resumeRoutes = new Elysia({ prefix: '/resume' })
    .get("/:username/:slug", getResumeHandler)
    .post("/", upsertResumeHandler, upsertResumeSchema);