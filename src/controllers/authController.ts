import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { sign } from "hono/jwt";

export const signupController = async (c: Context) => { 
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    });
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                role: "USER",
                name: body.name,
                phone: body.phone,
            },
        });
        const jwt = await sign({ id: user.id, role: user.role }, c.env.JWT_SECRET,);
        return c.text(jwt);
    } catch (e:any) {
        console.log(e);
        if (e.message.includes("Unique constraint failed on the fields: (`email`)")){
            c.status(409);
            return c.json({statusCode:409, message: "User with same email already exists! Use a different email!"});
        }
        c.status(411);
        return c.text("Invalid request! Please try again!");
    } finally {
        await prisma.$disconnect();
    }
}

export const signinController = async (c: Context) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    });
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!user) {
            c.status(403);
            return c.text("Invalid Credentials!");
        }
        const jwt = await sign({ id: user.id, role: user.role }, c.env.JWT_SECRET);
        return c.text(jwt);
    } catch (e) {
        console.log(e)
        c.status(411);
        return c.text("Invalid request! Please try again!");
    } finally {
        await prisma.$disconnect();
    }
}

export const logoutController = async (c: Context) => {
    const authHeaderToken = c.req.header("Authorization") || "";
    try {
        console.log("authHeaderToken: ", authHeaderToken);
        if (!authHeaderToken) {
           c.status(400);
           return c.json({ message: "Token missing in the request headers" });
        }
         c.json({ message: "Token revoked successfully" });
    } catch (error) {
        c.status(403);
        return c.json({ message: "Unauthorized" });
    }
};