import { prisma } from "../../plugins/db";

export class AuthService {
    static async register(username: string, email: string, passwordRaw: string) {
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) throw new Error("Username already taken");

        const hashedPassword = await Bun.password.hash(passwordRaw);

        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword }
        });
        return newUser;
    }

    static async login(username: string, passwordRaw: string) {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");

        const isMatch = await Bun.password.verify(passwordRaw, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return user;
    }
}