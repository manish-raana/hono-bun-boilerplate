import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      c.set("role", user.role);
      await next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
}
