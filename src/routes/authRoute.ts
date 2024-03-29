import { Hono } from "hono";
import { signinController, signupController, logoutController } from "../controllers/authController";

export const authRouter = new Hono();

authRouter.post("/register", signupController);
authRouter.post("/login", signinController);
authRouter.post("/logout", logoutController);