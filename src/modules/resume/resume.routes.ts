import { Elysia } from "elysia";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { 
  getDashboardHandler, getEditorHandler, saveDraftHandler, 
  publishHandler, unpublishHandler, getPublicResumeHandler 
} from "./resume.controller";
import { saveDraftSchema, slugParamSchema, publicResumeSchema } from "./resume.schema";

export const resumeRoutes = new Elysia({ prefix: '/resume' })
  .get("/public/:username/:slug", getPublicResumeHandler, publicResumeSchema)
  .use(isAuthenticated)
  .get("/", getDashboardHandler)
  .get("/:slug", getEditorHandler, slugParamSchema)
  .post("/", saveDraftHandler, saveDraftSchema)
  .post("/:slug/publish", publishHandler, slugParamSchema)
  .post("/:slug/unpublish", unpublishHandler, slugParamSchema);