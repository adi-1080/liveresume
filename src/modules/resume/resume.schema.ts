import { t } from "elysia";

export const upsertResumeSchema = {
    body: t.Object({
        username: t.String(),
        slug: t.String(),
        latexContent: t.String()
    })
};