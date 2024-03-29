import { Hono } from 'hono'
import { authRouter } from "./routes/authRoute";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { authMiddleware } from './middleware/authMiddleware';

const app = new Hono()
app.use(logger());
app.use(prettyJSON());
app.use(secureHeaders());
app.use("/api/*", cors());

app.get('/api/v1/status', (c) => {
  return c.text('I am alive!')
})
app.route("/api/v1/auth", authRouter);
app.use(authMiddleware);

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Invalid Request!", 500);
});
app.notFound((c) => {
  return c.text("Not Found!", 404);
});

export default {
  port: 8787,
  fetch: app.fetch,
}; 