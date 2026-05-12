import { t } from "elysia";

export const saveDraftSchema = {
  body: t.Object({
    roleName: t.String(),
    slug: t.String(),
    draftContent: t.String()
  })
};

export const slugParamSchema = {
  params: t.Object({
    slug: t.String()
  })
};

export const publicResumeSchema = {
  params: t.Object({
    username: t.String(),
    slug: t.String()
  })
};