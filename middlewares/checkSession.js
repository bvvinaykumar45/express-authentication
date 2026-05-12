import db from "../db/index.js";
import { users, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const checkSession = async (req, res, next) => {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return next();
  }

  const [user] = await db
    .select({
      sessionId: userSessions.id,
      id: userSessions.userId,
      name: users.name,
      email: users.email,
    })
    .from(userSessions)
    .rightJoin(users, eq(users.id, userSessions.userId))
    .where(eq(userSessions.id, sessionId));

  if (!user) {
    return next();
  }

  req.user = user;
  next();
};
