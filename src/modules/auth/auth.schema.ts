import { t } from "elysia";

export const authSchema = {
    body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String({minLength:6}),
        name: t.Optional(t.String())
    })
}