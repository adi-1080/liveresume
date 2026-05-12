import { AuthService } from "./auth.service";

export const registerHandler = async ({ body, set }: any) => {
    try {
        await AuthService.register(body.username, body.email, body.password);
        set.status = 201;
        return { success: true, message: "User registered successfully" };
    } catch (error: any) {
        set.status = 400
        return { success: false, error: error.message };
    }
};

export const loginHandler = async ({ body, jwt, set }: any) => {
    try {
        const user = await AuthService.login(body.username, body.password);

        const token = await jwt.sign({
            sub: user.id,
            username: user.username
        });

        return {
            sucess: true,
            token: token,
            user: { username: user.username, userId: user.id.toString() }
        };
    }catch(error: any){
        set.status = 401;
        return{
            success: false,
            error: error.message
        };
    }
};